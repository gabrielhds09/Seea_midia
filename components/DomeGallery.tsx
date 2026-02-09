'use client'

import React, { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

const DEFAULTS = {
    maxVerticalRotationDeg: 15,
    dragSensitivity: 20,
    enlargeTransitionMs: 300,
    segments: 20 // Reverted to 20 per user request for performance
};

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
    const a = (((deg + 180) % 360) + 360) % 360;
    return a - 180;
};
const getDataNumber = (el: HTMLElement, name: string, fallback: number) => {
    const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
    const n = attr == null ? NaN : parseFloat(attr);
    return Number.isFinite(n) ? n : fallback;
};

interface ImageItem {
    src: string;
    alt: string;
    video?: string; // Optional video URL
}

interface DomeGalleryProps {
    images?: (string | ImageItem)[];
    fit?: number;
    fitBasis?: 'min' | 'max' | 'width' | 'height' | 'auto';
    minRadius?: number;
    maxRadius?: number;
    padFactor?: number;
    overlayBlurColor?: string;
    maxVerticalRotationDeg?: number;
    dragSensitivity?: number;
    enlargeTransitionMs?: number;
    segments?: number;
    dragDampening?: number;
    openedImageWidth?: string;
    openedImageHeight?: string;
    imageBorderRadius?: string;
    openedImageBorderRadius?: string;
    grayscale?: boolean;
}

function buildItems(pool: (string | ImageItem)[], seg: number) {
    const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
    const evenYs = [-4, -2, 0, 2, 4];
    const oddYs = [-3, -1, 1, 3, 5];

    const coords = xCols.flatMap((x, c) => {
        const ys = c % 2 === 0 ? evenYs : oddYs;
        return ys.map(y => ({ x, y, sizeX: 2, sizeY: 2 }));
    });

    const totalSlots = coords.length;
    if (pool.length === 0) {
        return coords.map(c => ({ ...c, src: '', alt: '' }));
    }

    const normalizedImages = pool.map(image => {
        if (typeof image === 'string') {
            return { src: image, alt: '' };
        }
        return { src: image.src || '', alt: image.alt || '', video: image.video };
    });

    const usedImages = Array.from({ length: totalSlots }, (_, i) => normalizedImages[i % normalizedImages.length]);

    return coords.map((c, i) => ({
        ...c,
        src: usedImages[i].src,
        alt: usedImages[i].alt,
        video: usedImages[i].video
    }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segments: number) {
    const unit = 360 / segments / 2;
    const rotateY = unit * (offsetX + (sizeX - 1) / 2);
    const rotateX = unit * (offsetY - (sizeY - 1) / 2);
    return { rotateX, rotateY };
}

export default function DomeGallery({
    images = [], // Default handled in component usage or via fallback if needed, but props usually passed
    fit = 0.6,
    fitBasis = 'auto',
    minRadius = 600,
    maxRadius = Infinity,
    padFactor = 0.25,
    overlayBlurColor = '#050505',
    maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
    dragSensitivity = DEFAULTS.dragSensitivity,
    enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
    segments = DEFAULTS.segments,
    dragDampening = 2,
    openedImageWidth = '600px',
    openedImageHeight = '800px',
    imageBorderRadius = '12px',
    openedImageBorderRadius = '24px',
    grayscale = true
}: DomeGalleryProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const sphereRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<HTMLDivElement>(null);
    const scrimRef = useRef<HTMLDivElement>(null);
    const focusedElRef = useRef<HTMLElement | null>(null);
    const originalTilePositionRef = useRef<{ left: number, top: number, width: number, height: number } | null>(null);

    const rotationRef = useRef({ x: 0, y: 0 });
    const startRotRef = useRef({ x: 0, y: 0 });
    const startPosRef = useRef<{ x: number, y: number } | null>(null);
    const draggingRef = useRef(false);
    const movedRef = useRef(false);
    const inertiaRAF = useRef<number | null>(null);
    const openingRef = useRef(false);
    const openStartedAtRef = useRef(0);
    const lastDragEndAt = useRef(0);

    const scrollLockedRef = useRef(false);
    const lockScroll = useCallback(() => {
        if (scrollLockedRef.current) return;
        scrollLockedRef.current = true;
        document.body.classList.add('dg-scroll-lock');
    }, []);
    const unlockScroll = useCallback(() => {
        if (!scrollLockedRef.current) return;
        if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
        scrollLockedRef.current = false;
        document.body.classList.remove('dg-scroll-lock');
    }, []);

    const items = useMemo(() => buildItems(images, segments), [images, segments]);

    const applyTransform = useCallback((xDeg: number, yDeg: number) => {
        const el = sphereRef.current;
        if (el) {
            el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
        }
    }, []);

    const lockedRadiusRef = useRef<number | null>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;
        const ro = new ResizeObserver(entries => {
            const cr = entries[0].contentRect;
            const w = Math.max(1, cr.width),
                h = Math.max(1, cr.height);
            const isMobile = w < 768;
            const minDim = Math.min(w, h),
                maxDim = Math.max(w, h),
                aspect = w / h;
            let basis;
            switch (fitBasis) {
                case 'min':
                    basis = minDim;
                    break;
                case 'max':
                    basis = maxDim;
                    break;
                case 'width':
                    basis = w;
                    break;
                case 'height':
                    basis = h;
                    break;
                default:
                    basis = aspect >= 1.3 ? w : minDim;
            }
            let radius = basis * fit;
            const heightGuard = h * 1.35;
            radius = Math.min(radius, heightGuard);

            // MOBILE OPTIMIZATION: Force smaller radius and spacing
            if (isMobile) {
                // Determine radius based on screen width to prevent "tightness"
                // A smaller radius brings items closer in 3D space, but we need to balance with item size
                // actually, smaller radius = more curvature. Larger radius = flatter.
                // If it feels "tight", items might be overlapping or too close to camera.
                // We actually want to START the camera further back or reduce items scale.
                // But specifically for the user request "apertado" (tight/cramped), 
                // we likely want to reduce the radius so they fit better or adjust opacity.
                // Let's force a smaller minRadius for mobile dynamically.
                const mobileMinRadius = w * 0.8;
                radius = Math.max(radius, mobileMinRadius);
                radius = clamp(radius, mobileMinRadius, maxRadius);
            } else {
                radius = clamp(radius, minRadius, maxRadius);
            }

            lockedRadiusRef.current = Math.round(radius);

            const viewerPad = Math.max(8, Math.round(minDim * padFactor));
            root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
            root.style.setProperty('--viewer-pad', `${viewerPad}px`);
            root.style.setProperty('--overlay-blur-color', overlayBlurColor);
            root.style.setProperty('--tile-radius', imageBorderRadius);
            root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
            root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
            applyTransform(rotationRef.current.x, rotationRef.current.y);
        });
        ro.observe(root);
        return () => ro.disconnect();
    }, [fit, fitBasis, minRadius, maxRadius, padFactor, overlayBlurColor, grayscale, imageBorderRadius, openedImageBorderRadius, applyTransform]);

    useEffect(() => {
        applyTransform(rotationRef.current.x, rotationRef.current.y);
    }, [applyTransform]);

    const stopInertia = useCallback(() => {
        if (inertiaRAF.current) {
            cancelAnimationFrame(inertiaRAF.current);
            inertiaRAF.current = null;
        }
    }, []);

    const startInertia = useCallback(
        (vx: number, vy: number) => {
            const MAX_V = 1.4;
            let vX = clamp(vx, -MAX_V, MAX_V) * 80;
            let vY = clamp(vy, -MAX_V, MAX_V) * 80;
            let frames = 0;
            const d = clamp(dragDampening ?? 0.6, 0, 1);
            const frictionMul = 0.94 + 0.055 * d;
            const stopThreshold = 0.015 - 0.01 * d;
            const maxFrames = Math.round(90 + 270 * d);
            const step = () => {
                vX *= frictionMul;
                vY *= frictionMul;
                if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
                    inertiaRAF.current = null;
                    return;
                }
                if (++frames > maxFrames) {
                    inertiaRAF.current = null;
                    return;
                }
                const nextX = clamp(rotationRef.current.x - vY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
                const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
                rotationRef.current = { x: nextX, y: nextY };
                applyTransform(nextX, nextY);
                inertiaRAF.current = requestAnimationFrame(step);
            };
            stopInertia();
            inertiaRAF.current = requestAnimationFrame(step);
        },
        [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
    );

    useGesture(
        {
            onDragStart: ({ event }) => {
                if (focusedElRef.current) return;
                stopInertia();
                const evt = event as PointerEvent;
                draggingRef.current = true;
                movedRef.current = false;
                startRotRef.current = { ...rotationRef.current };
                startPosRef.current = { x: evt.clientX, y: evt.clientY };
            },
            onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
                if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
                const evt = event as PointerEvent;
                const dxTotal = evt.clientX - (startPosRef.current?.x || 0);
                const dyTotal = evt.clientY - (startPosRef.current?.y || 0);
                if (!movedRef.current) {
                    const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
                    if (dist2 > 16) movedRef.current = true;
                }
                const nextX = clamp(
                    startRotRef.current.x - dyTotal / dragSensitivity,
                    -maxVerticalRotationDeg,
                    maxVerticalRotationDeg
                );
                const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
                if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
                    rotationRef.current = { x: nextX, y: nextY };
                    applyTransform(nextX, nextY);
                }
                if (last) {
                    draggingRef.current = false;
                    // @ts-ignore
                    let [vMagX, vMagY] = velocity;
                    const [dirX, dirY] = direction;
                    let vx = vMagX * dirX;
                    let vy = vMagY * dirY;
                    if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
                        const [mx, my] = movement;
                        vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
                        vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
                    }
                    if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
                    if (movedRef.current) lastDragEndAt.current = performance.now();
                    movedRef.current = false;
                }
            }
        },
        { target: mainRef, eventOptions: { passive: true } }
    );

    useEffect(() => {
        const scrim = scrimRef.current;
        if (!scrim) return;
        const close = () => {
            if (performance.now() - openStartedAtRef.current < 250) return;

            const el = focusedElRef.current as HTMLElement;
            if (!el) return;
            const parent = el.parentElement;
            if (!parent) return;

            const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement;
            if (!overlay) return;

            // Remove any previously created close buttons FROM BODY
            const bodyCloseBtns = document.body.querySelectorAll('.dome-close-btn-fixed');
            bodyCloseBtns.forEach(btn => btn.remove());

            const refDiv = parent.querySelector('.item__image--reference');
            const originalPos = originalTilePositionRef.current;

            const finishClose = () => {
                overlay.remove();
                if (refDiv) refDiv.remove();
                parent.style.setProperty('--rot-y-delta', '0deg');
                parent.style.setProperty('--rot-x-delta', '0deg');
                el.style.visibility = '';
                el.style.zIndex = '0';
                focusedElRef.current = null;
                rootRef.current?.removeAttribute('data-enlarging');
                openingRef.current = false;
                unlockScroll();
            }

            if (!originalPos || !rootRef.current) {
                finishClose();
                return;
            }

            overlay.style.transition = `all ${enlargeTransitionMs}ms ease-out`;
            overlay.style.left = (originalPos.left - (rootRef.current.getBoundingClientRect().left)) + 'px';
            overlay.style.top = (originalPos.top - (rootRef.current.getBoundingClientRect().top)) + 'px';
            overlay.style.width = originalPos.width + 'px';
            overlay.style.height = originalPos.height + 'px';
            overlay.style.opacity = '0';

            setTimeout(finishClose, enlargeTransitionMs);
        };

        scrim.addEventListener('click', close);

        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', onKey);
        return () => {
            scrim.removeEventListener('click', close);
            window.removeEventListener('keydown', onKey);
        };
    }, [enlargeTransitionMs, unlockScroll]);

    // Open Item Logic
    const openItemFromElement = useCallback(
        (el: HTMLElement) => {
            if (openingRef.current || !rootRef.current || !viewerRef.current) return;
            openingRef.current = true;
            openStartedAtRef.current = performance.now();
            lockScroll();
            const parent = el.parentElement as HTMLElement;
            focusedElRef.current = el;
            el.setAttribute('data-focused', 'true');

            // Get data
            const offsetX = getDataNumber(parent, 'offsetX', 0);
            const offsetY = getDataNumber(parent, 'offsetY', 0);
            const sizeX = getDataNumber(parent, 'sizeX', 2);
            const sizeY = getDataNumber(parent, 'sizeY', 2);
            const videoSrc = parent.dataset.video;

            const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);

            const globalY = normalizeAngle(rotationRef.current.y);
            const parentY = normalizeAngle(parentRot.rotateY);

            let rotY = -(parentY + globalY) % 360;
            if (rotY < -180) rotY += 360;
            const rotX = -parentRot.rotateX - rotationRef.current.x;

            parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
            parent.style.setProperty('--rot-x-delta', `${rotX}deg`);

            const tileR = el.getBoundingClientRect();
            const frameR = frameRef.current?.getBoundingClientRect();
            const mainR = mainRef.current?.getBoundingClientRect();

            if (!mainR || !frameR) return;

            originalTilePositionRef.current = { left: tileR.left, top: tileR.top, width: tileR.width, height: tileR.height };

            const overlay = document.createElement('div');
            overlay.className = 'enlarge';
            overlay.style.position = 'absolute';
            overlay.style.left = (frameR.left - mainR.left) + 'px';
            overlay.style.top = (frameR.top - mainR.top) + 'px';
            overlay.style.width = frameR.width + 'px';
            overlay.style.height = frameR.height + 'px';
            overlay.style.opacity = '0';
            overlay.style.zIndex = '30';
            overlay.style.transformOrigin = 'top left';

            const tx = tileR.left - frameR.left;
            const ty = tileR.top - frameR.top;
            const sx = tileR.width / frameR.width;
            const sy = tileR.height / frameR.height;
            overlay.style.transform = `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`;

            // Close Button - FIXED TO BODY to avoid stacking issues
            const closeBtn = document.createElement('button');
            closeBtn.className = 'dome-close-btn-fixed';
            closeBtn.innerHTML = `
                <span style="font-weight: 700; letter-spacing: 0.1em; font-size: 14px;">VOLTAR</span>
                <div style="background: rgba(255,255,255,0.2); border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; margin-left: 12px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </div>
            `;

            // Inline styles for guaranteed visibility override
            Object.assign(closeBtn.style, {
                position: 'fixed',
                top: 'max(24px, env(safe-area-inset-top, 24px))',
                right: '24px',
                height: '48px',
                padding: '0 24px',
                borderRadius: '100px',
                background: '#ed1c24',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: '2147483647', // Max z-index
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                pointerEvents: 'auto',
                transition: 'transform 0.2s',
                textTransform: 'uppercase'
            });

            closeBtn.onmouseenter = () => closeBtn.style.transform = 'scale(1.05)';
            closeBtn.onmouseleave = () => closeBtn.style.transform = 'scale(1)';
            closeBtn.setAttribute('aria-label', 'Close');

            closeBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                scrimRef.current?.click();
            };

            // Append to BODY
            document.body.appendChild(closeBtn);

            if (videoSrc) {
                const videoContainer = document.createElement('div');
                videoContainer.style.width = '100%';
                videoContainer.style.height = '100%';
                videoContainer.style.overflow = 'hidden';
                videoContainer.style.background = '#000';
                videoContainer.style.borderRadius = openedImageBorderRadius || '24px';

                const video = document.createElement('video');
                video.src = videoSrc;
                video.controls = true;
                video.autoplay = true;
                video.setAttribute('controlsList', 'nodownload');
                video.setAttribute('disablePictureInPicture', 'true');
                video.oncontextmenu = (e) => { e.preventDefault(); return false; };

                video.style.width = '100%';
                video.style.height = '100%';
                video.style.objectFit = 'contain';

                videoContainer.appendChild(video);
                overlay.appendChild(videoContainer);
            } else {
                const img = document.createElement('img');
                img.src = (el.querySelector('img') as HTMLImageElement)?.src || '';
                img.style.width = '100%';
                img.style.height = '100%';
                img.style.objectFit = 'cover';
                img.style.borderRadius = openedImageBorderRadius || '24px';
                overlay.appendChild(img);
            }

            viewerRef.current.appendChild(overlay);

            requestAnimationFrame(() => {
                overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
                overlay.style.opacity = '1';
                overlay.style.transform = 'translate(0, 0) scale(1, 1)';
                rootRef.current?.setAttribute('data-enlarging', 'true');
            });
        }, [enlargeTransitionMs, lockScroll, segments, openedImageBorderRadius]
    );

    const onTileClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (draggingRef.current) return;
            if (movedRef.current) return;
            if (performance.now() - lastDragEndAt.current < 80) return;
            if (openingRef.current) return;
            openItemFromElement(e.currentTarget);
        },
        [openItemFromElement]
    );

    return (
        <div
            ref={rootRef}
            className="sphere-root w-full h-full"
            style={{
                // @ts-ignore
                '--segments-x': segments,
                '--segments-y': segments,
                '--overlay-blur-color': overlayBlurColor,
                '--tile-radius': imageBorderRadius,
                '--enlarge-radius': openedImageBorderRadius,
                '--image-filter': grayscale ? 'grayscale(1)' : 'none'
            } as React.CSSProperties}
        >
            <main ref={mainRef} className="sphere-main w-full h-full relative cursor-grab active:cursor-grabbing">
                <div className="stage absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div ref={sphereRef} className="sphere relative preserve-3d">
                        {items.map((it, i) => (
                            <div
                                key={`${it.x},${it.y},${i}`}
                                className="item absolute top-1/2 left-1/2"
                                data-video={it.video || ''}
                                // @ts-ignore
                                style={{
                                    '--offset-x': it.x,
                                    '--offset-y': it.y,
                                    '--item-size-x': it.sizeX,
                                    '--item-size-y': it.sizeY
                                } as React.CSSProperties}
                            >
                                <div
                                    className="item__image bg-gray-800"
                                    role="button"
                                    tabIndex={0}
                                    aria-label={it.alt || 'Open image'}
                                    onClick={onTileClick}
                                >
                                    <img src={it.src} draggable={false} alt={it.alt} className="pointer-events-none select-none w-full h-full object-cover" />

                                    {it.video && (
                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#ed1c24] transition-colors duration-300">
                                                <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="overlay absolute inset-0 pointer-events-none" />
                <div className="overlay overlay--blur absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at center, transparent 30%, ${overlayBlurColor} 80%)` }} />

                <div className="viewer absolute inset-0 pointer-events-none z-50 flex items-center justify-center p-[var(--viewer-pad)]" ref={viewerRef}>
                    <div ref={scrimRef} className="scrim absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-300 pointer-events-auto" style={{ display: rootRef.current?.getAttribute('data-enlarging') === 'true' ? 'block' : 'none', opacity: rootRef.current?.getAttribute('data-enlarging') === 'true' ? 1 : 0 }} />
                    <div ref={frameRef} className="frame relative w-full h-full max-w-[800px] max-h-[80vh] pointer-events-none" />
                </div>
            </main>
        </div>
    );
}
