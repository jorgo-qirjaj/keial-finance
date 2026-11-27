import { Language } from '../types';

/** Albanian practice: "." for thousands (80.000). English: "," (80,000). */
export const numberLocale = (language: Language) => (language === 'sq' ? 'de-DE' : 'en-US');

export const formatLek = (n: number, language: Language) => Math.round(n).toLocaleString(numberLocale(language));
