import React, { useState, useRef, useEffect, useMemo } from 'react';
import { countries, Country } from '../data/countries';
import { GlobeAltIcon, MagnifyingGlassIcon, ChevronUpDownIcon } from './icons';
import { TFunction } from '../hooks/useTranslations';

interface CountrySelectorProps {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  t: TFunction;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ selectedCountry, setSelectedCountry, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);
  
  useEffect(() => {
    if (isOpen) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filteredCountries = useMemo(() =>
    countries.filter(country =>
      country.arName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const handleSelectCountry = (countryName: string) => {
    setSelectedCountry(countryName);
    setSearchQuery('');
    setIsOpen(false);
  };
  
  const getCountryInfo = (countryName: string) => {
      if (!countryName) return countries[0]; // Automatic
      return countries.find(c => c.name === countryName) || countries[0];
  }

  const currentCountry = getCountryInfo(selectedCountry);

  return (
    <div className="relative w-full sm:w-64" ref={wrapperRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-brand-purple/50 transition"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          {currentCountry.code === 'AUTO' ? (
             <GlobeAltIcon className="w-6 h-6 text-gray-500"/>
          ) : (
            <img 
              src={`https://flagcdn.com/w20/${currentCountry.code.toLowerCase()}.png`}
              width="20"
              alt={`${currentCountry.name} flag`}
            />
          )}
          <span className="truncate text-gray-800">{currentCountry.arName}</span>
        </span>
        <ChevronUpDownIcon className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-lg border border-gray-200 animate-fade-in" style={{ animationDuration: '0.2s'}}>
          <div className="p-2">
            <div className="relative">
               <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 rtl:right-3 rtl:left-auto -translate-y-1/2" />
               <input
                ref={searchInputRef}
                type="text"
                placeholder={t('country_search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-purple/50"
              />
            </div>
          </div>
          <ul
            className="max-h-60 overflow-auto"
            tabIndex={-1}
            role="listbox"
          >
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                onClick={() => handleSelectCountry(country.name === 'Automatic' ? '' : country.name)}
                className="flex items-center gap-3 px-4 py-2 text-gray-900 cursor-pointer hover:bg-gray-100"
                role="option"
                aria-selected={selectedCountry === country.name}
              >
                {country.code === 'AUTO' ? (
                    <GlobeAltIcon className="w-6 h-6 text-gray-500"/>
                ) : (
                    <img 
                      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                      width="20"
                      alt={`${country.name} flag`}
                    />
                )}
                {country.arName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;