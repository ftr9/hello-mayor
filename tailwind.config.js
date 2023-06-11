/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {
      fontFamily: {
        LightUbuntu: ['Ubuntu-Light'],
        RegularUbuntu: ['Ubuntu-Regular'],
        BoldUbuntu: ['Ubuntu-Bold'],
      },
      backgroundColor: {
        bgPrimary: '#E9ECEF',
        bgSecondary: '#DE1738',
        bgTertiary: '#1E1E1E',
      },
      colors: {
        txtPrimary: '#E9ECEF',
        txtSecondary: '#DE1738',
        txtTertiary: '#1E1E1E',
      },
    },
  },
  plugins: [],
};
