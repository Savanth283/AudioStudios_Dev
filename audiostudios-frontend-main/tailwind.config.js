/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./node_modules/flowbite/**/*.js",

      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: { 
      colors: {
          'transparent': 'transparent',
          '_green': '#0F9855',
          '_teal': '#30CEC0',
          '_blue': '#2874F0',
          '_dark': '#212129',
          '_dark-deep': '#1B1B24',
          '_pink': '#FF5869',
          '_purple': '#DC2751',
          '_yellow': '#FFAF40',
          '_gray': '#808080',
          '_gray-light': '#F5F5F5',
          'border-color': '#D9D9D9',
          'white': '#FFFFFF',
      },
      fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
      },
      extend: {},
  },
  plugins: [
      require('flowbite/plugin')
  ],
}

