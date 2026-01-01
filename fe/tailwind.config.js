/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#60a5fa', // Light blue
                'primary-dark': '#3b82f6',
                'primary-light': '#93c5fd',
                secondary: '#64748b',
                success: '#10b981',
                danger: '#ef4444',
                warning: '#f59e0b',
                info: '#06b6d4',
            },
        },
    },
    plugins: [],
}
