/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        based: '#18042A',
        primary: '#10B981',
        primaryDark: '#006C49',
        primaryDarker: '#00422B',
        primaryLight: '#E6F6FC',
        secondary: '#BBCABF',
        secondaryDark: '#515F74',
        secondaryDarkest: '#676767',
        secondaryLight: '#ADADAD',
        secondaryLightest: '#E6E6E6',
        dark: '#131B2E',
        light: '#FDFDFD',
        tertiary: '#00A5E1',
        danger: '#C30003',
        warning: '#F3C443',
        success: '#43A047',
      },
      fontFamily: {
        'inter-regular': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
        sans: ['Inter-Regular'],
      },
    },
  },
  plugins: [],
};
