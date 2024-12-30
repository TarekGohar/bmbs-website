import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'fr',
  localePrefix: {
    mode: 'always',
    prefixes: {
      'en': '/en',
      'fr': '/fr'
    }
  },
  pathnames: {
    '/': '/',
    // '/organization': {
    //   'en-US': '/organization',
    //   'en-GB': '/organisation'
    // }
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);