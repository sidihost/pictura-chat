import type { UserTTSConfig } from '@lobechat/types';

export const DEFAULT_TTS_CONFIG: UserTTSConfig = {
  openAI: {
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
  },
  elevenlabs: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - default female voice
  },
  sttAutoStop: true,
  sttServer: 'openai',
};
