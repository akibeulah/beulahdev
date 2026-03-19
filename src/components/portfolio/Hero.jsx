import { useEffect, useState, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const TAGLINES = [
    'Architecting Scalable Systems',
    'Engineering Fintech Infrastructure',
    'Building Microservices at Scale',
    'Designing Distributed Systems',
]

function TypewriterTagline() {
    const [displayed, setDisplayed] = useState('')
    const [idx, setIdx] = useState(0)
    const [deleting, setDeleting] = useState(false)

    useEffect(() => {
        const current = TAGLINES[idx]
        let timer
        if (!deleting && displayed.length < current.length) {
            timer = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
        } else if (!deleting && displayed.length === current.length) {
            timer = setTimeout(() => setDeleting(true), 2200)
        } else if (deleting && displayed.length > 0) {
            timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
        } else if (deleting && displayed.length === 0) {
            setDeleting(false)
            setIdx((prev) => (prev + 1) % TAGLINES.length)
        }
        return () => clearTimeout(timer)
    }, [displayed, deleting, idx])

    return (
        <span className="font-dm-mono text-[#D4A96A] text-sm lg:text-base">
            {displayed}
            <span className="typewriter-cursor">_</span>
        </span>
    )
}

export default function Hero() {
    const rawX = useMotionValue(0)
    const rawY = useMotionValue(0)

    // ── Per-shape derived motion values (useTransform is valid at top-level) ──

    // Shape 1 — large circle top-right: follows mouse, medium lag
    const s1x = useSpring(useTransform(rawX, v => v * 0.8),  { stiffness: 42, damping: 20 })
    const s1y = useSpring(useTransform(rawY, v => v * 0.6),  { stiffness: 42, damping: 20 })

    // Shape 2 — square bottom-right: counter-parallax, fast snap
    const s2x = useSpring(useTransform(rawX, v => v * -1.1), { stiffness: 70, damping: 14 })
    const s2y = useSpring(useTransform(rawY, v => v * -1.4), { stiffness: 70, damping: 14 })

    // Shape 3 — vertical bar: subtle side sway only
    const s3x = useSpring(useTransform(rawX, v => v * 0.4),  { stiffness: 90, damping: 30 })
    const s3y = useSpring(useTransform(rawY, v => v * 0.2),  { stiffness: 90, damping: 30 })

    // Shape 4 — circle bottom-left: cross-axis (x from Y, y from X) for unexpected drift
    const s4x = useSpring(useTransform(rawY, v => v *  0.9), { stiffness: 28, damping: 12 })
    const s4y = useSpring(useTransform(rawX, v => v * -0.7), { stiffness: 28, damping: 12 })

    // Shape 5 — thin bar top-left: slow, dramatic vertical drag
    const s5x = useSpring(useTransform(rawX, v => v * -0.5), { stiffness: 18, damping: 10 })
    const s5y = useSpring(useTransform(rawY, v => v *  1.2), { stiffness: 18, damping: 10 })

    // Decorative right element: gentle, lags the most
    const sdx = useSpring(useTransform(rawX, v => v * 0.35), { stiffness: 30, damping: 22 })
    const sdy = useSpring(useTransform(rawY, v => v * 0.3),  { stiffness: 30, damping: 22 })

    // Breathing blobs — very slow cursor displacement so it feels like the light source shifts
    const sb1x = useSpring(useTransform(rawX, v => v * 0.22), { stiffness: 16, damping: 18 })
    const sb1y = useSpring(useTransform(rawY, v => v * 0.18), { stiffness: 16, damping: 18 })
    const sb2x = useSpring(useTransform(rawX, v => v * 0.28), { stiffness: 14, damping: 16 })
    const sb2y = useSpring(useTransform(rawY, v => v * 0.24), { stiffness: 14, damping: 16 })

    // Same duration for both — only the starting phase is random
    const BREATHE_DURATION = 5.5
    const breathe = useMemo(() => ({
        left:  { duration: BREATHE_DURATION, delay: -(Math.random() * BREATHE_DURATION) },
        right: { duration: BREATHE_DURATION, delay: -(Math.random() * BREATHE_DURATION) },
    }), [])

    useEffect(() => {
        const onMove = (e) => {
            rawX.set((e.clientX / window.innerWidth  - 0.5) * 80)
            rawY.set((e.clientY / window.innerHeight - 0.5) * 60)
        }
        window.addEventListener('mousemove', onMove)
        return () => window.removeEventListener('mousemove', onMove)
    }, [rawX, rawY])

    const containerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12 } },
    }

    const itemVariants = {
        hidden:   { y: 40, opacity: 0 },
        visible:  { y:  0, opacity: 1, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
    }

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center bg-[#0A0A0F]"
            style={{ overflow: 'clip' }}
        >
            {/* Gradient mesh blobs */}
            <div className="absolute inset-0 z-0" aria-hidden="true">
                {/* Ambient drifting blobs */}
                <div className="hero-blob hero-blob-gold" />
                <div className="hero-blob hero-blob-coral" />
                <div className="hero-blob hero-blob-teal" />
                {/* Breathing blobs — Framer Motion drives both the breathe + cursor parallax
                    so the two transforms (scale and translateX/Y) never conflict          */}
                <motion.div
                    aria-hidden="true"
                    className="hero-blob-breathe hero-blob-breathe-left"
                    animate={{ scale: [0.78, 1.18, 0.78], opacity: [0.42, 1, 0.42] }}
                    transition={{
                        duration: breathe.left.duration,
                        delay:    breathe.left.delay,
                        repeat:   Infinity,
                        ease:     'easeInOut',
                        times:    [0, 0.5, 1],
                    }}
                    style={{ x: sb1x, y: sb1y }}
                />
                <motion.div
                    aria-hidden="true"
                    className="hero-blob-breathe hero-blob-breathe-right"
                    animate={{ scale: [0.78, 1.18, 0.78], opacity: [0.42, 1, 0.42] }}
                    transition={{
                        duration: breathe.right.duration,
                        delay:    breathe.right.delay,
                        repeat:   Infinity,
                        ease:     'easeInOut',
                        times:    [0, 0.5, 1],
                    }}
                    style={{ x: sb2x, y: sb2y }}
                />
            </div>

            {/* Floating geometric decorations — each shape has independent spring personality */}

            {/* Shape 1: large circle top-right — medium lag, follows mouse */}
            <motion.div
                aria-hidden="true"
                className="absolute top-16 right-16 w-36 h-36 border border-[#D4A96A]/20 rounded-full"
                style={{ x: s1x, y: s1y }}
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />

            {/* Shape 2: square bottom-right — counter-parallax, snappy */}
            <motion.div
                aria-hidden="true"
                className="absolute bottom-32 right-1/4 w-20 h-20 border border-[#E07060]/22"
                style={{ x: s2x, y: s2y }}
                animate={{ rotate: -360 }}
                transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            />

            {/* Shape 3: vertical bar right — barely moves, stiff */}
            <motion.div
                aria-hidden="true"
                className="absolute top-1/2 right-12 w-3 h-24 bg-gradient-to-b from-[#6BB8C4]/25 to-transparent"
                style={{ x: s3x, y: s3y }}
            />

            {/* Shape 4: circle bottom-left — cross-axis drift, floaty */}
            <motion.div
                aria-hidden="true"
                className="absolute bottom-24 left-[12%] w-24 h-24 border border-[#6BB8C4]/12 rounded-full"
                style={{ x: s4x, y: s4y }}
            />

            {/* Shape 5: thin bar top-left — slow, dramatic vertical drag */}
            <motion.div
                aria-hidden="true"
                className="absolute top-1/4 left-6 w-2 h-14 bg-[#D4A96A]/18"
                style={{ x: s5x, y: s5y }}
            />

            {/* Main content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-20">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-[90vw] lg:max-w-none"
                >
                    {/* Eyebrow */}
                    <motion.p
                        variants={itemVariants}
                        className="font-space-mono text-[#F0EDE6]/40 text-[10px] uppercase tracking-[0.45em] mb-6"
                    >
                        Portfolio 2026
                    </motion.p>

                    {/* ── NAME — single overflow clip so AKINDELE offset doesn't clip ── */}
                    <div
                        className="overflow-hidden mb-1 leading-none"
                        style={{ paddingBottom: '0.08em' }}
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="font-syne font-black leading-[0.88] text-white whitespace-nowrap"
                            style={{ fontSize: 'clamp(2.8rem, 9.5vw, 8rem)' }}
                        >
                            BEULAH
                        </motion.h1>
                    </div>
                    <div
                        className="overflow-hidden mb-6 leading-none"
                        style={{ paddingBottom: '0.08em' }}
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="font-syne font-black leading-[0.88] text-[#D4A96A] whitespace-nowrap"
                            style={{ fontSize: 'clamp(2.8rem, 9.5vw, 8rem)' }}
                        >
                            <span
                                className="inline-block"
                                style={{ paddingLeft: 'clamp(0px, 4vw, 5.5rem)' }}
                            >
                                AKINDELE
                            </span>
                        </motion.h1>
                    </div>

                    {/* Title */}
                    <motion.p
                        variants={itemVariants}
                        className="font-space-mono text-[#F0EDE6]/55 text-[11px] lg:text-[13px] uppercase tracking-[0.32em] mb-4"
                    >
                        Principal Fullstack Software Engineer
                    </motion.p>

                    {/* Typewriter */}
                    <motion.div variants={itemVariants} className="mb-10 h-6">
                        <TypewriterTagline />
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                        <button
                            onClick={() =>
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                            }
                            className="px-8 py-3.5 bg-[#E07060] text-white font-syne font-bold text-[11px] uppercase tracking-[0.22em] hover:bg-[#E88070] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(224,112,96,0.35)]"
                        >
                            View Work
                        </button>
                        <a
                            href="/resume.pdf"
                            download
                            className="px-8 py-3.5 border-2 border-[#D4A96A] text-[#D4A96A] font-syne font-bold text-[11px] uppercase tracking-[0.22em] hover:bg-[#D4A96A] hover:text-[#0A0A0F] transition-all duration-200 hover:-translate-y-0.5"
                        >
                            Download Resume
                        </a>
                    </motion.div>
                </motion.div>

                {/* Decorative right element — desktop, absolute so it can't affect text flow */}
                <motion.div
                    className="hidden lg:flex absolute right-12 xl:right-24 top-1/2 -translate-y-1/2 items-center justify-center"
                    initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    style={{ x: sdx, y: sdy }}
                    aria-hidden="true"
                >
                    <div className="relative w-52 h-52 xl:w-60 xl:h-60">
                        <div className="absolute inset-0 border border-[#D4A96A]/22 rotate-[14deg]" />
                        <div className="absolute inset-6 border border-[#E07060]/18 -rotate-[8deg]" />
                        <div className="absolute inset-12 border border-[#6BB8C4]/14 rotate-[4deg]" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <p className="font-syne font-black text-7xl leading-none"
                                   style={{ color: 'rgba(212,169,106,0.12)' }}>4+</p>
                                <p className="font-space-mono text-[9px] uppercase tracking-[0.4em] mt-1"
                                   style={{ color: 'rgba(240,237,230,0.15)' }}>Years</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                aria-hidden="true"
            >
                <p className="font-space-mono text-[9px] uppercase tracking-[0.45em] text-[#F0EDE6]/22">
                    Scroll
                </p>
                <motion.div
                    className="w-px h-10 bg-gradient-to-b from-[#D4A96A]/50 to-transparent"
                    animate={{ scaleY: [0.2, 1, 0.2], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </section>
    )
}
