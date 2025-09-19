import { useState, useEffect, useRef } from 'react';
import { Combobox } from '@ark-ui/react/combobox';
import { useTimezoneAPI } from '../hooks/useTimezoneAPI';
import { CitySearchResult, SearchInputProps } from '../types';

export const CitySearch = ({ onCitySelect, placeholder = 'Search for a city...', className = '' }: SearchInputProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CitySearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { searchCities, loading, error } = useTimezoneAPI();
  const debounceRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        try {
          const results = await searchCities(searchQuery);
          setSuggestions(results);
          setIsOpen(results.length > 0);
        } catch (err) {
          setSuggestions([]);
          setIsOpen(false);
        }
      } else {
        setSuggestions([]);
        setIsOpen(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchQuery, searchCities]);

  const handleCitySelect = (city: CitySearchResult) => {
    setSearchQuery(city.display_name);
    setIsOpen(false);
    onCitySelect(city);
  };

  return (
    <div className={`w-full ${className}`}>
      <Combobox.Root
        open={isOpen}
        onOpenChange={({ open }) => setIsOpen(open)}
        onValueChange={({ value }) => {
          const selectedCity = suggestions.find(city => city.display_name === value[0]);
          if (selectedCity) {
            handleCitySelect(selectedCity);
          }
        }}
      >
        <Combobox.Label className="block text-sm font-medium text-gray-700 mb-2">
          Search Manager's Location
        </Combobox.Label>

        <Combobox.Control className="relative">
          <Combobox.Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <Combobox.Trigger className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </Combobox.Trigger>
        </Combobox.Control>

        <Combobox.Positioner>
          <Combobox.Content className="mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto z-10">
            {loading && (
              <div className="px-4 py-3 text-sm text-gray-500">
                Searching...
              </div>
            )}

            {error && (
              <div className="px-4 py-3 text-sm text-red-500">
                Error: {error}
              </div>
            )}

            {!loading && !error && suggestions.length === 0 && searchQuery.trim().length >= 2 && (
              <div className="px-4 py-3 text-sm text-gray-500">
                No cities found
              </div>
            )}

            {suggestions.map((city) => (
              <Combobox.Item
                key={city.timezone}
                item={city.display_name}
                className="px-4 py-3 text-sm hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <div>
                  <div className="font-medium text-gray-900">{city.city}</div>
                  <div className="text-xs text-gray-500">{city.timezone}</div>
                </div>
              </Combobox.Item>
            ))}
          </Combobox.Content>
        </Combobox.Positioner>
      </Combobox.Root>
    </div>
  );
};

CitySearch.displayName = 'CitySearch';