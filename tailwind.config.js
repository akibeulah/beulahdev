/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from "tailwind-scrollbar"

export default {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {
            colors: {
  background: '#0A192F',      // Deep navy
  bgLight: '#112240',         // Slightly lighter navy
  text: '#E6F1FF',            // Off-white
  textSecondary: '#8892B0',   // Muted blue-gray
  accent: '#64FFDA',          // Bright cyan/teal
  accentHover: '#57E6C5',     // Darker teal
  highlight: '#F97316',       // Orange highlight
            }
        },
    },
    plugins: [
        tailwind_scrollbar,
    ],
}

