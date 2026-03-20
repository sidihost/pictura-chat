import type { ModelProviderCard } from '@/types/llm';

// Pictura AI - powered by Mistral models
// ref: https://docs.mistral.ai/getting-started/models/
// ref: https://docs.mistral.ai/capabilities/function_calling/
const Pictura: ModelProviderCard = {
  chatModels: [],
  checkModel: 'mistral-medium-latest',
  description:
    'Pictura AI offers advanced general, specialized, and research models for complex reasoning, multilingual tasks, and code generation, with function-calling for custom integrations.',
  id: 'mistral',
  modelList: { showModelFetcher: true },
  modelsUrl: 'https://picturaai.sbs',
  name: 'Pictura',
  settings: {
    disableBrowserRequest: true, // CORS Error
    proxyUrl: {
      placeholder: 'https://api.mistral.ai',
    },
    sdkType: 'openai',
    showModelFetcher: true,
  },
  url: 'https://picturaai.sbs',
};

export default Pictura;
