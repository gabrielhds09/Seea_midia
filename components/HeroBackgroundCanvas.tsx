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

        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext
        if (!gl) return

        let width = canvas.width = window.innerWidth
        let height = canvas.height = window.innerHeight

        const mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 }

        const onMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX / window.innerWidth
            mouse.targetY = 1.0 - (e.clientY / window.innerHeight)
        }

        const onResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
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

        // Fragment Shader: Silk Flow Simulation
        const fragmentShaderSource = `
            precision highp float;
            uniform float u_time;
            uniform vec2 u_resolution;
            uniform vec2 u_mouse;

            // Simple noise function
            float noise(vec2 p) {
                return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
            }

            // Perlin-like fbm for fluid motion
            float fbm(vec2 p) {
                float v = 0.0;
                float a = 0.5;
                for (int i = 0; i < 4; i++) {
                    v += a * noise(p);
                    p *= 2.0;
                    a *= 0.5;
                }
                return v;
            }

            void main() {
                vec2 uv = gl_FragCoord.xy / u_resolution.xy;
                float dist = distance(uv, u_mouse);
                
                // Luxury Flow Logic: Monochromatic Silk
                float t = u_time * 0.15;
                vec2 p = uv * 3.0; // Scale
                
                // Add mouse influence as a subtle wind
                p += u_mouse * 0.2;
                
                float n = 0.0;
                n += 0.5 * sin(p.x * 2.0 + t + sin(p.y * 3.0 + t));
                n += 0.3 * sin(p.y * 4.0 - t * 0.5 + p.x * 2.0);
                n += 0.2 * sin(distance(p, u_mouse * 5.0) - t);

                // Luxury color palette: Silk White / Off-white / Very faint SEEA Purple
                float brightness = smoothstep(-1.0, 1.0, n);
                
                // Base colors
                vec3 silkWhite = vec3(0.98, 0.97, 0.95);
                vec3 warmShadow = vec3(0.92, 0.90, 0.88);
                vec3 luxuryPurpleHaze = vec3(0.26, 0.09, 0.27); // Very subtle #431846
                
                // Mixing
                vec3 color = mix(warmShadow, silkWhite, brightness);
                
                // Inject purple haze only in deep ripples
                color = mix(color, luxuryPurpleHaze, smoothstep(0.4, 0.0, brightness) * 0.04);
                
                // Depth additive based on mouse
                color += (1.0 - smoothstep(0.0, 0.8, dist)) * 0.03;

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

        function render() {
            const time = (Date.now() - startTime) * 0.001

            // Smooth mouse transition
            mouse.x += (mouse.targetX - mouse.x) * 0.05
            mouse.y += (mouse.targetY - mouse.y) * 0.05

            gl.uniform1f(timeLocation, time)
            gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
            gl.uniform2f(mouseLocation, mouse.x, mouse.y)

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
            requestAnimationFrame(render)
        }

        render()

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('resize', onResize)
            // Note: Full WebGL cleanup is complex, but this handles main listeners
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-100 transition-opacity duration-1000"
            style={{ filter: 'contrast(1.05) saturate(0.95)' }}
        />
    )
}
