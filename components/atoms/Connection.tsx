'use client';

// Config
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Modules
import { useEffect } from 'react';

// Store
import { getReceiver, /*getSender,*/ getReceiverId, setReceiverId } from '@/lib/client/peer/store';

// Hooks
import { useParams, usePathname, useSearchParams } from 'next/navigation';

let lastPathname: string;

const config = getQuizConfig();

function Connection() {
  const searchParams = useSearchParams();
  const r = searchParams.get('r');
  const { locale } = useParams<{ locale: string }>();
  const pathname = usePathname();

  useEffect(() => {
    if (lastPathname && lastPathname === pathname) return;
    lastPathname = pathname;

    const cachedReceiver = getReceiver();
    const cachedReceiverId = getReceiverId();
    const receiverId = r ?? cachedReceiverId;

    if (cachedReceiver || !receiverId || !locale) return;
    setReceiverId(receiverId);

    const establishConnection = async () => {
      const { connect } = await import('../../lib/client/peer/connect');

      await connect({ language: locale, pathname, quizId: config.quizId, receiverId });
    };
    if (typeof navigator !== 'undefined') {
      void establishConnection();
    }
  }, [locale, pathname, r]);

  return null;
}

export default Connection;
