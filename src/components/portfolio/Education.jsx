import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Calendar } from 'lucide-react'

export default function Education() {
    const ref    = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })

    return (
        <section id="education" ref={ref}>
            <motion.div
                className="border-t border-white/[0.06] bg-[#13131A]"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.7 }}
            >
                {/* Accent top line */}
                <div
                    className="h-[2px] w-full"
                    style={{
                        background:
                            'linear-gradient(90deg, transparent, #D4A96A 30%, #6BB8C4 70%, transparent)',
                    }}
                    aria-hidden="true"
                />

                <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
                    <motion.p
                        className="font-space-mono text-[#D4A96A] text-[10px] uppercase tracking-[0.45em] mb-8"
                        initial={{ opacity: 0, y: 12 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                    >
                        04 — Education
                    </motion.p>

                    <motion.div
                        className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10 lg:gap-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <div
                            className="w-14 h-14 border border-[#D4A96A]/25 flex items-center justify-center flex-shrink-0"
                            aria-hidden="true"
                        >
                            <GraduationCap className="text-[#D4A96A]" size={22} />
                        </div>

                        <div className="flex-1">
                            <h3 className="font-syne font-bold text-white text-xl lg:text-2xl mb-1">
                                B.Eng. Electrical and Electronics Engineering
                            </h3>
                            <div className="flex items-center gap-2 text-[#F0EDE6]/40">
                                <Calendar size={11} aria-hidden="true" />
                                <p className="font-dm-mono text-xs">2015 — 2020</p>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-white/[0.08]" aria-hidden="true" />

                        <div className="md:text-right">
                            <p className="font-syne font-bold text-[#F0EDE6]/75 text-lg lg:text-xl">
                                Covenant University
                            </p>
                            <p className="font-space-mono text-[10px] text-[#F0EDE6]/35 uppercase tracking-[0.3em] mt-1">
                                Ota, Nigeria
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}
