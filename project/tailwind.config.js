/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f3f2ff',
                    100: '#e8e6ff',
                    200: '#d4cfff',
                    300: '#b1a8ff',
                    400: '#8b7fff',
                    500: '#6c63ff',
                    600: '#5552f4',
                    700: '#4c4ddc',
                    800: '#3c3aa3',
                    900: '#353483',
                },
            },
            fontFamily: {
                outfit: ['Outfit', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
