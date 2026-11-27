/**
 * Site-wide contact details. Change them here and every component picks them up.
 *
 * CONTACT_EMAIL is the firm's only mailbox. (kei.al itself has a "null MX"
 * DNS record and cannot receive mail.)
 */
export const SITE_URL = 'https://kei.al';
export const CONTACT_EMAIL = 'keial.auditing@gmail.com';
export const WHATSAPP_URL = 'https://wa.me/355682095535';
export const PHONE_MOBILE = '+355 68 209 5535';
export const PHONE_OFFICE = '+355 33 409 839';
export const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Lagjja+29+N%C3%ABntori%2C+Vlor%C3%AB%2C+Albania';
export const NIPT = 'L37023201C';

/** WhatsApp chat link, optionally with a pre-filled message. */
export function waLink(text?: string) {
  return text ? `${WHATSAPP_URL}?text=${encodeURIComponent(text)}` : WHATSAPP_URL;
}

/** Office hours in Albania's time zone: Monday to Friday, 09:00 to 17:00. */
export function isOfficeOpen(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Tirane', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const day = get('weekday');
  const minutes = Number(get('hour')) * 60 + Number(get('minute'));
  return !['Sat', 'Sun'].includes(day) && minutes >= 9 * 60 && minutes < 17 * 60;
}
