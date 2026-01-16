// Modern E-commerce Theme
export const theme = {
  // Colors
  colors: {
    primary: '#ec4899', // pink-500
    primaryDark: '#be185d', // pink-700
    primaryLight: '#f472b6', // pink-300
    bg: {
      dark: '#0f0f10',
      darker: '#000000',
      section: '#1a1a1f',
      input: '#27272a',
    },
    text: {
      white: '#ffffff',
      light: '#f1f5f9',
      muted: '#94a3b8',
      secondary: '#cbd5e1',
    },
    border: '#404854',
    success: '#10b981',
    danger: '#ef4444',
  },

  // Gradients
  gradients: {
    bg: 'bg-gradient-to-br from-gray-900 via-gray-800 to-black',
    button: 'bg-gradient-to-r from-pink-500 to-pink-600',
    buttonHover: 'hover:from-pink-600 hover:to-pink-700',
  },

  // Common Classes
  container: 'max-w-7xl mx-auto px-4 py-8',
  section: 'min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black',
  card: 'bg-gray-800 border border-gray-700 rounded-lg p-6 transition-all duration-200 hover:border-pink-500 hover:shadow-lg hover:shadow-pink-500/10',
  input: 'w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-200',
  button: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-105',
  buttonSmall: 'bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105',
  heading1: 'text-4xl md:text-5xl font-bold text-white',
  heading2: 'text-3xl md:text-4xl font-bold text-white',
  heading3: 'text-2xl font-bold text-white',
  text: 'text-gray-400',
  label: 'block text-sm font-semibold text-white',
};

export default theme;
