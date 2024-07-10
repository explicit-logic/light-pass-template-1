import { isClient } from '@/constants/isClient';

const endTimeKey = 'end-time';

export function getEndTime(): number | null {
  if (!isClient) {
    return null;
  }

  const value = sessionStorage.getItem(endTimeKey);

  return (value ?  Number(value) : null);
}

export function setEndTime(endTime: number) {
  if (isClient) {
    sessionStorage.setItem(endTimeKey, endTime.toString());
  }
}

export function clearEndTime() {
  if (isClient) {
    sessionStorage.removeItem(endTimeKey);
  }
}
