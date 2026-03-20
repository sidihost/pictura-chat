/**
 * Utility to map Mistral model IDs to Pictura display names
 * This ensures users see "Pictura 4.0" instead of "mistral-medium-latest" in the UI
 */

// Map of Mistral model IDs to Pictura display names
const MODEL_DISPLAY_NAMES: Record<string, string> = {
  // Main Pictura models
  'mistral-medium-latest': 'Pictura 4.0',
  'mistral-medium': 'Pictura 4.0',
  'mistral-small-latest': 'Pictura 5.0 Lite',
  'mistral-small': 'Pictura 5.0 Lite',
  'mistral-large-latest': 'Pictura 5.0 Pro',
  'mistral-large': 'Pictura 5.0 Pro',
  
  // Vision models
  'pixtral-large-latest': 'Pictura 5.0 Vision',
  'pixtral-large': 'Pictura 5.0 Vision',
  'pixtral-12b-2409': 'Pictura 5.0 Mini',
  'pixtral-12b': 'Pictura 5.0 Mini',
  
  // Reasoning models
  'magistral-medium-latest': 'Pictura 4.5 Pro',
  'magistral-medium': 'Pictura 4.5 Pro',
  'magistral-small-2509': 'Pictura 4.5 Lite',
  'magistral-small': 'Pictura 4.5 Lite',
  
  // Keep some models with original names
  'devstral-2512': 'Devstral 2',
  'labs-devstral-small-2512': 'Devstral Small 2',
  'open-mistral-nemo': 'Mistral Nemo',
  'codestral-latest': 'Codestral 2508',
  'ministral-3b-latest': 'Ministral 3B',
  'ministral-8b-latest': 'Ministral 8B',
  'open-codestral-mamba': 'Codestral Mamba',
};

/**
 * Get the Pictura display name for a model ID
 * @param modelId - The raw model ID (e.g., "mistral-medium-latest")
 * @returns The display name (e.g., "Pictura 4.0") or the original ID if no mapping exists
 */
export function getPicturaModelName(modelId: string | undefined | null): string {
  if (!modelId) return '';
  
  // Check for direct match
  if (MODEL_DISPLAY_NAMES[modelId]) {
    return MODEL_DISPLAY_NAMES[modelId];
  }
  
  // Handle provider prefixes like "openai/mistral-small-latest" or "anthropic/mistral-medium-latest"
  const modelIdWithoutProvider = modelId.includes('/') ? modelId.split('/').pop()! : modelId;
  
  if (MODEL_DISPLAY_NAMES[modelIdWithoutProvider]) {
    return MODEL_DISPLAY_NAMES[modelIdWithoutProvider];
  }
  
  // Handle versioned model IDs (e.g., "mistral-medium-2501")
  for (const [key, displayName] of Object.entries(MODEL_DISPLAY_NAMES)) {
    // Match base model name patterns
    if (modelIdWithoutProvider.startsWith(key.replace('-latest', ''))) {
      return displayName;
    }
  }
  
  // Return original ID if no mapping found
  return modelId;
}

/**
 * Check if a model ID is a Pictura/Mistral model
 */
export function isPicturaModel(modelId: string | undefined | null): boolean {
  if (!modelId) return false;
  
  const modelIdLower = modelId.toLowerCase();
  const modelIdWithoutProvider = modelIdLower.includes('/') ? modelIdLower.split('/').pop()! : modelIdLower;
  
  return (
    modelIdWithoutProvider.includes('mistral') ||
    modelIdWithoutProvider.includes('pixtral') ||
    modelIdWithoutProvider.includes('magistral') ||
    modelIdWithoutProvider.includes('codestral') ||
    modelIdWithoutProvider.includes('devstral') ||
    modelIdWithoutProvider.includes('ministral')
  );
}
