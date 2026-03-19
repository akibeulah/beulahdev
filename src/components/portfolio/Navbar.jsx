import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
    { label: 'About',      href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects',   href: '#projects' },
    { label: 'Education',  href: '#education' },
]

const ACCENT_BY_SECTION = {
    about:      '#D4A96A',
    experience: '#6BB8C4',
    projects:   '#E07060',
    education:  '#D4A96A',
}

export default function Navbar() {
    const [scrolled, setScrolled]         = useState(false)
    const [menuOpen, setMenuOpen]         = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]')
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id) })
            },
            { threshold: 0.4, rootMargin: '-60px 0px -40% 0px' }
        )
        sections.forEach((s) => observer.observe(s))
        return () => observer.disconnect()
    }, [])

    const scrollTo = (href) => {
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled
                        ? 'bg-[#0A0A0F]/85 backdrop-blur-xl border-b border-white/[0.06]'
                        : 'bg-transparent'
                }`}
                initial={{ y: -80 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={() => scrollTo('#hero')}
                        className="flex items-center justify-center w-10 h-10 border-2 border-[#D4A96A] font-syne font-black text-[#D4A96A] text-sm hover:bg-[#D4A96A] hover:text-[#0A0A0F] transition-all duration-200"
                        aria-label="Go to top"
                    >
                        BA
                    </button>

                    {/* Desktop links */}
                    <ul className="hidden lg:flex items-center gap-10">
                        {NAV_LINKS.map(({ label, href }) => {
                            const id       = href.replace('#', '')
                            const isActive = activeSection === id
                            const accent   = ACCENT_BY_SECTION[id] || '#D4A96A'
                            return (
                                <li key={href}>
                                    <button
                                        onClick={() => scrollTo(href)}
                                        className={`font-dm-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 relative pb-0.5 ${
                                            isActive ? 'text-white' : 'text-[#F0EDE6]/45 hover:text-[#F0EDE6]'
                                        }`}
                                    >
                                        {label}
                                        <span
                                            className="absolute bottom-0 left-0 h-px transition-all duration-300"
                                            style={{
                                                width:      isActive ? '100%' : '0%',
                                                background: accent,
                                            }}
                                        />
                                    </button>
                                </li>
                            )
                        })}
                    </ul>

                    {/* Hamburger */}
                    <button
                        className="lg:hidden flex flex-col gap-[5px] p-2 z-[60]"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                    >
                        <span className="block w-6 h-px bg-[#D4A96A] transition-all duration-300 origin-center"
                              style={{ transform: menuOpen ? 'rotate(45deg) translate(3.5px, 3.5px)' : 'none' }} />
                        <span className="block w-6 h-px bg-[#D4A96A] transition-all duration-300"
                              style={{ opacity: menuOpen ? 0 : 1 }} />
                        <span className="block w-6 h-px bg-[#D4A96A] transition-all duration-300 origin-center"
                              style={{ transform: menuOpen ? 'rotate(-45deg) translate(3.5px, -3.5px)' : 'none' }} />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 bg-[#0A0A0F]/97 backdrop-blur-2xl flex flex-col items-center justify-center lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <ul className="flex flex-col items-center gap-10">
                            {NAV_LINKS.map(({ label, href }, i) => (
                                <motion.li
                                    key={href}
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0,   opacity: 1 }}
                                    exit={{ x: -30,    opacity: 0 }}
                                    transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <button
                                        onClick={() => scrollTo(href)}
                                        className="font-syne font-black text-5xl text-[#F0EDE6] hover:text-[#D4A96A] transition-colors duration-200"
                                    >
                                        {label}
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
