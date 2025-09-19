import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimezoneData, CitySearchResult } from '../../types';
import { COMMON_TIMEZONES, TIMEZONE_CITY_MAP } from '../../data/timezones';

export const timezoneApi = createApi({
  reducerPath: 'timezoneApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://worldtimeapi.org/api',
  }),
  tagTypes: ['Timezone'],
  endpoints: (builder) => ({
    getTimezones: builder.query<string[], void>({
      query: () => '/timezone',
      providesTags: ['Timezone'],
    }),
    getTimezoneData: builder.query<TimezoneData, string>({
      query: (timezone) => `/timezone/${timezone}`,
      providesTags: (_result, _error, timezone) => [
        { type: 'Timezone', id: timezone },
      ],
    }),
    searchCities: builder.query<CitySearchResult[], string>({
      queryFn: async (query: string) => {
        if (!query.trim()) return { data: [] };

        try {
          // Try API first
          const response = await fetch('https://worldtimeapi.org/api/timezone');
          if (!response.ok) throw new Error('API failed');

          const timezones = await response.json();
          const filtered = timezones
            .filter((tz: string) =>
              tz.toLowerCase().includes(query.toLowerCase()) ||
              tz.split('/').some((part: string) =>
                part.toLowerCase().includes(query.toLowerCase())
              )
            )
            .slice(0, 10)
            .map((timezone: string) => {
              const parts = timezone.split('/');
              const city = parts[parts.length - 1].replace(/_/g, ' ');
              const region = parts.length > 1 ? parts[0] : '';

              return {
                timezone,
                city,
                country: region,
                display_name: `${city}${region ? ` (${region})` : ''}`
              };
            });

          return { data: filtered };
        } catch {
          // Fallback to static data
          const filtered = COMMON_TIMEZONES
            .filter(tz =>
              tz.toLowerCase().includes(query.toLowerCase()) ||
              TIMEZONE_CITY_MAP[tz]?.city.toLowerCase().includes(query.toLowerCase()) ||
              TIMEZONE_CITY_MAP[tz]?.country.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, 10)
            .map(timezone => {
              const cityData = TIMEZONE_CITY_MAP[timezone];
              return {
                timezone,
                city: cityData?.city || timezone.split('/').pop()?.replace(/_/g, ' ') || '',
                country: cityData?.country || '',
                display_name: `${cityData?.city || timezone.split('/').pop()?.replace(/_/g, ' ')}${cityData?.country ? ` (${cityData.country})` : ''}`
              };
            });

          return { data: filtered };
        }
      },
      providesTags: ['Timezone'],
    }),
  }),
});

export const {
  useGetTimezonesQuery,
  useGetTimezoneDataQuery,
  useSearchCitiesQuery,
  useLazySearchCitiesQuery,
} = timezoneApi;