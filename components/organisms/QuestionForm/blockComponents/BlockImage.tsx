// Modules
import Image from 'next/image';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Hooks
import { useParams } from 'next/navigation';

export type Props = {
  block: Blocks.Image;
};

const config = getQuizConfig();

export default function BlockImage(props: Props) {
  const { block } = props;
  const caption = block.label ?? '';

  const { locale, slug } = useParams<{ locale: string, slug: string }>();

  const url = `${config.basePath}/images/${locale}/${slug}/${block.src}`;

  return (
    <figure className="flex flex-wrap justify-center">
      <Image
        alt={caption}
        className="h-auto max-w-md object-contain rounded"
        height={0}
        priority
        sizes="100vw"
        src={url}
        style={{ width: '100%', height: 'auto' }}
        width={0}
      />
      <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400 w-full">
        {caption}
      </figcaption>
    </figure>
  );
}
