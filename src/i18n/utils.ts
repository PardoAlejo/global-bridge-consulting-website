import en from './en.json';
import es from './es.json';

const translations = { en, es } as const;

export type Lang = keyof typeof translations;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in translations) return lang as Lang;
  return 'en';
}

export function useTranslations(lang: Lang) {
  return translations[lang];
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

export function getLocalizedPath(lang: Lang, hash?: string): string {
  const base = `/${lang}/`;
  return hash ? `${base}#${hash}` : base;
}
