import { useMemo } from 'react';

import { type EnabledProviderWithModels } from '@/types/aiProvider';
import { getPicturaModelName } from '@/utils/picturaModelName';

export const useCurrentModelName = (
  enabledList: EnabledProviderWithModels[],
  model: string,
): string => {
  return useMemo(() => {
    for (const providerItem of enabledList) {
      const modelItem = providerItem.children.find((m) => m.id === model);
      if (modelItem) {
        return modelItem.displayName || getPicturaModelName(modelItem.id) || modelItem.id;
      }
    }
    // Fallback to Pictura name mapping if model not found in enabled list
    return getPicturaModelName(model) || model;
  }, [enabledList, model]);
};
