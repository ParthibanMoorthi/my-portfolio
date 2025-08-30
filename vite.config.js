import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'         // add this
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/my-portfolio/',                        // <-- add this line (replace with your repo name)
  plugins: [
    react(),                                    // add react plugin
    tailwindcss(),
  ],
})
