/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media', // Use system preference
  theme: {
    extend: {
      colors: {
        github: {
          canvas: {
            default: '#0d1117',
            overlay: '#161b22',
            inset: '#010409',
            subtle: '#21262d',
          },
          fg: {
            default: '#e6edf3',
            muted: '#7d8590',
            subtle: '#656d76',
          },
          border: {
            default: '#30363d',
            muted: '#21262d',
          },
          accent: {
            emphasis: '#1f6feb',
            fg: '#58a6ff',
            subtle: '#388bfd26',
          },
          success: {
            emphasis: '#238636',
            fg: '#2ea043',
          },
          danger: {
            emphasis: '#da3633',
          }
        }
      }
    },
  },
  plugins: [],
}
