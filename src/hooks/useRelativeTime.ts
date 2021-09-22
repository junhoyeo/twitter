import * as DateFns from 'date-fns';
import { useMemo } from 'react';

export const useRelativeTime = (timestamp: string | number | Date) => {
  const createdAt = useMemo(() => {
    const createdAtTime = new Date(timestamp);
    const formattedDistance = DateFns.formatDistanceToNow(createdAtTime);
    if (formattedDistance === 'less than a minute') {
      return 'Now';
    }
    return formattedDistance
      .replace(' minutes', 'm')
      .replace(' minute', 'm')
      .replace(' hours', 'h')
      .replace(' hour', 'h')
      .replace(' days', 'd')
      .replace(' day', 'd')
      .replace(' months', 'm')
      .replace(' month', 'm')
      .replace(' years', 'y')
      .replace(' year', 'y')
      .replace('almost ', '')
      .replace('about ', '')
      .replace('over ', '');
  }, [timestamp]);

  return createdAt;
};
