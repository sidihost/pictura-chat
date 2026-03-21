import { ModelProvider } from 'model-bank';

import {
  createAnthropicCompatibleParams,
  createAnthropicCompatibleRuntime,
} from '../../core/anthropicCompatibleFactory';

const anthropicProxyUrl = process.env.ANTHROPIC_PROXY_URL;
// Disable beta headers when using a proxy that doesn't support them
const disableBetaHeaders = !!anthropicProxyUrl;

export const params = createAnthropicCompatibleParams({
  debug: {
    chatCompletion: () => process.env.DEBUG_ANTHROPIC_CHAT_COMPLETION === '1',
  },
  // Disable beta headers when using a proxy that doesn't support them
  disableBetaHeaders,
  provider: ModelProvider.Anthropic,
});

export const LobeAnthropicAI = createAnthropicCompatibleRuntime(params);

export default LobeAnthropicAI;
