/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from "tailwind-scrollbar"

export default {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        tailwind_scrollbar,
    ],
}

