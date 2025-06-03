/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from "tailwindcss-animate";
// import defaultTheme from "tailwindcss/defaultTheme";

const customColors = {
  "primary-white": "#ffffff",
  "primary-100": "#f2f0ff",
  "primary-200": "#e8e4fe",
  "primary-300": "#b6aaf9",
  "primary-400": "#8872fd",
  "primary-500": "#5f4cc8",
  "primary-600": "#47389e",

  "danger-100": "#fef3f2",
  "danger-200": "#ffcdca",
  "danger-400": "#f04438",
  "danger-500": "#d92d20",

  "primary-grey-25": "rgba(249, 249, 251, 1)",
  "primary-grey-50": "#f5f6f8",
  "primary-grey-100": "#eeeef0",
  "primary-grey-200": "#e4e3ec",
  "primary-grey-300": "#bbc0ca",
  "primary-grey-400": "#8c94a6",
  "primary-grey-500": "#49576d",
  "primary-grey-600": "#1a1a21",

  "secondary-orange-400": "#ff7d52",
  "secondary-orange-600": "#9c3310",

  "secondary-yellow-100": "#fffaeb",
  "secondary-yellow-300": "#fedf89",
  "secondary-yellow-400": "#fec84b",
  "secondary-yellow-500": "#f79009",
  "secondary-yellow-600": "#b54708",

  "secondary-green-100": "#f1fef8",
  "secondary-green-200": "#dffbee",
  "secondary-green-300": "#93e9c1",
  "secondary-green-400": "#66c498",
  "secondary-green-500": "#339969",
  "secondary-green-600": "#14613d",

  "secondary-light-blue-100": "#eaf6ff",
  "secondary-light-blue-300": "#7cd4fd",
  "secondary-light-blue-400": "#0ba5ec",
  "secondary-light-blue-500": "#0086c9",
};

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/animations/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: { ...customColors },
      fontSize: {
        "tiny": ["0.625rem", "0.8125rem"],
        "tiny+": ["0.6875rem", "0.875rem"],
        "xs+": ["0.8125rem", "1.125rem"],
        "sm+": ["0.9375rem", "1.375rem"],
        '12': ['max(12px, 1.2rem)', { fontWeight: '500', letterSpacing: '-0.03em' }],
        '14': ['max(13px, 1.4rem)', { fontWeight: '500', letterSpacing: '-0.03em' }],
        '16': ['max(14px, 1.6rem)', 'normal'],
        '18': ['max(16px, 1.8rem)', { lineHeight: '1.55', letterSpacing: '-0.36px' }],
        '20': ['max(18px, 2rem)', 'normal'],
        '24': ['max(20px, 2.4rem)', 'normal'],
        '30': ['max(20px, 3rem)', 'normal'],
        '32': ['max(20px, 3.2rem)', 'normal'],
        '36': ['max(20px, 3.6rem)', 'normal'],
        '40': ['max(24px, 4rem)', 'normal'],
        '48': ['max(26px, 4.8rem)', 'normal'],
        '60': ['max(30px, 6rem)', { letterSpacing: '-0.06rem' }],
        '64': ['max(32px, 6.4rem)', { letterSpacing: '-0.05em', lineHeight: '1.2' }],
        '88': ['max(40px, 8.8rem)', 'normal'],
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        8.5: "max(6px, 0.8rem)",
        12.5: "max(8px, 1.2rem)",
        16.5: "max(12px, 1.6rem)",
        18: "4.5rem",
        24.5: "max(16px, 2.4rem)",
        gutter: "max(15px, 10rem)",
        "d-padding": "12rem",
        header: "max(56px, 8.8rem)",
        "app-header": "max(9.6rem, 70px)",
        "btn-height": "max(5.6rem, 45px)",
      },
      borderRadius: {
        8: "max(6px, 0.8rem)",
        12: "max(8px, 1.2rem)",
        16: "max(12px, 1.6rem)",
        24: "max(16px, 2.4rem)",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        noscript: "16",
        print: "15",
        preloader: "14",
        toast: "13",
        scrollbar: "12",
        notification: "11",
        modalT: "10",
        modal: "9",
        navigation: "8",
        modalS: "7",
        cursor: "6",
        canvas: "5",
      },
      boxShadow: {
        "lg": "0px 2px 12px -6px rgba(16, 24, 40, 0.1), 0px 6px 20px -10px rgba(16, 24, 40, 0.1)",
        "xl": "0px 4px 6px -2px rgba(16, 24, 40, 0.04), 0px 4px 20px -4px rgba(16, 24, 40, 0.1)",
        "marquee": "0px 2px 4px -2px rgba(16,24,40,0.05),0px 4px 12px -4px rgba(16,24,40,0.1)",
        "gradient": "linear-gradient(0deg, #fff 72.7%, hsla(0deg, 0%, 100%, 0) 124.11%), linear-gradient(89.94deg, #fff0eb 10.17%, #ddd7fe 80.93%)"
      },
      screens: {
        mobile: { max: "375px" },
        mobile2x: { max: "480px" },
        mobile3x: { max: "600px" },
        tablet: { max: "768px" },
        tablet2x: { max: "992px" },
        desktop: { max: "1200px" },
        desktop2x: { max: "1440px" },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-quad': 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
        'in-cubic': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
        'in-quart': 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
        'in-quint': 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
        'in-circ': 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
        'in-bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'out-quad': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'out-cubic': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
        'out-quart': 'cubic-bezier(0.165, 0.84, 0.44, 1)',
        'out-quint': 'cubic-bezier(0.23, 1, 0.32, 1)',
        'out-circ': 'cubic-bezier(0.075, 0.82, 0.165, 1)',
        'in-out-quad': 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
        'in-out-cubic': 'cubic-bezier(0.645, 0.045, 0.355, 1)',
        'in-out-quart': 'cubic-bezier(0.77, 0, 0.175, 1)',
        'in-out-quint': 'cubic-bezier(0.86, 0, 0.07, 1)',
        'in-out-expo': 'cubic-bezier(1, 0, 0, 1)',
        'in-out-circ': 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: '0',
          },
          "100%": {
            opacity: '1',
          },
        },
        "fade-out": {
          "0%": {
            opacity: '1',
            visibility: "visible",
          },
          "100%": {
            opacity: '0',
            visibility: "hidden",
          },
        },
        "slide-right": {
          "0%": {
            'margin-left': '-30%',
          },
          "100%": {
            'margin-left': '0%',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        spinner: {
          to: { transform: 'rotate(1turn)' },
        },
        marquee: {
          '0%': {
            transform: 'translate3d(calc(var(--offset) * -1), 0, 0)',
          },
          '100%': {
            transform: 'translate3d(calc(-100% - var(--offset)), 0, 0)',
          },
        },
        'marquee-inverted': {
          '0%': {
            transform: 'translate3d(calc(-100% - var(--offset)), 0, 0)',
          },
          '100%': {
            transform: 'translate3d(calc(var(--offset) * -1), 0, 0)',
          },
        },
        'pulse-custom': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1.3)',
            opacity: '1',
          },
        },
        slideDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        slideUp: {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
        "slide-right": 'slide-right 0.1s ease-in-out',
        spinner: 'spinner 0.8s linear infinite',
        marquee: 'marquee var(--duration) linear infinite',
        'marquee-inverted': 'marquee-inverted var(--duration) linear infinite',
        pulse: 'pulse var(--pulse, 1s) ease-in-out alternate infinite',
        slideDown: 'slideDown 300ms ease-out',
        slideUp: 'slideUp 300ms ease-out',
      }
    },
  },
  plugins: [tailwindcssAnimate],
}

