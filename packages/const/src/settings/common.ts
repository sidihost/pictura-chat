import type { UserGeneralConfig } from '@lobechat/types';

export const DEFAULT_COMMON_SETTINGS: UserGeneralConfig = {
  animationMode: 'agile',
  // contextMenuMode not set default value, use env to calc
  fontSize: 14,
  highlighterTheme: 'pictura-theme',
  isDevMode: false,
  isLiteMode: false,
  mermaidTheme: 'pictura-theme',
  telemetry: true,
  transitionMode: 'fadeIn',
};
