// Modules
import { Suspense } from 'react';

// Lib
import { readOnePage, readSlugs } from '@/lib/server/page';

// Components
import ControlBar from '@/components/molecules/ControlBar';
import QuestionForm from '@/components/organisms/QuestionForm';
import TimeOverModal from '@/components/molecules/TimeOverModal';

// Constants
import { TYPES as BLOCK_TYPES } from '@/constants/block';

// Helpers
import { hasInteractiveBlocks } from '@/helpers/hasInteractiveBlocks';

export async function generateStaticParams({ params: { locale } }: { params: { locale: string } }) {
  const slugs = await readSlugs(locale);
  const params = slugs.map((slug) => ({ slug }));

  return params;
}

export async function generateMetadata({
  params: { locale, slug },
}: {
  params: { locale: string, slug: string }
}) {
  const page = await readOnePage(locale, slug);
  const { formData } = page;

  const header = formData.find((block) => block.type === BLOCK_TYPES.HEADER);
  const title = header?.label ?? slug;

  return {
    title,
  };
}

export default async function Page({ params }: { params: { locale: string, slug: string } }) {
  const { locale, slug } = params;
  const page = await readOnePage(locale, slug);
  const { formData } = page;
  const interactive = hasInteractiveBlocks(formData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <section>
        <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 lg:px-12">
          <div className="text-center">
            <Suspense><ControlBar silent /></Suspense>
          </div>
          <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <QuestionForm formData={formData} interactive={interactive} />
            <TimeOverModal />
          </article>
        </div>
      </section>
    </main>
  );
}
