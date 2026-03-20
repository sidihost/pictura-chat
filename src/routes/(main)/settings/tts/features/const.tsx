import { OpenAI } from '@lobehub/icons';
import { type SelectProps } from '@lobehub/ui';

import { LabelRenderer } from '@/components/ModelSelect';

// Pictts Icon component - using Pictura logo with gradient background
const PicttsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 5 }}>
    <rect width="64" height="64" rx="16" fill="url(#pictts-bg)"/>
    <path d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" stroke="url(#pictts-stroke)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="44" cy="20" r="3" fill="url(#pictts-accent)"/>
    <defs>
      <linearGradient id="pictts-bg" x1="0" y1="0" x2="64" y2="64">
        <stop stopColor="#C87941"/>
        <stop offset="1" stopColor="#A0522D"/>
      </linearGradient>
      <linearGradient id="pictts-stroke" x1="22" y1="18" x2="44" y2="46">
        <stop stopColor="#FFFFFF"/>
        <stop offset="1" stopColor="#F5E6D3"/>
      </linearGradient>
      <linearGradient id="pictts-accent" x1="41" y1="17" x2="47" y2="23">
        <stop stopColor="#FFD700"/>
        <stop offset="1" stopColor="#FFA500"/>
      </linearGradient>
    </defs>
  </svg>
);

export const opeanaiTTSOptions: SelectProps['options'] = [
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'gpt-4o-mini-tts'} />,
    value: 'gpt-4o-mini-tts',
  },
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'tts-1'} />,
    value: 'tts-1',
  },
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'tts-1-hd'} />,
    value: 'tts-1-hd',
  },
];

export const opeanaiSTTOptions: SelectProps['options'] = [
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'whisper-1'} />,
    value: 'whisper-1',
  },
];

// Pictts TTS model options
export const picttsTTSOptions: SelectProps['options'] = [
  {
    label: <LabelRenderer Icon={() => <PicttsIcon />} label={'eleven_multilingual_v2'} />,
    value: 'eleven_multilingual_v2',
  },
  {
    label: <LabelRenderer Icon={() => <PicttsIcon />} label={'eleven_turbo_v2_5'} />,
    value: 'eleven_turbo_v2_5',
  },
  {
    label: <LabelRenderer Icon={() => <PicttsIcon />} label={'eleven_flash_v2_5'} />,
    value: 'eleven_flash_v2_5',
  },
];

export const sttOptions: SelectProps['options'] = [
  {
    label: <LabelRenderer Icon={() => <PicttsIcon />} label={'Pictts (Recommended)'} />,
    value: 'elevenlabs',
  },
  {
    label: <LabelRenderer Icon={OpenAI.Avatar} label={'OpenAI'} />,
    value: 'openai',
  },
  {
    label: 'Browser',
    value: 'browser',
  },
];
