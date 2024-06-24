/** @type {import('tailwindcss').Config} */
import tailwind_scrollbar from "tailwind-scrollbar"

export default {
    content: ["./src/**/*.{html,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#",
                secondary: "#"
            }
        },
    },
    plugins: [
        tailwind_scrollbar,
    ],
}

