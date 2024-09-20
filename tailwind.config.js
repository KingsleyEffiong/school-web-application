/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scaleUpCenter: {
          '0%': {
            transform: 'scaleX(0.4)'
          },
          '100%': { 
            transform: 'scaleX(1)'
          },  
        },
        drop: {
          '0%': { transform: 'translateY(-100px)', opacity: 1 },
          '100%': { transform: 'translateY(0px)', opacity: 1 },
        },
        top: {
          '0%': { transform: 'translateY(0px)', opacity: 1 },
          '100%': { transform: 'translateY(-100px)', opacity: 1 },
        },
        textAnimate: {
          '0%': {
            letterSpacing: '1.5em',
            transform: 'translateZ(400)',
            opacity: 0,
          },
          '40%': {
            opacity: 0.6,
          },
          '100%': {
            transform: 'translateZ(0)',
            opacity: 1,
          },
      },

      animateLeft:{
        '0%': {
          transform: 'translateX(-100px)',
        },
        '100%':{
          transform: 'translateX(0)',
        }
      },
      animateShowChat:{
        '0%': {
          transform: 'translateX(100px)',
          opacity: 0,
        },
        '100%':{
          transform: 'translateX(0)',
          opacity: 1,
        }
      },
      animateRemoveChat:{
        '0%': {
          transform: 'translateX(0)',
          opacity: 1,
        },
        '100%':{
          transform: 'translateX(1000)',
          opacity: 0,
        }
      }
      },
      animation: {
        scaleUpCenter: 'scaleUpCenter 0.4s ease-in-out',
        drop: 'drop 0.4s ease-in-out ',
        top: 'top 0.4s ease-in-out ',
        animateLeft: 'animateLeft 0.4s ease-in-out ',
        animateShowChat: 'animateShowChat 2s ease-in-out ',
        animateRemoveChat: 'animateRemoveChat 2s ease-in-out ',
        textAnimate: 'textAnimate 1s ease-in-out ',
      },
    },
  },
  plugins: [],
}
