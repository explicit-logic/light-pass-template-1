'use client';

import { memo, useCallback, useEffect, useState } from 'react';
import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';

// Constants
import { ONE_SECOND } from '@/lib/client/countdown/constants';

// Helpers
import { getEndTime } from '@/lib/client/countdown/store';

// Hooks
import { useRouter, useParams } from 'next/navigation';

function TimeOverModal() {
  const [isOpen, setIsOpen] = useState(false);

  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();

  const tQuestion = useTranslations('Question');

  useEffect(() => {
    const endTimeInSeconds = getEndTime();
    const endTime = endTimeInSeconds ? endTimeInSeconds * ONE_SECOND : null;
    const now = Date.now();

    if (!endTime) return;

    const delay = now > endTime ? 0 : endTime - now;

    const timeoutId = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const close = () => {};

  const onSubmit = useCallback(() => {
    router.replace(`/${locale}/result`);
  }, [locale, router]);

  return (
    <Transition
      show={isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog open={isOpen} onClose={close} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/95" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-4 md:p-5 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{tQuestion('timeOver')}</h3>
                <button
                  onClick={onSubmit}
                  type="button"
                  className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-primary-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                >
                  {tQuestion('seeResults')}
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default memo(TimeOverModal);
