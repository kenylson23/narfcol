#!/usr/bin/env node

// Build script for static deployment on Netlify
import { build } from 'vite';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Building static files for deployment...');

try {
  // Use the static configuration
  await build({
    configFile: resolve(__dirname, 'vite.config.static.ts'),
    mode: 'production',
    build: {
      outDir: resolve(__dirname, 'dist/public'),
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'client/index.static.html'),
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-slot', '@radix-ui/react-dialog', '@radix-ui/react-select'],
            animation: ['framer-motion'],
            query: ['@tanstack/react-query'],
            icons: ['lucide-react'],
            form: ['react-hook-form', '@hookform/resolvers'],
            utils: ['clsx', 'tailwind-merge', 'class-variance-authority']
          }
        }
      }
    }
  });
  
  // Create favicon files
  const distPublic = resolve(__dirname, 'dist/public');
  if (!existsSync(distPublic)) {
    mkdirSync(distPublic, { recursive: true });
  }
  
  // Create basic favicon files
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100" height="100" fill="#6A5ACD"/>
    <text x="50" y="65" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="white" text-anchor="middle">N</text>
  </svg>`;
  
  // Write favicon files
  writeFileSync(resolve(distPublic, 'favicon.svg'), faviconSvg);
  
  // Copy uploaded images from client/public to dist/public
  const clientPublic = resolve(__dirname, 'client/public');
  const { readdirSync } = await import('fs');
  
  try {
    const publicFiles = readdirSync(clientPublic).filter(file => 
      file !== 'favicon.svg' && (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.gif') || file.endsWith('.webp'))
    );
    
    publicFiles.forEach(file => {
      const sourcePath = resolve(clientPublic, file);
      const destPath = resolve(distPublic, file);
      copyFileSync(sourcePath, destPath);
      console.log(`📸 Copied image: ${file}`);
    });
    
    console.log(`📸 Total images copied: ${publicFiles.length}`);
  } catch (error) {
    console.log('📁 No additional images to copy or error reading public directory');
  }
  
  console.log('✅ Static build completed successfully!');
  console.log('📁 Files generated in: dist/public');
  console.log('🎯 Ready for Netlify deployment!');
  
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}