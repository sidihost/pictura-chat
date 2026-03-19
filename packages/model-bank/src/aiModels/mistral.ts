import type { AIChatModelCard } from '../types/aiModel';

// https://docs.mistral.ai/getting-started/models/models_overview/
// https://mistral.ai/pricing#api-pricing

const mistralChatModels: AIChatModelCard[] = [
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 262_144,
    description:
      'Devstral 2 is an enterprise-level text model that excels at using tools to explore codebases, edit multiple files, and power software engineering agents.',
    displayName: 'Devstral 2',
    id: 'devstral-2512',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.4, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 2, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    releasedAt: '2025-12-09',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 262_144,
    description: 'Devstral Small 2 excels at using tools to explore code bases, edit multiple files, and power software engineering agents.',
    displayName: 'Devstral Small 2',
    id: 'labs-devstral-small-2512',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.1, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.3, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    releasedAt: '2025-12-09',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 4.0 delivers state-of-the-art performance at 8× lower cost and simplifies enterprise deployment.',
    displayName: 'Pictura 4.0',
    enabled: true,
    id: 'mistral-medium-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.4, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 2, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      reasoning: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 4.5 Pro is a frontier reasoning model with vision support for complex tasks.',
    displayName: 'Pictura 4.5 Pro',
    enabled: true,
    id: 'magistral-medium-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 2, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 5, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      reasoning: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 4.5 Lite is an efficient reasoning model with vision support.',
    displayName: 'Pictura 4.5 Lite',
    id: 'magistral-small-2509',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.5, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 1.5, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Mistral Nemo is a 12B model co-developed with Nvidia, offering strong reasoning and coding performance with easy integration.',
    displayName: 'Mistral Nemo',
    id: 'open-mistral-nemo',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.15, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.15, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 5.0 Lite is a cost-effective, fast, and reliable option for translation, summarization, and sentiment analysis.',
    displayName: 'Pictura 5.0 Lite',
    id: 'mistral-small-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.1, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.3, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 5.0 Pro is a flagship model, strong in multilingual tasks, complex reasoning, and code generation—ideal for high-end applications.',
    displayName: 'Pictura 5.0 Pro',
    id: 'mistral-large-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 2, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 6, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 256_000,
    description:
      'Codestral is our most advanced coding model; v2 (Jan 2025) targets low-latency, high-frequency tasks like FIM, code correction, and test generation.',
    displayName: 'Codestral 2508',
    id: 'codestral-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.3, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.9, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    releasedAt: '2025-07-30',
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 5.0 Vision is our flagship multimodal model with frontier-level image understanding and document processing capabilities.',
    displayName: 'Pictura 5.0 Vision',
    enabled: true,
    id: 'pixtral-large-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 2, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 6, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      vision: true,
    },
    contextWindowTokens: 131_072,
    description:
      'Pictura 5.0 Mini is optimized for chart/image understanding, document QA, multimodal reasoning, and instruction following with a 128K context window.',
    displayName: 'Pictura 5.0 Mini',
    id: 'pixtral-12b-2409',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.15, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.15, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description: 'Ministral 3B is Mistral’s top-tier edge model.',
    displayName: 'Ministral 3B',
    id: 'ministral-3b-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.04, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.04, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
    },
    contextWindowTokens: 131_072,
    description: 'Ministral 8B is a highly cost-effective edge model from Mistral.',
    displayName: 'Ministral 8B',
    id: 'ministral-8b-latest',
    pricing: {
      units: [
        { name: 'textInput', rate: 0.1, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0.1, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
  {
    contextWindowTokens: 256_000,
    description:
      'Codestral Mamba is a Mamba 2 language model focused on code generation, supporting advanced coding and reasoning tasks.',
    displayName: 'Codestral Mamba',
    id: 'open-codestral-mamba',
    pricing: {
      units: [
        { name: 'textInput', rate: 0, strategy: 'fixed', unit: 'millionTokens' },
        { name: 'textOutput', rate: 0, strategy: 'fixed', unit: 'millionTokens' },
      ],
    },
    type: 'chat',
  },
];

export const allModels = [...mistralChatModels];

export default allModels;
