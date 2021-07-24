module.exports = {
  purge: [
    "./src/components/*.tsx",
    "./src/components/*.js",
    "./src/components/**/*.tsx",
    "./src/components/**/*.js",
    "./src/pages/*.tsx",
    "./src/pages/*.js",
    "./src/pages/**/*.tsx",
    "./src/pages/**/*.js"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
