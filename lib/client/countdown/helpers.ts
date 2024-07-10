// Constants
import { TYPES } from './constants';

// Helpers
import { getQuizConfig } from '@/lib/client/getQuizConfig';

// Store
import { setEndTime } from './store';

interface TimeLimit {
  duration: number; // in seconds
  type: typeof TYPES[keyof typeof TYPES];
}

const config = getQuizConfig();

export function establishEndTime(duration: number) {
  const now = Math.round(new Date().getTime() / 1000);
  const endTime = now + duration;
  setEndTime(endTime);
}

export function getEnabled() {
  return Boolean(config.timeLimit);
}

export function getTimeLimit(): TimeLimit {
  const { timeLimit } = config;

  if (!timeLimit) throw new Error('Time limit is not set');

  try {
    // Get the first letter from string with a type of limit
    const type = timeLimit.substring(0, 1) as typeof TYPES[keyof typeof TYPES];
    const duration = Number(timeLimit.substring(1));

    if (!Object.values(TYPES).includes(type)) throw new Error('Invalid type of time limit');

    return {
      type,
      duration,
    };
  } catch {
    throw new Error('Invalid value of time limit');
  }
}
