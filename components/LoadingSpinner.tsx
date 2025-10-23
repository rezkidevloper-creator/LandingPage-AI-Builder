import React from 'react';
import { SparklesIcon } from './icons';
import { TFunction } from '../hooks/useTranslations';

interface LoadingSpinnerProps {
  t: TFunction;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ t }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <SparklesIcon className="w-12 h-12 text-brand-purple animate-pulse" />
      <p className="mt-4 text-lg font-semibold text-gray-700">{t('loading_title')}</p>
      <p className="text-gray-500">{t('loading_subtitle')}</p>
    </div>
  );
};

export default LoadingSpinner;