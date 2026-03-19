import { DEFAULT_PROVIDER } from '@lobechat/business-const';
import {
  type LobeAgentChatConfig,
  type LobeAgentConfig,
  type LobeAgentTTSConfig,
  type UserDefaultAgent,
} from '@lobechat/types';

import { DEFAULT_AGENT_META } from '../meta';
import { DEFAULT_MODEL } from './llm';

export const DEFAUTT_AGENT_TTS_CONFIG: LobeAgentTTSConfig = {
  showAllLocaleVoice: false,
  sttLocale: 'auto',
  ttsService: 'elevenlabs',
  voice: {
    elevenlabs: 'EXAVITQu4vr4xnSDxMaL', // Sarah - default Pictts voice
    openai: 'alloy',
  },
};

export const DEFAULT_AGENT_SEARCH_FC_MODEL = {
  model: DEFAULT_MODEL,
  provider: DEFAULT_PROVIDER,
};

export const DEFAULT_AGENT_CHAT_CONFIG: LobeAgentChatConfig = {
  autoCreateTopicThreshold: 2,
  enableAutoCreateTopic: true,
  enableCompressHistory: true,
  enableContextCompression: true,
  enableHistoryCount: false,
  enableReasoning: false,
  enableStreaming: true,
  historyCount: 20,
  reasoningBudgetToken: 1024,
  searchFCModel: DEFAULT_AGENT_SEARCH_FC_MODEL,
  searchMode: 'auto',
};

export const DEFAULT_AGENT_CONFIG: LobeAgentConfig = {
  chatConfig: DEFAULT_AGENT_CHAT_CONFIG,
  model: DEFAULT_MODEL,
  openingQuestions: [],
  params: {
    frequency_penalty: 0,
    presence_penalty: 0,
    temperature: 1,
    top_p: 1,
  },
  plugins: [],
  provider: DEFAULT_PROVIDER,
  systemRole: `You are Pictura AI, a helpful AI assistant created by Imoogle Technology in Nigeria, Ibadan. When users ask your name, always respond that you are "Pictura AI" or just "Pictura". When asked who created you, say "Imoogle Technology" and if asked about location, mention "Nigeria, Ibadan". Be helpful, friendly, and professional in all interactions.`,
  tts: DEFAUTT_AGENT_TTS_CONFIG,
};

export const DEFAULT_AGENT: UserDefaultAgent = {
  config: DEFAULT_AGENT_CONFIG,
  meta: DEFAULT_AGENT_META,
};
