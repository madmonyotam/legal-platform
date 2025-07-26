import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',          // תיקיית build
    sourcemap: true,         // מייצר source maps לניפוי שגיאות בפרוד
    emptyOutDir: true,       // מוחק את dist לפני כל build
    minify: 'esbuild',       // ברירת מחדל – מהיר ויעיל
    target: 'esnext',        // לקוד מודרני – אפשר גם 'es2015' לשוק רחב
    cssCodeSplit: true,      // מפצל CSS לקבצים נפרדים
  }
})
