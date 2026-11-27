import { Language } from '../types';
import { SITE_URL } from '../config';

/**
 * Per-language page metadata. Used by the app when the language changes in the browser,
 * and by scripts/prerender.mjs when it writes the static HTML for / and /en/.
 */
export const SEO: Record<Language, { path: string; title: string; description: string; locale: string }> = {
  sq: {
    path: '/',
    title: 'KEI-AL Auditing | Auditim, Kontabilitet dhe Tatime në Vlorë',
    description:
      'Firmë auditimi e licencuar në Vlorë që nga 2013: auditim ligjor, kontabilitet, tatime, paga dhe këshillim biznesi për shoqëri në të gjithë Shqipërinë.',
    locale: 'sq_AL',
  },
  en: {
    path: '/en/',
    title: 'KEI-AL Auditing | Audit, Accounting and Tax in Vlorë, Albania',
    description:
      'Licensed audit firm in Vlorë since 2013: statutory audit, accounting, tax, payroll and business advisory for companies across Albania.',
    locale: 'en_US',
  },
};

export const canonicalUrl = (lang: Language) => `${SITE_URL}${SEO[lang].path}`;

/** /en/ (or the legacy ?lang=en) opens English; everything else is Albanian. */
export function languageFromLocation(loc: { pathname: string; search: string }): Language {
  if (/^\/en(\/|$)/.test(loc.pathname)) return 'en';
  return new URLSearchParams(loc.search).get('lang') === 'en' ? 'en' : 'sq';
}
