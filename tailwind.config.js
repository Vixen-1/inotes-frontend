/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceLimited: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        slideInFromLeft: {
          "0%": { transform: "translateX(-100%)" }, // Start off-screen to the left
          "100%": { transform: "translateX(0)" }, // End at the center (natural position)
        },
      },
      animation: {
        fadeIn: "fadeIn 3s ease-in-out",
        bounce3: "bounceLimited 2s cubic-bezier(0.5, 0, 0.9, 1) 2",
        slideInFromLeft: "slideInFromLeft 4s ease-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    },
  ],
};
