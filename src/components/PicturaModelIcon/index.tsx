'use client';

import { ModelIcon as LobeModelIcon } from '@lobehub/icons';
import { memo } from 'react';

// List of Mistral model IDs that should show Pictura icon
const PICTURA_MODEL_IDS = [
  'mistral-medium-latest',
  'mistral-small-latest', 
  'mistral-large-latest',
  'magistral-medium-latest',
  'magistral-small-2509',
  'pixtral-large-latest',
  'pixtral-12b-2409',
  'open-mistral-nemo',
  'ministral-3b-latest',
  'ministral-8b-latest',
  'codestral-latest',
  'devstral-2512',
  'labs-devstral-small-2512',
  'open-codestral-mamba',
];

// Check if model ID contains mistral/pixtral/magistral/codestral/devstral/ministral
const isPicturaModel = (modelId: string): boolean => {
  const lowerModelId = modelId.toLowerCase();
  return (
    PICTURA_MODEL_IDS.includes(modelId) ||
    lowerModelId.includes('mistral') ||
    lowerModelId.includes('pixtral') ||
    lowerModelId.includes('magistral') ||
    lowerModelId.includes('codestral') ||
    lowerModelId.includes('devstral') ||
    lowerModelId.includes('ministral')
  );
};

// Pictura icon SVG component
const PicturaIcon = memo<{ size?: number }>(({ size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ flexShrink: 0 }}
  >
    <path 
      d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" 
      stroke="#C87941" 
      strokeWidth="4.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
    <circle cx="44" cy="20" r="3" fill="#FFD700"/>
  </svg>
));

PicturaIcon.displayName = 'PicturaIcon';

interface PicturaModelIconProps {
  model?: string;
  size?: number;
  type?: 'avatar' | 'mono' | 'color' | 'combine';
}

/**
 * Custom ModelIcon that shows Pictura icon for Mistral-based models
 * and falls back to the default @lobehub/icons ModelIcon for others
 */
const PicturaModelIcon = memo<PicturaModelIconProps>(({ model, size = 20, type }) => {
  if (model && isPicturaModel(model)) {
    return <PicturaIcon size={size} />;
  }
  
  return <LobeModelIcon model={model} size={size} type={type} />;
});

PicturaModelIcon.displayName = 'PicturaModelIcon';

export { PicturaModelIcon, PicturaIcon, isPicturaModel };
export default PicturaModelIcon;
