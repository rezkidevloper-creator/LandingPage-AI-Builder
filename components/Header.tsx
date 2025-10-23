import React from 'react';
import { SparklesIcon } from './icons';
import CountrySelector from './CountrySelector';
import { TFunction } from '../hooks/useTranslations';

interface HeaderProps {
  targetCountry: string;
  setTargetCountry: (country: string) => void;
  t: TFunction;
}

const Header: React.FC<HeaderProps> = ({ targetCountry, setTargetCountry, t }) => {
  return (
    <header>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <SparklesIcon className="w-10 h-10 text-brand-purple" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark tracking-tight">
            {t('headerTitle')}
          </h1>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <CountrySelector 
            selectedCountry={targetCountry}
            setSelectedCountry={setTargetCountry}
            t={t}
          />
        </div>
      </div>
      <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto text-center">
        {t('headerSubtitle')}
      </p>
    </header>
  );
};

export default Header;