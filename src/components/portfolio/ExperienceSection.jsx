import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useSelector } from 'react-redux'
import GlassCard from './GlassCard.jsx'

function CardContent({ data }) {
    return (
        <>
            <div className="mb-3">
                <p className="font-space-mono text-[#E07060] text-[10px] uppercase tracking-[0.3em] mb-1">
                    {data.company}
                </p>
                <h3 className="font-syne font-bold text-white text-lg leading-snug">
                    {data.title}
                </h3>
                <p className="font-dm-mono text-[#F0EDE6]/35 text-[11px] mt-1">
                    {data.time}
                </p>
            </div>

            {Array.isArray(data.desc) ? (
                <ul className="space-y-1.5 mb-4">
                    {data.desc.map((item, i) => (
                        <li
                            key={i}
                            className="font-dm-mono text-[#F0EDE6]/55 text-xs leading-relaxed flex items-start gap-2"
                        >
                            <span className="text-[#D4A96A]/70 flex-shrink-0 mt-0.5">—</span>
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="font-dm-mono text-[#F0EDE6]/55 text-xs leading-relaxed mb-4">
                    {data.desc}
                </p>
            )}

            {data.tech && data.tech.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                    {data.tech.map((t, i) => (
                        <span
                            key={i}
                            className="font-space-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.06] border border-white/[0.12] text-[#F0EDE6]/45"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            )}
        </>
    )
}

function ExperienceCard({ data, index, isLeft }) {
    const ref    = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-60px' })

    const entranceProps = {
        initial:    { opacity: 0, x: isLeft ? -40 : 40, y: 16 },
        animate:    inView ? { opacity: 1, x: 0, y: 0 } : {},
        transition: { duration: 0.6, delay: index * 0.15 },
    }

    const card = (
        <motion.div {...entranceProps} className="h-full">
            <GlassCard>
                <div className="p-6">
                    <CardContent data={data} />
                </div>
            </GlassCard>
        </motion.div>
    )

    return (
        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-[1fr_60px_1fr] gap-0 items-start">
            {/* Left slot — desktop even cards */}
            <div className="hidden lg:block lg:pr-8">
                {isLeft && card}
            </div>

            {/* Center node */}
            <div className="hidden lg:flex flex-col items-center">
                <motion.div
                    className="relative mt-6 w-4 h-4 bg-[#D4A96A] rounded-full z-10 flex-shrink-0"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: index * 0.15 + 0.2, type: 'spring', stiffness: 300 }}
                >
                    <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ background: 'rgba(212,169,106,0.35)', animationDuration: '3s' }}
                    />
                </motion.div>
            </div>

            {/* Right slot — desktop odd cards */}
            <div className="hidden lg:block lg:pl-8">
                {!isLeft && card}
            </div>

            {/* Mobile card */}
            <div className="lg:hidden pl-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <GlassCard>
                        <div className="p-5">
                            <CardContent data={data} />
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </div>
    )
}

function SkeletonCard({ isLeft }) {
    const skeletonBody = (
        <GlassCard>
            <div className="p-6 animate-pulse">
                <div className="h-2 bg-white/5 rounded w-1/3 mb-3" />
                <div className="h-5 bg-white/5 rounded w-2/3 mb-2" />
                <div className="h-2 bg-white/5 rounded w-1/4 mb-4" />
                <div className="h-2 bg-white/5 rounded w-full mb-1.5" />
                <div className="h-2 bg-white/5 rounded w-4/5" />
            </div>
        </GlassCard>
    )

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_60px_1fr] gap-0 items-start mb-10">
            <div className={`lg:pr-8 ${isLeft ? '' : 'hidden lg:block'}`}>
                {isLeft && skeletonBody}
            </div>
            <div className="hidden lg:flex flex-col items-center">
                <div className="mt-6 w-4 h-4 rounded-full" style={{ background: 'rgba(212,169,106,0.25)' }} />
            </div>
            <div className={`lg:pl-8 ${!isLeft ? '' : 'hidden lg:block'}`}>
                {!isLeft && skeletonBody}
            </div>
            <div className="lg:hidden pl-10">
                <GlassCard>
                    <div className="p-5 animate-pulse">
                        <div className="h-2 bg-white/5 rounded w-1/3 mb-3" />
                        <div className="h-5 bg-white/5 rounded w-2/3 mb-2" />
                        <div className="h-2 bg-white/5 rounded w-full" />
                    </div>
                </GlassCard>
            </div>
        </div>
    )
}

export default function ExperienceSection() {
    const ref        = useRef(null)
    const inView     = useInView(ref, { once: true, margin: '-80px' })
    const experience = useSelector((state) => state.siteData.experience)

    return (
        <section id="experience" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.p
                    className="font-space-mono text-[#6BB8C4] text-[10px] uppercase tracking-[0.45em] mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    02 — Experience
                </motion.p>

                <motion.h2
                    className="font-syne font-black text-white mb-16 leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Work <span className="text-[#6BB8C4]">History</span>
                </motion.h2>

                <div className="relative">
                    {/* Desktop center line */}
                    <div
                        className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to bottom, #D4A96A 0%, #6BB8C4 60%, rgba(107,184,196,0) 100%)',
                        }}
                        aria-hidden="true"
                    />
                    {/* Mobile left line */}
                    <div
                        className="lg:hidden absolute left-3.5 top-0 bottom-0 w-px pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, #D4A96A, rgba(107,184,196,0))' }}
                        aria-hidden="true"
                    >
                        <div className="absolute -left-[3px] top-0 w-[7px] h-[7px] rounded-full bg-[#D4A96A]" />
                    </div>

                    <div className="flex flex-col gap-10 lg:gap-14">
                        {experience.length === 0
                            ? [0, 1, 2].map((i) => <SkeletonCard key={i} isLeft={i % 2 === 0} />)
                            : experience.map((item, i) => (
                                  <ExperienceCard key={i} data={item} index={i} isLeft={i % 2 === 0} />
                              ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
