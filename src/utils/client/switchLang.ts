import { setCookie } from '@lobechat/utils';
import i18n from 'i18next';

import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import { normalizeLocale } from '@/locales/resources';
import { type LocaleMode } from '@/types/locale';

export const switchLang = async (locale: LocaleMode) => {
  const lang = locale === 'auto' ? navigator.language : locale;
  const normalizedLang = normalizeLocale(lang);

  // Change the language first
  await i18n.changeLanguage(normalizedLang);
  
  // Force reload all namespaces for the new language to ensure translations are loaded
  const namespaces = ['common', 'chat', 'error', 'setting', 'discover', 'plugin', 'agent'];
  await i18n.reloadResources(normalizedLang, namespaces);
  
  document.documentElement.lang = normalizedLang;

  setCookie(LOBE_LOCALE_COOKIE, locale === 'auto' ? undefined : locale, 365);
};
