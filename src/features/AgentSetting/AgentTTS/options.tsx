import { Azure, OpenAI } from '@lobehub/icons';
import { type SelectProps } from '@lobehub/ui';
import { Volume2 } from 'lucide-react';

import { LabelRenderer } from '@/components/ModelSelect';

// Pictts Icon component
const PicttsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="16" fill="#C87941"/>
    <path d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" stroke="#FAF8F5" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

export const ttsOptions: SelectProps['options'] = [
  {
    label: <LabelRenderer Icon={() => <PicttsIcon />} label={'Pictts (Recommended)'} />,
    value: 'elevenlabs',
  },
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'OpenAI'} />,
    value: 'openai',
  },
  {
    label: <LabelRenderer Icon={Azure.Avatar} label={'Edge Speech'} />,
    value: 'edge',
  },
  {
    label: <LabelRenderer Icon={Azure.Avatar} label={'Microsoft Speech'} />,
    value: 'microsoft',
  },
];
