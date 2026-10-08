import { motion } from 'framer-motion'
import { Download } from 'lucide-react'
import { githubLogo, linkedinLogo, mediumLogo } from '../../assets/index.js'

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="bg-[#0A0A0F] border-t border-white/[0.06] py-16 lg:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-center gap-10">

                {/* Resume CTA */}
                <motion.a
                    href="/BeulahAkindeleResume.pdf"
                    download
                    className="group flex items-center gap-3 px-10 py-4 bg-[#D4A96A] text-[#0A0A0F] font-syne font-black text-[11px] uppercase tracking-[0.3em] rounded-full hover:bg-[#E0BB80] transition-colors duration-200"
                    animate={{
                        boxShadow: [
                            '0 0 0px rgba(212,169,106,0)',
                            '0 0 22px rgba(212,169,106,0.4), 0 0 44px rgba(212,169,106,0.12)',
                            '0 0 0px rgba(212,169,106,0)',
                        ],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                    aria-label="Download resume PDF"
                >
                    <Download
                        size={15}
                        className="group-hover:-translate-y-0.5 transition-transform duration-200"
                        aria-hidden="true"
                    />
                    Download Resume
                </motion.a>

                {/* Social links */}
                <div className="flex items-center gap-8" role="list" aria-label="Social links">
                    <a
                        href="https://github.com/akibeulah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-35 hover:opacity-85 transition-opacity duration-200 hover:scale-105 transform"
                        aria-label="GitHub profile — akibeulah"
                        role="listitem"
                    >
                        <img className="w-14 lg:w-16" src={githubLogo.src} alt={githubLogo.alt} />
                    </a>
                    <a
                        href="https://www.linkedin.com/in/beulah-akindele-8093b9193/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-35 hover:opacity-85 transition-opacity duration-200 hover:scale-105 transform"
                        aria-label="LinkedIn profile — Beulah Akindele"
                        role="listitem"
                    >
                        <img className="w-14 lg:w-16" src={linkedinLogo.src} alt={linkedinLogo.alt} />
                    </a>
                    <a
                        href="https://medium.com/@akibeulah"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-35 hover:opacity-85 transition-opacity duration-200 hover:scale-105 transform"
                        aria-label="Medium blog — akibeulah"
                        role="listitem"
                    >
                        <img className="w-14 lg:w-16" src={mediumLogo.src} alt={mediumLogo.alt} />
                    </a>
                </div>

                <a
                    href="mailto:akibeulah@gmail.com"
                    className="font-dm-mono text-[#F0EDE6]/45 hover:text-[#D4A96A] text-xs tracking-[0.2em] transition-colors duration-200"
                >
                    akibeulah@gmail.com
                </a>

                <div className="w-16 h-px bg-white/[0.08]" aria-hidden="true" />

                <p className="font-dm-mono text-[#F0EDE6]/18 text-[10px] uppercase tracking-[0.3em] text-center">
                    © {year} Beulah Akindele · Principal Fullstack Engineer
                </p>
            </div>
        </footer>
    )
}
