/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
       background: "#1e293b", // <--- HOT PINK FOR TESTING
        
        // Much Lighter Surface (Slate-800 instead of 900/950)
        surface: "#1e293b",       
        
        input: "#334155",         // Slate-700 (Lighter inputs)
        
        primary: "#3b82f6",       // Electric Blue
        primaryHover: "#2563eb",  
        
        text: "#f8fafc",          // White
        muted: "#94a3b8",         // Slate-400
        border: "#334155",        // Lighter borders
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.4)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)', // Deeper shadow for pop
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};