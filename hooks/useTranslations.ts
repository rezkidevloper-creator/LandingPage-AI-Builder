import en from '../locales/en';
import ar from '../locales/ar';

export type Language = 'en' | 'ar';

type Keys = keyof typeof en | keyof typeof ar;

export type TFunction = (key: Keys) => string;

const translations = { en, ar };

export const useTranslations = (language: Language): TFunction => {
  return (key: Keys): string => {
    const langDict = translations[language];
    // Check if the key exists in the selected language's dictionary
    if (Object.prototype.hasOwnProperty.call(langDict, key)) {
      return langDict[key as keyof typeof langDict];
    }
    
    // If not, fallback to the English dictionary
    const enDict = translations.en;
    if (Object.prototype.hasOwnProperty.call(enDict, key)) {
      return enDict[key as keyof typeof enDict];
    }
    
    // If the key is not found in any translation, return the key itself
    // FIX: The function must return a string, but the `key` type could be a number or symbol. This converts it to a string.
    return String(key);
  };
};
