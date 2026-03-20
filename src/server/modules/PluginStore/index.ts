import urlJoin from 'url-join';

import { DEFAULT_LANG, isLocaleNotSupport } from '@/const/locale';
import { appEnv } from '@/envs/app';
import { type Locales } from '@/locales/resources';
import { normalizeLocale } from '@/locales/resources';

export class PluginStore {
  private readonly baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || appEnv.PLUGINS_INDEX_URL;
  }

  getPluginIndexUrl = (lang: Locales = DEFAULT_LANG) => {
    if (isLocaleNotSupport(lang)) return this.baseUrl;
    return urlJoin(this.baseUrl, `index.${normalizeLocale(lang)}.json`);
  };

  getPluginList = async (locale?: string): Promise<any[]> => {
    // Fallback to LobeHub registry if custom URL fails
    const FALLBACK_URL = 'https://registry.npmmirror.com/@lobehub/plugins-index/v1/files/public';
    
    try {
      let res = await fetch(this.getPluginIndexUrl(locale as Locales), {
        next: {
          revalidate: 3600,
        },
      });
      if (!res.ok) {
        res = await fetch(this.getPluginIndexUrl(DEFAULT_LANG), {
          next: {
            revalidate: 3600,
          },
        });
      }
      
      // Try fallback if primary fails
      if (!res.ok && this.baseUrl !== FALLBACK_URL) {
        console.warn('Primary plugin index failed, trying fallback...');
        const fallbackUrl = urlJoin(FALLBACK_URL, `index.${normalizeLocale(locale as Locales)}.json`);
        res = await fetch(fallbackUrl, { next: { revalidate: 3600 } });
      }
      
      if (!res.ok) return [];
      const json = await res.json();
      return json.plugins ?? [];
    } catch (e) {
      console.error('[getPluginListError] failed to fetch plugin list, error detail:');
      console.error(e);
      return [];
    }
  };
}
