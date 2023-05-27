/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            spacing: {
                200: "800px",
                160: "640px",
                120: "480px",
                200: "800px",
                160: "640px",
                120: "480px",
                0.9: "90%",
                0.98: "98%"
            },
            maxWidth: {
                50: "400px",
                100: "500px",
                200: "800px",
            },
            minWidth: {
                50: "300px",
                100: "400px",
                200: "600px",
            },
            minHeight: {
                12: "48px",
            },
            backgroundImage: {
                "suk-bg": "url('public/suk-bg-dark.png')",
            },
            transitionProperty: {
                height: "height",
                spacing: "margin, padding",
            },
            margin: {
                "1/4": "25%",
            },
        },
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
