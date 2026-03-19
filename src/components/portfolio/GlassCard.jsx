import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * GlassCard — Apple-style frosted glass + 3D tilt on hover.
 *
 * Props:
 *   className      — classes on the outer perspective wrapper (size, flex, etc.)
 *   innerClassName — classes forwarded to the tilt motion.div (e.g. "flex flex-col")
 *   group          — set true to add Tailwind "group" so children can use group-hover:
 *   accentTop      — optional color string for the 1px top-edge accent (e.g. "#D4A96A")
 *   tiltDeg        — max tilt degrees, default 6
 */
export default function GlassCard({
    children,
    className    = '',
    innerClassName = '',
    group        = false,
    accentTop    = null,
    tiltDeg      = 6,
}) {
    const cardRef = useRef(null)

    // Normalised mouse position 0→1 inside the card
    const mx = useMotionValue(0.5)
    const my = useMotionValue(0.5)

    const rotateX = useSpring(useTransform(my, [0, 1], [ tiltDeg, -tiltDeg]), { stiffness: 300, damping: 30 })
    const rotateY = useSpring(useTransform(mx, [0, 1], [-tiltDeg,  tiltDeg]), { stiffness: 300, damping: 30 })

    // Specular highlight follows mouse
    const shineLeft = useTransform(mx, [0, 1], ['10%',  '90%'])
    const shineTop  = useTransform(my, [0, 1], ['10%',  '90%'])

    const onMouseMove = (e) => {
        const r = cardRef.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top)  / r.height)
    }

    const onMouseLeave = () => {
        mx.set(0.5)
        my.set(0.5)
    }

    return (
        <div
            className={`w-full h-full ${group ? 'group' : ''} ${className}`}
            style={{ perspective: '1000px' }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={`relative w-full h-full overflow-hidden ${innerClassName}`}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d',
                    // ── Glass surface ──────────────────────────────────────
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.09)',
                    boxShadow: [
                        'inset 0 1px 0 rgba(255, 255, 255, 0.13)',   // top inner highlight
                        'inset 0 -1px 0 rgba(0, 0, 0, 0.14)',        // bottom inner shadow
                        'inset 1px 0 0 rgba(255, 255, 255, 0.05)',   // left edge
                        '0 8px 32px rgba(0, 0, 0, 0.45)',            // depth shadow
                        '0 2px 6px rgba(0, 0, 0, 0.35)',             // near shadow
                    ].join(', '),
                }}
            >
                {/* Optional accent top border */}
                {accentTop && (
                    <div
                        className="absolute top-0 left-0 right-0 h-[2px] flex-shrink-0 pointer-events-none z-20"
                        style={{ background: `linear-gradient(90deg, ${accentTop}, transparent 70%)` }}
                        aria-hidden="true"
                    />
                )}

                {/* Static frosted gradient — top-left corner light source */}
                <div
                    className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        background:
                            'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 25%, transparent 55%)',
                    }}
                    aria-hidden="true"
                />

                {/* Moving specular shine */}
                <motion.div
                    className="absolute pointer-events-none z-0"
                    style={{
                        width: '60%',
                        height: '60%',
                        left: shineLeft,
                        top: shineTop,
                        x: '-50%',
                        y: '-50%',
                        borderRadius: '50%',
                        background:
                            'radial-gradient(circle, rgba(255,255,255,0.055) 0%, transparent 65%)',
                    }}
                    aria-hidden="true"
                />

                {/* Bottom edge micro-reflection */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-px pointer-events-none z-0"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
                    }}
                    aria-hidden="true"
                />

                {/* Actual content sits above all glass layers */}
                <div className="relative z-10 w-full h-full">
                    {children}
                </div>
            </motion.div>
        </div>
    )
}
