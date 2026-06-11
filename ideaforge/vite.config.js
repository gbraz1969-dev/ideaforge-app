import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './' // 👈 ISSO DAQUI garante que os estilos carreguem em QUALQUER lugar ou link da Vercel!
})