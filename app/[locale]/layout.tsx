// Modules
import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// Components
import HeadScript from '@/components/atoms/HeadScript';
import Toaster from '@/components/organisms/Toaster';

// Lib
import { getLocales } from '@/lib/server/getLocales';

// Providers
import { ConnectionProvider } from '@/providers/ConnectionProvider';

// Types
import type { Metadata, Viewport } from 'next';
import Connection from '@/components/atoms/Connection';

export async function generateMetadata(
  props: Readonly<{
    params: { locale: string }
  }>
): Promise<Metadata> {
  const params = props.params;

  const {
    locale
  } = params;

  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    applicationName: t('applicationName'),
    title: {
      default: t('title.default'),
      template: t('title.template'),
    },
    description: t('description'),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('title.default'),
      // startUpImage: [],
    },
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: t('applicationName'),
      title: {
        default: t('title.default'),
        template: t('title.template'),
      },
      description: t('description'),
    },
    twitter: {
      card: 'summary',
      title: {
        default: t('title.default'),
        template: t('title.template'),
      },
      description: t('description'),
    },
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: t('keywords'),
    creator: t('creator'),
    publisher: t('publisher'),
  };
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export async function generateStaticParams() {
  const locales = await getLocales();

  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout(
  props: Readonly<{
    children: React.ReactNode;
    params: { locale: string }
  }>
) {
  const params = props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  unstable_setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <div className="bg-white dark:bg-gray-900">
      <HeadScript locale={locale} />
      <Toaster />
      <Suspense><Connection /></Suspense>
      <NextIntlClientProvider messages={messages}>
        <ConnectionProvider>
          {children}
        </ConnectionProvider>
      </NextIntlClientProvider>
    </div>
  );
}
