import type { UserTTSConfig } from '@lobechat/types';

export const DEFAULT_TTS_CONFIG: UserTTSConfig = {
  openAI: {
    sttModel: 'whisper-1',
    ttsModel: 'tts-1',
  },
  elevenlabs: {
    model: 'eleven_multilingual_v2',
    voiceId: 'EXAVITQu4vr4xnSDxMaL', // Sarah - default female voice
  },
  sttAutoStop: true,
  sttServer: 'elevenlabs', // Pictts (ElevenLabs) as default TTS
};
