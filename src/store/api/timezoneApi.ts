import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { TimezoneData, CitySearchResult } from '../../types';

export const timezoneApi = createApi({
  reducerPath: 'timezoneApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://worldtimeapi.org/api',
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
      query: () => '/timezone',
      transformResponse: (response: string[], _meta, arg: string) => {
        if (!arg.trim()) return [];

        return response
          .filter(tz =>
            tz.toLowerCase().includes(arg.toLowerCase()) ||
            tz.split('/').some(part =>
              part.toLowerCase().includes(arg.toLowerCase())
            )
          )
          .slice(0, 10)
          .map(timezone => {
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