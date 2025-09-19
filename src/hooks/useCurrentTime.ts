import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useCurrentTime = (timezone?: string) => {
  const { i18n } = useTranslation();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    // Update immediately
    updateTime();

    // Update every second
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (options?: Intl.DateTimeFormatOptions) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
      ...options
    };

    return currentTime.toLocaleString(i18n.language, {
      ...defaultOptions,
      timeZone: timezone,
    });
  };

  const formatDate = (options?: Intl.DateTimeFormatOptions) => {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    };

    return currentTime.toLocaleDateString(i18n.language, {
      ...defaultOptions,
      timeZone: timezone,
    });
  };

  const getTimezone = () => {
    return timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  };

  return {
    currentTime,
    formatTime,
    formatDate,
    getTimezone,
  };
};