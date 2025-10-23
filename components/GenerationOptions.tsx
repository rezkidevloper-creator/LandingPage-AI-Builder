import React from 'react';
import { GenerationOptions as Options } from '../services/geminiService';
import { UserGroupIcon } from './icons';
import { TFunction } from '../hooks/useTranslations';

interface GenerationOptionsProps {
  options: Options;
  setOptions: (options: Options) => void;
  t: TFunction;
}

const GenerationOptions: React.FC<GenerationOptionsProps> = ({ options, setOptions, t }) => {
  const handleOptionChange = <K extends keyof Options>(key: K, value: Options[K]) => {
    setOptions({ ...options, [key]: value });
  };

  const AudienceButton: React.FC<{ value: Options['targetAudience'], label: string }> = ({ value, label }) => (
    <button
      type="button"
      onClick={() => handleOptionChange('targetAudience', value)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors w-full ${
        options.targetAudience === value
          ? 'bg-brand-purple text-white shadow'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Free Delivery */}
        <div className="flex items-center justify-between col-span-1 md:col-span-2">
          <label htmlFor="freeDelivery" className="font-medium text-gray-700">
            {t('option_free_delivery')}
          </label>
          <label htmlFor="free-delivery-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                id="free-delivery-toggle" 
                className="sr-only"
                checked={options.freeDelivery}
                onChange={(e) => handleOptionChange('freeDelivery', e.target.checked)}
              />
              <div className={`block w-14 h-8 rounded-full transition ${options.freeDelivery ? 'bg-brand-purple' : 'bg-gray-300'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${options.freeDelivery ? 'transform translate-x-6' : ''}`}></div>
            </div>
          </label>
        </div>

        {/* Script Count */}
        <div>
          <label htmlFor="scriptCount" className="block font-medium text-gray-700 mb-2">
            {t('option_script_count')}: <span className="font-bold text-brand-purple">{options.scriptCount}</span>
          </label>
          <input
            id="scriptCount"
            type="range"
            min="3"
            max="7"
            value={options.scriptCount}
            onChange={(e) => handleOptionChange('scriptCount', parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
        </div>

        {/* Review Count */}
        <div>
          <label htmlFor="reviewCount" className="block font-medium text-gray-700 mb-2">
            {t('option_review_count')}: <span className="font-bold text-brand-purple">{options.reviewCount}</span>
          </label>
          <input
            id="reviewCount"
            type="range"
            min="2"
            max="5"
            value={options.reviewCount}
            onChange={(e) => handleOptionChange('reviewCount', parseInt(e.target.value, 10))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-purple"
          />
        </div>

        {/* Target Audience */}
        <div className="col-span-1 md:col-span-2">
           <label className="flex items-center gap-2 font-medium text-gray-700 mb-2">
             <UserGroupIcon className="w-5 h-5"/>
             {t('option_audience_title')}
           </label>
           <div className="grid grid-cols-3 gap-2 p-1 bg-gray-100 rounded-lg">
              <AudienceButton value="all" label={t('option_audience_all')} />
              <AudienceButton value="men" label={t('option_audience_men')} />
              <AudienceButton value="women" label={t('option_audience_women')} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationOptions;