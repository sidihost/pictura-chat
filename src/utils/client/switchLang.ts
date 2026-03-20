import { setCookie } from '@lobechat/utils';
import { changeLanguage } from 'i18next';

import { LOBE_LOCALE_COOKIE } from '@/const/locale';
import { normalizeLocale } from '@/locales/resources';
import { type LocaleMode } from '@/types/locale';

export const switchLang = async (locale: LocaleMode) => {
  const lang = locale === 'auto' ? navigator.language : locale;
  const normalizedLang = normalizeLocale(lang);

  // Change the language - i18next backend will load resources automatically
  await changeLanguage(normalizedLang);
  
  document.documentElement.lang = normalizedLang;

  setCookie(LOBE_LOCALE_COOKIE, locale === 'auto' ? undefined : locale, 365);
};
