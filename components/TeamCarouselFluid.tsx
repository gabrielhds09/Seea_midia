'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Registrar plugin (Draggable é premium, mas vou fazer uma versão sem ele também)
if (typeof window !== 'undefined') {
    try {
        gsap.registerPlugin(Draggable)
    } catch (e) {
        console.log('Draggable not available, using mouse events instead')
    }
}

const TEAM_MEMBERS = [
    { name: "Gabriel H.", role: "Lead Developer", color: "from-purple-600 to-blue-600" },
    { name: "Aline V.", role: "Founder", color: "from-red-600 to-orange-600" },
    { name: "Lucas M.", role: "Creative Director", color: "from-emerald-600 to-teal-600" },
    { name: "Sofia R.", role: "UX Designer", color: "from-pink-600 to-rose-600" },
    { name: "Rafael C.", role: "Marketing Manager", color: "from-amber-600 to-yellow-600" },
    { name: "Julia S.", role: "Product Manager", color: "from-cyan-600 to-blue-600" },
    { name: "Marcos T.", role: "Backend Engineer", color: "from-indigo-600 to-violet-600" }
]

export default function TeamCarouselFluid() {
    const galleryRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<HTMLUListElement>(null)
    const iterationRef = useRef(0)
    const animationRef = useRef<gsap.core.Timeline | null>(null)

    useEffect(() => {
        if (!cardsRef.current) return

        const cards = gsap.utils.toArray<HTMLElement>(cardsRef.current.children)

        // Função seamlessLoop otimizada
        function seamlessLoop(items: HTMLElement[], config: any) {
            let onChange = config.onChange,
                speed = config.speed || 1,
                snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
                paddingRight = config.paddingRight || 0,
                paddingLeft = config.paddingLeft || 0,
                spacing = config.spacing || 0,
                overlap = Math.ceil(1 / speed),
                startTime = items.length * overlap * 0.5,
                loopTime = items.length * spacing,
                totalTime = loopTime + items.length * overlap * spacing,
                curIndex = 0,
                indexIsDirty = false

            const tl = gsap.timeline({
                repeat: -1,
                onUpdate: onChange && function () {
                    const newIndex = tl.closestIndex()
                    if (curIndex !== newIndex) {
                        curIndex = newIndex
                        onChange(items[curIndex], curIndex)
                    }
                }
            })

            items.concat(items.concat(items)).forEach((item, i) => {
                const time = i * spacing
                tl.set(item, {
                    x: ((i % items.length) * spacing + paddingLeft - startTime) * speed,
                    modifiers: {
                        x: (x: string) => {
                            const newX = parseFloat(x) || 0
                            const s = gsap.utils.wrap(-spacing * items.length - paddingLeft, paddingRight, newX)
                            return `${s}px`
                        }
                    }
                }, time)
            })

            tl.to({}, { duration: totalTime / speed, ease: 'none' })

            tl.closestIndex = function (setCurrent = false) {
                const index = Math.round(tl.time() / spacing) % items.length
                setCurrent && (curIndex = index)
                return index
            }

            tl.toIndex = function (index: number, vars?: any) {
                let newIndex = gsap.utils.wrap(0, items.length, index),
                    time = (newIndex - curIndex) * spacing
                return time < 0 && (time = -time), vars = vars || {}, vars.duration === void 0 && (vars.duration = time / Math.abs(vars.speed || 1)), vars.overwrite = !0, gsap.to(tl, vars)
            }

            tl.next = (vars?: any) => tl.toIndex(curIndex + 1, vars)
            tl.previous = (vars?: any) => tl.toIndex(curIndex - 1, vars)
            tl.times = items.map((_, i) => i * spacing)

            return tl
        }

        // Função de animação de cartões
        function animateCards(element: HTMLElement, index: number) {
            const tl = gsap.timeline()
            tl.fromTo(element,
                {
                    opacity: 0,
                    scale: 0,
                },
                {
                    opacity: 1,
                    scale: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: 'power1.in',
                    immediateRender: false
                }
            )
                .fromTo(element,
                    { xPercent: 400 },
                    { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
                    0
                )
            return tl
        }

        // Criar o loop
        const loop = seamlessLoop(cards, {
            spacing: 500,
            speed: 0.5,
            snap: false,
            paddingRight: parseFloat(gsap.getProperty(cards[0], 'width') as string) / 2,
            paddingLeft: parseFloat(gsap.getProperty(cards[0], 'width') as string) / 2,
            onChange: (element: HTMLElement, index: number) => {
                // Callback para mudanças
            }
        })

        animationRef.current = loop

        // Controles de navegação
        const setupControls = () => {
            const prevBtn = document.querySelector('.team-prev') as HTMLButtonElement
            const nextBtn = document.querySelector('.team-next') as HTMLButtonElement

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    iterationRef.current--
                    loop.previous({ speed: 2 })
                })
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    iterationRef.current++
                    loop.next({ speed: 2 })
                })
            }
        }

        setupControls()

        // Cleanup
        return () => {
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [])

    return (
        <section className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-center py-20">
            {/* Title */}
            <div className="text-center mb-16 z-10">
                <h2 className="text-5xl md:text-7xl font-bold text-white mb-4">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Team</span>
                </h2>
                <p className="text-white/60 text-lg">The brilliant minds behind SEEA</p>
            </div>

            {/* Gallery */}
            <div ref={galleryRef} className="gallery relative w-full h-[30rem] flex items-center justify-center">
                <ul
                    ref={cardsRef}
                    className="cards absolute flex gap-8"
                    style={{
                        width: '14rem',
                        height: '18rem',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    {TEAM_MEMBERS.map((member, index) => (
                        <li
                            key={index}
                            className="card-item absolute w-56 h-72 rounded-2xl overflow-hidden shadow-2xl transform-gpu"
                            style={{
                                willChange: 'transform',
                                backfaceVisibility: 'hidden'
                            }}
                        >
                            <div className={`w-full h-full bg-gradient-to-br ${member.color} p-1`}>
                                <div className="w-full h-full bg-zinc-900 rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-4xl font-bold text-white mb-4">
                                        {member.name.charAt(0)}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-sm text-white/60 uppercase tracking-wider">{member.role}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Controls */}
            <div className="actions flex gap-6 mt-12 z-10">
                <button className="team-prev px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full transition-all hover:scale-105 font-medium">
                    ← Previous
                </button>
                <button className="team-next px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white rounded-full transition-all hover:scale-105 font-medium">
                    Next →
                </button>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#4a148c_0%,transparent_70%)] opacity-20 pointer-events-none" />
        </section>
    )
}
