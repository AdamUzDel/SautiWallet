/* export const locales = ["en", "lg", "sw"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale = "en" as const */

import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "lg", "sw"],
 
  // Used when no locale matches
  defaultLocale: 'en'
});