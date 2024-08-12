import { isClient } from '@/constants/isClient';

const startKey = 'stopwatch-start';
const endKey = 'stopwatch-end';

export function setStartTime(startTime: number) {
  if (isClient) {
    sessionStorage.setItem(startKey, startTime.toString());
    sessionStorage.removeItem(endKey);
  }
}

export function setEndTime(endTime: number) {
  if (isClient) {
    sessionStorage.setItem(endKey, endTime.toString());
  }
}

export function getTime() {
  if (!isClient) {
    return {};
  }

  const startTime = sessionStorage.getItem(startKey);
  const endTime = sessionStorage.getItem(endKey);

  return {
    start: startTime ? Number(startTime) : undefined,
    end: endTime ? Number(endTime) : undefined,
  };
}
