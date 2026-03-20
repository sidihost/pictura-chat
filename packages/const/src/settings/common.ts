import type { UserGeneralConfig } from '@lobechat/types';

export const DEFAULT_COMMON_SETTINGS: UserGeneralConfig = {
  animationMode: 'agile',
  // contextMenuMode not set default value, use env to calc
  fontSize: 14,
  highlighterTheme: 'lobe-theme', // Shows as "Pictura Theme" in dropdown
  isDevMode: false,
  isLiteMode: false,
  mermaidTheme: 'lobe-theme', // Shows as "Pictura Theme" in dropdown
  telemetry: true,
  transitionMode: 'fadeIn',
};
