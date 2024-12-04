import type { ReactNode } from 'react';
import type { Toast, ToastPosition } from '@/lib/client/toaster/types';

import { memo, useRef } from 'react';

type Handlers = {
  updateHeight: (toastId: string, height: number) => void;
  startPause: () => void;
  endPause: () => void;
  calculateOffset: (toast: Toast, opts?: {
      reverseOrder?: boolean;
      gutter?: number;
      defaultPosition?: ToastPosition;
  }) => number;
};

function ToastWrapper(props: { children: ReactNode, handlers: Handlers, t: Toast }) {
  const { children, handlers, t } = props;
  const { calculateOffset, updateHeight } = handlers;
  const node = useRef<HTMLDivElement>(null);

  const offset = calculateOffset(t, {
    reverseOrder: false,
    gutter: 8,
    defaultPosition: 'top-right',
  });

  if (node && node.current && typeof t.height !== 'number'){
    const height = node.current.getBoundingClientRect().height;
    updateHeight(t.id, height);
  }

  return (
    <div
      id={`t-${t.id}`}
      ref={node}
      aria-live="polite"
      role="status"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        left: 0,
        right: 0,
        top: 0,
        position: 'absolute',
        transition: 'all 0.5s ease-out',
        opacity: t.visible ? 1 : 0,
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  );
}

export default memo(ToastWrapper);
