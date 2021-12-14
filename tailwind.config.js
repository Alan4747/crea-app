module.exports = {
  prefix: "",
  purge: {
    enabled: process.env.ENABLE_PURGE === "yes",
    content: ["./src/**/*.{html,ts}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'primary': '#3490dc',
      'secondary': '#ffed4a',
      'danger': '#e3342f',
      'custGray': '#F6F8FA',

    })
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
