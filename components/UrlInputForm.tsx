import React, { useState } from 'react';
import GenerationOptions from './GenerationOptions';
import { GenerationOptions as Options } from '../services/geminiService';
import { Cog6ToothIcon, ChevronDownIcon } from './icons';
import { TFunction } from '../hooks/useTranslations';

interface UrlInputFormProps {
  productUrl: string;
  setProductUrl: (url: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  options: Options;
  setOptions: (options: Options) => void;
  t: TFunction;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ productUrl, setProductUrl, onGenerate, isLoading, options, setOptions, t }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate();
  }

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="p-2 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-full shadow-lg flex items-center gap-2">
        <input
          type="url"
          value={productUrl}
          onChange={(e) => setProductUrl(e.target.value)}
          placeholder={t('form_placeholder')}
          className="w-full px-5 py-3 text-lg bg-transparent focus:outline-none placeholder-gray-400"
          disabled={isLoading}
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-brand-purple hover:bg-opacity-90 text-white font-bold text-base rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100 flex-shrink-0"
          disabled={isLoading}
        >
          {isLoading ? t('form_button_generating') : t('form_button_generate')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={() => setShowOptions(!showOptions)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-purple font-medium transition-colors"
        >
          <Cog6ToothIcon className="w-5 h-5"/>
          <span>{t('options_title')}</span>
          <ChevronDownIcon className={`w-5 h-5 transition-transform ${showOptions ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {showOptions && (
        <div className="mt-4 animate-fade-in" style={{animationDuration: '0.3s'}}>
            <GenerationOptions options={options} setOptions={setOptions} t={t} />
        </div>
      )}
    </div>
  );
};

export default UrlInputForm;