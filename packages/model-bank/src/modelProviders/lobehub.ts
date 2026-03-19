import type { ModelProviderCard } from '@/types/llm';

const LobeHub: ModelProviderCard = {
  chatModels: [],
  description:
    'Pictura Cloud uses official APIs to access AI models and measures usage with Credits tied to model tokens.',
  enabled: true,
  id: 'lobehub',
  modelsUrl: 'https://picturaai.sbs',
  name: 'Pictura',
  settings: {
    modelEditable: false,
    showAddNewModel: false,
    showModelFetcher: false,
  },
  showConfig: false,
  url: 'https://picturaai.sbs',
};

export default LobeHub;

export const planCardModels = [
  'claude-sonnet-4-6',
  'gemini-3.1-pro-preview',
  'gpt-5.4',
  'deepseek-chat',
];
