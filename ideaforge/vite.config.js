import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './' // 👈 ISSO DAQUI obriga o sistema a achar o Tailwind CSS em qualquer link!
})