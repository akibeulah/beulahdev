import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import GlassCard from './GlassCard.jsx'

function CountUp({ to, suffix = '' }) {
    const [count, setCount] = useState(0)
    const ref    = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (!inView) return
        const duration = 1600
        const start    = Date.now()
        const frame    = () => {
            const elapsed  = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased    = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * to))
            if (progress < 1) requestAnimationFrame(frame)
        }
        requestAnimationFrame(frame)
    }, [inView, to])

    return <span ref={ref}>{count}{suffix}</span>
}

const STATS = [
    { value: 5,  suffix: '+', label: 'Years Experience' },
    { value: 500, suffix: '+', label: 'Institutions Served' },
    { value: 9,  suffix: '',  label: 'Countries Deployed' },
]

export default function ProfileSummary() {
    const ref    = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="about" ref={ref} className="relative py-24 lg:py-36 overflow-hidden">
            {/* Grid texture */}
            <div className="absolute inset-0 grid-bg pointer-events-none opacity-60" aria-hidden="true" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Section label */}
                <motion.p
                    className="font-space-mono text-[#D4A96A] text-[10px] uppercase tracking-[0.45em] mb-14"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    01 — Profile
                </motion.p>

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    {/* Left: big stat */}
                    <motion.div
                        className="lg:col-span-4"
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        <div className="relative select-none">
                            <p
                                className="font-syne font-black leading-none"
                                style={{
                                    fontSize: 'clamp(6rem, 14vw, 11rem)',
                                    color: 'rgba(212,169,106,0.08)',
                                }}
                            >
                                <CountUp to={5} />+
                            </p>
                            <p
                                className="font-syne font-black leading-none text-[#D4A96A]"
                                style={{
                                    fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                                    marginTop: 'clamp(-3rem, -6vw, -5rem)',
                                }}
                            >
                                YRS
                            </p>
                            <p className="font-space-mono text-[#F0EDE6]/35 text-[10px] uppercase tracking-[0.4em] mt-4">
                                Engineering Experience
                            </p>
                        </div>

                        {/* Mini stats */}
                        <div className="flex flex-col gap-4 mt-10">
                            {STATS.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    className="flex items-center gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <span className="font-syne font-black text-2xl text-white">
                                        <CountUp to={stat.value} suffix={stat.suffix} />
                                    </span>
                                    <span className="font-space-mono text-[10px] uppercase tracking-widest text-[#F0EDE6]/35">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: bio */}
                    <motion.div
                        className="lg:col-span-8"
                        initial={{ opacity: 0, x: 50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.25 }}
                    >
                        <h2
                            className="font-syne font-black text-white mb-8 leading-[1.1]"
                            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
                        >
                            Building systems that{' '}
                            <span className="text-[#E07060]">power</span> financial infrastructure
                        </h2>

                        <p className="font-dm-mono text-[#F0EDE6]/60 text-sm leading-[1.9] mb-5">
                            I'm Beulah, a Principal Full Stack Software Engineer in Lagos with 5 years building backend systems, with a focus on financial and payments infrastructure. I co-lead the Channels team at Qore, where our platform moves interbank transfers and card, POS and USSD transactions for 500+ financial institutions in 9 African countries over 10+ payment gateways and switches.
                            I build for resilience and idempotency, so that a 3AM failure upstream or downstream is still visible when the self-healing measures have failed too. I design each system around what it actually needs, not one pattern for everything. I work as a product-minded developer: the experience of the engineers building on a system should be as good as the experience of the people using it.
                        </p>

                        <p className="font-dm-mono text-[#F0EDE6]/60 text-sm leading-[1.9] mb-10">
                            Outside Qore I founded SPRTN, a super SaaS for small and growing businesses. Instead of one tool per job, it provides services that cut across how a business runs: content management for websites and blogs, e-commerce from catalogue to checkout and payments, property listings and enquiries, visitor access for estates, and the administrative work behind them, such as staff roles, bookings, customer records and reporting. It is live and generating revenue. The direction now is AI built into the product: an assistant in the dashboard that drafts a product from a photo, edits images and answers questions about sales, and a builder that designs and publishes a business's site for them. I'm most at home owning hard problems end to end, from the database to the deployment pipeline.
                        </p>

                        {/* Fun facts */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: '○', label: 'Minimalist' },
                                { icon: '♪', label: 'Guitarist'  },
                                { icon: '⚙', label: 'Mechanic'   },
                            ].map((fact, i) => (
                                <motion.div
                                    key={fact.label}
                                    className="h-full"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.55 + i * 0.1 }}
                                >
                                    <GlassCard tiltDeg={8}>
                                        <div className="p-4">
                                            <span className="text-2xl block mb-2 text-[#D4A96A]">
                                                {fact.icon}
                                            </span>
                                            <span className="font-space-mono text-[10px] uppercase tracking-widest text-[#F0EDE6]/45">
                                                {fact.label}
                                            </span>
                                        </div>
                                    </GlassCard>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Gradient divider */}
                <motion.div
                    className="mt-20 h-px"
                    style={{
                        background:
                            'linear-gradient(90deg, #D4A96A 0%, #6BB8C4 50%, #E07060 100%)',
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={inView ? { scaleX: 1, opacity: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </section>
    )
}
