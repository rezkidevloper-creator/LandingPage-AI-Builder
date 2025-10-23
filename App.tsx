import React, { useState, useEffect } from 'react';
import { LandingPageContent } from './types';
import { generateLandingPageContent, GenerationOptions } from './services/geminiService';
import Header from './components/Header';
import UrlInputForm from './components/UrlInputForm';
import ResultsDisplay from './components/ResultsDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { useTranslations, Language } from './hooks/useTranslations';

const App: React.FC = () => {
  const language: Language = 'ar';
  const t = useTranslations(language);

  const [productUrl, setProductUrl] = useState<string>('');
  const [targetCountry, setTargetCountry] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<LandingPageContent | null>(null);

  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    freeDelivery: true,
    scriptCount: 4,
    reviewCount: 2,
    targetAudience: 'all',
  });

  useEffect(() => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
  }, []);

  const handleGenerate = async () => {
    if (!productUrl.trim()) {
      setError(t('error_invalid_url'));
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateLandingPageContent(productUrl, targetCountry, generationOptions);
      setGeneratedContent(content);
    } catch (err) {
      console.error(err);
      setError(t('error_generation_failed'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col bg-brand-bg">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-100 via-pink-50 to-white -z-10"></div>
      <div className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        <Header 
          targetCountry={targetCountry}
          setTargetCountry={setTargetCountry}
          t={t}
        />
        <main className="mt-8 md:mt-12">
          <UrlInputForm
            productUrl={productUrl}
            setProductUrl={setProductUrl}
            onGenerate={handleGenerate}
            isLoading={isLoading}
            options={generationOptions}
            setOptions={setGenerationOptions}
            t={t}
          />
          {error && (
            <div className="mt-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-lg text-center animate-fade-in">
              {error}
            </div>
          )}
          <div className="mt-10">
            {isLoading && <LoadingSpinner t={t} />}
            {generatedContent && !isLoading && (
              <div className="animate-fade-in">
                <ResultsDisplay content={generatedContent} t={t} />
              </div>
            )}
          </div>
        </main>
      </div>
       <footer className="text-center py-6 text-gray-500">
        by RezkiDev
      </footer>
    </div>
  );
};

export default App;