/**
 * Favicon generation script for Pictura AI
 * Generates all required favicon variants from SVG
 * 
 * Run with: node scripts/generate-favicons.js
 * Requires: sharp (npm install sharp)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Pictura logo SVG with gradient background
const createPicturaLogo = (size, variant = 'default') => {
  // Define colors based on variant
  let bgStart = '#C87941';
  let bgEnd = '#A0522D';
  let overlayColor = '';
  
  switch (variant) {
    case 'done':
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#22C55E"/><path d="M42 48l4 4 8-8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      break;
    case 'error':
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#EF4444"/><path d="M44 44l8 8M52 44l-8 8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      break;
    case 'progress':
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#F59E0B"/><circle cx="48" cy="48" r="8" fill="none" stroke="white" stroke-width="2.5" stroke-dasharray="25 50" stroke-linecap="round"/>';
      break;
    case 'dev':
      bgStart = '#6366F1';
      bgEnd = '#4F46E5';
      break;
    case 'done-dev':
      bgStart = '#6366F1';
      bgEnd = '#4F46E5';
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#22C55E"/><path d="M42 48l4 4 8-8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      break;
    case 'error-dev':
      bgStart = '#6366F1';
      bgEnd = '#4F46E5';
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#EF4444"/><path d="M44 44l8 8M52 44l-8 8" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>';
      break;
    case 'progress-dev':
      bgStart = '#6366F1';
      bgEnd = '#4F46E5';
      overlayColor = '<circle cx="48" cy="48" r="14" fill="#F59E0B"/><circle cx="48" cy="48" r="8" fill="none" stroke="white" stroke-width="2.5" stroke-dasharray="25 50" stroke-linecap="round"/>';
      break;
  }

  return `<svg width="${size}" height="${size}" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="64" y2="64">
      <stop stop-color="${bgStart}"/>
      <stop offset="1" stop-color="${bgEnd}"/>
    </linearGradient>
    <linearGradient id="stroke" x1="22" y1="18" x2="44" y2="46">
      <stop stop-color="#FFFFFF"/>
      <stop offset="1" stop-color="#F5E6D3"/>
    </linearGradient>
    <linearGradient id="accent" x1="41" y1="17" x2="47" y2="23">
      <stop stop-color="#FFD700"/>
      <stop offset="1" stop-color="#FFA500"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="12" fill="url(#bg)"/>
  <path d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" stroke="url(#stroke)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="44" cy="20" r="3" fill="url(#accent)"/>
  ${overlayColor}
</svg>`;
};

const variants = [
  { name: 'favicon', variant: 'default' },
  { name: 'favicon-done', variant: 'done' },
  { name: 'favicon-error', variant: 'error' },
  { name: 'favicon-progress', variant: 'progress' },
  { name: 'favicon-dev', variant: 'dev' },
  { name: 'favicon-done-dev', variant: 'done-dev' },
  { name: 'favicon-error-dev', variant: 'error-dev' },
  { name: 'favicon-progress-dev', variant: 'progress-dev' },
];

const publicDir = path.join(__dirname, '..', 'public');

async function generateFavicons() {
  console.log('Generating Pictura AI favicons...');
  
  for (const { name, variant } of variants) {
    // Generate 32x32 version
    const svg32 = createPicturaLogo(32, variant);
    const png32 = await sharp(Buffer.from(svg32))
      .resize(32, 32)
      .png()
      .toBuffer();
    
    // Generate 64x64 version for better quality
    const svg64 = createPicturaLogo(64, variant);
    const png64 = await sharp(Buffer.from(svg64))
      .resize(64, 64)
      .png()
      .toBuffer();
    
    // Save 32x32 ICO
    const ico32Path = path.join(publicDir, `${name}-32x32.ico`);
    await sharp(png32).toFile(ico32Path.replace('.ico', '.png'));
    console.log(`Generated: ${name}-32x32.png`);
    
    // Save main ICO (64x64)
    const icoPath = path.join(publicDir, `${name}.ico`);
    await sharp(png64).toFile(icoPath.replace('.ico', '.png'));
    console.log(`Generated: ${name}.png`);
  }
  
  console.log('\nFavicon generation complete!');
  console.log('Note: PNG files were generated. Convert to ICO format manually if needed.');
}

generateFavicons().catch(console.error);
