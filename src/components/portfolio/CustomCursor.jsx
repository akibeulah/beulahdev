import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function CustomCursor() {
    const [pos, setPos] = useState({ x: -100, y: -100 })
    const [isHovering, setIsHovering] = useState(false)
    const [isTouchDevice, setIsTouchDevice] = useState(true)

    useEffect(() => {
        setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches)

        const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })

        const onOver = (e) => {
            const isInteractive = !!e.target.closest(
                'a, button, [role="button"], input, textarea, select, label'
            )
            setIsHovering(isInteractive)
        }

        window.addEventListener('mousemove', onMove)
        document.addEventListener('mouseover', onOver)

        return () => {
            window.removeEventListener('mousemove', onMove)
            document.removeEventListener('mouseover', onOver)
        }
    }, [])

    if (isTouchDevice) return null

    const dotSize = isHovering ? 36 : 10

    return (
        <>
            <motion.div
                className="fixed z-[9999] pointer-events-none top-0 left-0 rounded-full"
                animate={{
                    x: pos.x - dotSize / 2,
                    y: pos.y - dotSize / 2,
                    width: dotSize,
                    height: dotSize,
                    backgroundColor: isHovering ? 'transparent' : '#D4A96A',
                    borderColor: '#D4A96A',
                    borderWidth: isHovering ? 2 : 0,
                    borderStyle: 'solid',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.25 }}
                aria-hidden="true"
            />
            <motion.div
                className="fixed z-[9998] pointer-events-none top-0 left-0 rounded-full"
                style={{ backgroundColor: 'rgba(212,169,106,0.22)' }}
                animate={{ x: pos.x - 5, y: pos.y - 5, width: 10, height: 10 }}
                transition={{ type: 'spring', stiffness: 150, damping: 20, mass: 0.6 }}
                aria-hidden="true"
            />
        </>
    )
}
