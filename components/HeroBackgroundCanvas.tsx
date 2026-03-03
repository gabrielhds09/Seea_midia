'use client'

import React, { useEffect, useRef } from 'react'

/**
 * HeroBackgroundCanvas - A high-performance WebGL fluid simulation
 * that creates a "Silk/Luxury Smoke" effect.
 * Optimized for monochromatic SEEA aesthetic.
 */
export default function HeroBackgroundCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl', {
            alpha: true,
            antialias: false, // Better performance on mobile
            depth: false,
            stencil: false,
            preserveDrawingBuffer: false
        }) as WebGLRenderingContext
        if (!gl) return

        // -- PERFORMANCE TUNING --
        // Use a lower DPR for higher FPS on mobile
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
        const dpr = isMobile ? Math.min(window.devicePixelRatio, 1.2) : Math.min(window.devicePixelRatio, 1.5)

        let width = canvas.width = window.innerWidth * dpr
        let height = canvas.height = window.innerHeight * dpr
        canvas.style.width = '100%'
        canvas.style.height = '100%'

        const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }

        const onMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX / window.innerWidth
            mouse.targetY = 1.0 - (e.clientY / window.innerHeight)
        }

        const onResize = () => {
            width = canvas.width = window.innerWidth * dpr
            height = canvas.height = window.innerHeight * dpr
            gl.viewport(0, 0, width, height)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('resize', onResize)

        // WebGL Shaders
        const vertexShaderSource = `
            attribute vec2 position;
            void main() {
                gl_Position = vec4(position, 0.0, 1.0);
            }
        `

        // Optimized Fragment Shader: Liquid Silk
        const fragmentShaderSource = `
            precision mediump float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                
                // Optimized math for silk-like waves
                float t = u_time * 0.12;
                vec2 p = uv * 2.5 + u_mouse * 0.15;
                
                float n = sin(p.x * 2.0 + t) * 0.5;
                n += sin(p.y * 1.5 - t * 0.8) * 0.3;
                n += cos(distance(uv, u_mouse * 0.8) * 4.0 - t);

                // Luxury White/Platinum palette
                float brightness = smoothstep(-1.2, 1.2, n);
                
                vec3 silkBase = vec3(0.98, 0.98, 0.97); // White
                vec3 silkShadow = vec3(0.93, 0.92, 0.94); // Very light grey/purple hint
                
                vec3 color = mix(silkShadow, silkBase, brightness);
                
                // Subtle depth
                color -= (1.0 - uv.y) * 0.02;

                gl_FragColor = vec4(color, 1.0);
            }
        `

        function createShader(gl: WebGLRenderingContext, type: number, source: string) {
            const shader = gl.createShader(type)!
            gl.shaderSource(shader, source)
            gl.compileShader(shader)
            return shader
        }

        const program = gl.createProgram()!
        gl.attachShader(program, createShader(gl, gl.VERTEX_SHADER, vertexShaderSource))
        gl.attachShader(program, createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource))
        gl.linkProgram(program)
        gl.useProgram(program)

        const positionBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

        const positionLocation = gl.getAttribLocation(program, 'position')
        gl.enableVertexAttribArray(positionLocation)
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

        const timeLocation = gl.getUniformLocation(program, 'u_time')
        const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
        const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

        let startTime = Date.now()
        let rafId: number

        function render() {
            const time = (Date.now() - startTime) * 0.001

            mouse.x += (mouse.targetX - mouse.x) * 0.04
            mouse.y += (mouse.targetY - mouse.y) * 0.04

            gl.uniform1f(timeLocation, time)
            gl.uniform2f(resolutionLocation, width, height)
            gl.uniform2f(mouseLocation, mouse.x, mouse.y)

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            rafId = requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            cancelAnimationFrame(rafId)
            gl.deleteProgram(program)
            gl.deleteBuffer(positionBuffer)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    )
}
