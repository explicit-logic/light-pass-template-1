'use client';

import { memo, useEffect, useMemo, useState } from 'react';

// Constants
import { ONE_SECOND, SECONDS_BEFORE_END } from '@/lib/client/countdown/constants';

// Helpers
import { getDuration } from '@/helpers/getDuration';
import { getEndTime } from '@/lib/client/countdown/store';

function Countdown() {
  const [timeNow, setTimeNow] = useState<number>(Date.now());
  const [isClient, setIsClient] = useState(false);

  const endTime = useMemo(() => {
    const endTimeInSeconds = getEndTime();
    const endTime = endTimeInSeconds ? endTimeInSeconds * ONE_SECOND : null;

    return endTime;
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    setIsClient(true);

    const tick = () => {
      return setInterval(() => {
        setTimeNow(Date.now());
      }, ONE_SECOND);
    };

    if (endTime && endTime > Date.now()) {
      intervalId = tick();
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [endTime]);

  if (!isClient || !endTime || timeNow > endTime) {
    return <div className="border-l border-gray-400"/>;
  }

  const runningOut = endTime - timeNow <= SECONDS_BEFORE_END * ONE_SECOND;

  return (
    <div
      className={`${runningOut ? 'bg-yellow-500 animate-pulse': 'bg-primary-500'} tabular-nums px-2 py-1 rounded-md text-center text-white`}
    >
      <time>{getDuration(timeNow, endTime)}</time>
    </div>
  );
}

export default memo(Countdown);

