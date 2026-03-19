/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from "tailwind-scrollbar"

export default {
    content: ["./src/**/*.{html,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'bg-base': 'var(--bg-base)',
                'bg-card': 'var(--bg-card)',
                'bg-elevated': 'var(--bg-elevated)',
                'accent-lime': 'var(--accent-lime)',
                'accent-coral': 'var(--accent-coral)',
                'accent-cyan': 'var(--accent-cyan)',
                'text-body': 'var(--text-body)',
                'text-heading': 'var(--text-heading)',
                // Legacy
                background: '#0A192F',
                bgLight: '#112240',
                text: '#E6F1FF',
                textSecondary: '#8892B0',
                accent: '#64FFDA',
                accentHover: '#57E6C5',
                highlight: '#F97316',
            },
            fontFamily: {
                'syne': ['Syne', 'sans-serif'],
                'dm-mono': ['"DM Mono"', 'monospace'],
                'space-mono': ['"Space Mono"', 'monospace'],
            },
            animation: {
                'blob-drift': 'blobDrift 20s ease-in-out infinite',
                'blob-drift-slow': 'blobDrift 28s ease-in-out infinite',
                'blob-drift-med': 'blobDrift 24s ease-in-out infinite',
                'spin-slow': 'spin 40s linear infinite',
                'spin-reverse': 'spinReverse 30s linear infinite',
                'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
            },
            keyframes: {
                blobDrift: {
                    '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
                    '25%': { transform: 'translate(60px, -40px) scale(1.05)' },
                    '50%': { transform: 'translate(-40px, 60px) scale(0.95)' },
                    '75%': { transform: 'translate(30px, 50px) scale(1.02)' },
                },
                spinReverse: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(-360deg)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 0px rgba(212,169,106,0)' },
                    '50%': { boxShadow: '0 0 30px rgba(212,169,106,0.45), 0 0 60px rgba(212,169,106,0.15)' },
                },
            },
        },
    },
    plugins: [
        require('lightswind/plugin'),
        tailwind_scrollbar,
    ],
}
