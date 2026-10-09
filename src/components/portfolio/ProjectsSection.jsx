import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useSelector } from 'react-redux'
import { ExternalLink, Github, ArrowUpRight, X } from 'lucide-react'
import GlassCard from './GlassCard.jsx'

const CARD_ACCENTS = ['#D4A96A', '#E07060', '#6BB8C4', '#D4A96A', '#E07060', '#6BB8C4']

function ProjectCard({ project, index, size = 'normal', onOpen }) {
    const ref    = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-40px' })
    const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
    const hasWriteUp = Boolean(project.summary)
    const open = () => hasWriteUp && onOpen?.(project)
    const onKeyDown = (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return
        e.preventDefault()
        open()
    }

    return (
        // Outer: scroll-entrance animation + lift on hover
        <motion.div
            ref={ref}
            className={hasWriteUp ? 'h-full cursor-pointer' : 'h-full'}
            onClick={open}
            onKeyDown={onKeyDown}
            role={hasWriteUp ? 'button' : undefined}
            tabIndex={hasWriteUp ? 0 : undefined}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: 'easeOut' } }}
        >
            {/* Inner: 3D glass card */}
            <GlassCard
                accentTop={accent}
                group={true}
                innerClassName="flex flex-col"
            >
                <div className="flex flex-col flex-1 p-5 lg:p-6">
                    {/* Title + links */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                        <h3
                            className="font-syne font-bold text-white leading-tight"
                            style={{ fontSize: size === 'large' ? '1.15rem' : '1rem' }}
                        >
                            {project.title}
                        </h3>
                        <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 mt-0.5">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.title} on GitHub`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 text-[#F0EDE6]/45 hover:text-white transition-colors"
                                >
                                    <Github size={13} />
                                </a>
                            )}
                            {project.url && (
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.title} live demo`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1.5 text-[#F0EDE6]/45 hover:text-white transition-colors"
                                >
                                    <ExternalLink size={13} />
                                </a>
                            )}
                        </div>
                    </div>

                    <p className="font-dm-mono text-[#F0EDE6]/55 text-xs leading-[1.85] mb-4 flex-1">
                        {project.summary || project.desc}
                    </p>

                    {hasWriteUp && (
                        <p className="font-space-mono text-[9px] uppercase tracking-[0.3em] mb-3" style={{ color: accent }}>
                            Read the write-up
                        </p>
                    )}

                    <div className="flex flex-wrap gap-1.5">
                        {(project.tech || []).slice(0, size === 'large' ? 7 : 4).map((t, i) => (
                            <span
                                key={i}
                                className="font-space-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.06] border border-white/[0.12] text-[#F0EDE6]/50 transition-colors duration-200"
                            >
                                {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Arrow on hover */}
                <div
                    className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                    aria-hidden="true"
                >
                    <ArrowUpRight size={15} style={{ color: accent }} />
                </div>
            </GlassCard>
        </motion.div>
    )
}

function ProjectDetail({ project, onClose }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose()
        document.addEventListener('keydown', onKey)
        const { overflow } = document.body.style
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', onKey)
            document.body.style.overflow = overflow
        }
    }, [onClose])

    return (
        <motion.div
            className="fixed inset-0 z-[80] flex items-end md:items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                role="dialog"
                aria-modal="true"
                aria-label={project.title}
                className="relative w-full md:max-w-2xl max-h-[88vh] overflow-y-auto bg-[#12121A] border border-white/[0.12] p-6 md:p-10"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 p-2 text-[#F0EDE6]/45 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>

                <h3 className="font-syne font-black text-white text-2xl md:text-3xl leading-tight pr-10 mb-3">
                    {project.title}
                </h3>
                <p className="font-dm-mono text-[#D4A96A] text-xs leading-[1.8] mb-6">{project.summary}</p>

                {project.desc.split(/\n\s*\n/).map((para, i) => (
                    <p key={i} className="font-dm-mono text-[#F0EDE6]/65 text-sm leading-[1.9] mb-4">
                        {para}
                    </p>
                ))}

                <div className="flex flex-wrap gap-1.5 mt-6">
                    {(project.tech || []).map((t, i) => (
                        <span
                            key={i}
                            className="font-space-mono text-[9px] uppercase tracking-wider px-2 py-0.5 bg-white/[0.06] border border-white/[0.12] text-[#F0EDE6]/50"
                        >
                            {t}
                        </span>
                    ))}
                </div>

                {(project.url || project.githubUrl) && (
                    <div className="flex flex-wrap gap-6 mt-8">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-space-mono text-[10px] uppercase tracking-[0.25em] text-[#E07060] hover:text-white transition-colors"
                            >
                                <ExternalLink size={13} /> Visit
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-space-mono text-[10px] uppercase tracking-[0.25em] text-[#E07060] hover:text-white transition-colors"
                            >
                                <Github size={13} /> Source
                            </a>
                        )}
                    </div>
                )}
            </motion.div>
        </motion.div>
    )
}

function SkeletonCard() {
    return (
        <GlassCard innerClassName="animate-pulse">
            <div className="p-6">
                <div className="h-5 bg-white/5 rounded w-2/3 mb-3" />
                <div className="h-3 bg-white/5 rounded w-full mb-1.5" />
                <div className="h-3 bg-white/5 rounded w-4/5 mb-1.5" />
                <div className="h-3 bg-white/5 rounded w-3/5 mb-5" />
                <div className="flex gap-2">
                    <div className="h-4 bg-white/5 rounded w-14" />
                    <div className="h-4 bg-white/5 rounded w-14" />
                    <div className="h-4 bg-white/5 rounded w-10" />
                </div>
            </div>
        </GlassCard>
    )
}

const BENTO_AREAS = {
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows:    '280px 280px 280px',
    gridTemplateAreas: `
        "big  big  sm1"
        "big  big  sm2"
        "sm3  wide wide"
    `,
}

export default function ProjectsSection() {
    const ref      = useRef(null)
    const inView   = useInView(ref, { once: true, margin: '-80px' })
    const projects = useSelector((state) => state.siteData.projects)
    const isLoading = projects.length === 0
    const [openProject, setOpenProject] = useState(null)

    return (
        <section id="projects" ref={ref} className="py-24 lg:py-36">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.p
                    className="font-space-mono text-[#E07060] text-[10px] uppercase tracking-[0.45em] mb-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    03 — Projects
                </motion.p>

                <motion.h2
                    className="font-syne font-black text-white mb-12 leading-none"
                    style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Selected <span className="text-[#E07060]">Work</span>
                </motion.h2>

                {isLoading && (
                    <>
                        <div className="hidden lg:grid gap-4" style={BENTO_AREAS}>
                            {['big', 'sm1', 'sm2', 'sm3', 'wide'].map((area) => (
                                <div key={area} style={{ gridArea: area }}>
                                    <SkeletonCard />
                                </div>
                            ))}
                        </div>
                        <div className="lg:hidden flex flex-col gap-4">
                            {[0, 1, 2].map((i) => (
                                <div key={i} className="h-56">
                                    <SkeletonCard />
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {!isLoading && (
                    <>
                        {/* Desktop asymmetric bento */}
                        <div className="hidden lg:grid gap-4" style={BENTO_AREAS}>
                            {projects[0] && <div style={{ gridArea: 'big'  }}><ProjectCard project={projects[0]} index={0} size="large" onOpen={setOpenProject} /></div>}
                            {projects[1] && <div style={{ gridArea: 'sm1'  }}><ProjectCard project={projects[1]} index={1} onOpen={setOpenProject} /></div>}
                            {projects[2] && <div style={{ gridArea: 'sm2'  }}><ProjectCard project={projects[2]} index={2} onOpen={setOpenProject} /></div>}
                            {projects[3] && <div style={{ gridArea: 'sm3'  }}><ProjectCard project={projects[3]} index={3} onOpen={setOpenProject} /></div>}
                            {projects[4] && <div style={{ gridArea: 'wide' }}><ProjectCard project={projects[4]} index={4} size="large" onOpen={setOpenProject} /></div>}
                        </div>

                        {/* Desktop: everything past the bento */}
                        {projects.length > 5 && (
                            <div className="hidden lg:block mt-16">
                                <p className="font-space-mono text-[#F0EDE6]/35 text-[10px] uppercase tracking-[0.45em] mb-6">
                                    More work
                                </p>
                                <div className="grid grid-cols-3 gap-4">
                                    {projects.slice(5).map((p, i) => (
                                        <div key={i} className="h-[260px]">
                                            <ProjectCard project={p} index={i + 5} onOpen={setOpenProject} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tablet 2-col */}
                        <div className="hidden md:grid lg:hidden grid-cols-2 gap-4">
                            {projects.map((p, i) => (
                                <div key={i} className="h-64">
                                    <ProjectCard project={p} index={i} onOpen={setOpenProject} />
                                </div>
                            ))}
                        </div>

                        {/* Mobile single-col */}
                        <div className="md:hidden flex flex-col gap-4">
                            {projects.map((p, i) => (
                                <div key={i} className="min-h-[220px]">
                                    <ProjectCard project={p} index={i} onOpen={setOpenProject} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <AnimatePresence>
                {openProject && <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />}
            </AnimatePresence>
        </section>
    )
}
