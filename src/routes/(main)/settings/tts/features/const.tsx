import { OpenAI } from '@lobehub/icons';
import { type SelectProps } from '@lobehub/ui';

import { LabelRenderer } from '@/components/ModelSelect';

// Pictts Icon component - using Pictura logo
const PicttsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 46V18h10c3.5 0 6.3 1.2 8.4 3.5 2.1 2.3 3.1 5.2 3.1 8.5s-1 6.2-3.1 8.5C38.3 40.8 35.5 42 32 42h-4" stroke="#C87941" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <circle cx="44" cy="20" r="3" fill="#FFD700"/>
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
