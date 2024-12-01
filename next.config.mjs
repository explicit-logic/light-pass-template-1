import path from 'node:path';
import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

// import quizConfig from './data/quiz.json' with { type: 'json' };
import { getQuizConfig } from './lib/server/getQuizConfig.mjs';

const quizConfig = getQuizConfig();

const withNextIntl = createNextIntlPlugin();

const withSerwist = withSerwistInit({
  // Note: This is only an example. If you use Pages Router,
  // use something else that works, such as "service-worker/index.ts".
  swSrc: 'app/sw.ts',
  swDest: 'public/sw.js',
  reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  serverRuntimeConfig: {
    dataDirectory: path.join(process.cwd(), './data'),
  },
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: 'export',
  /**
   * Set base path. This is the slug of your GitHub repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  basePath: quizConfig.basePath,
  /**
   * Disable server-based image optimization. Next.js does not support
   * dynamic features with static exports.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
};

export default withSerwist(withNextIntl(nextConfig));
