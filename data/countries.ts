export interface Country {
  name: string;
  arName: string;
  code: string;
}

export const countries: Country[] = [
  { name: 'Automatic', arName: 'تلقائي', code: 'AUTO' },
  { name: 'Algeria', arName: 'الجزائر', code: 'DZ' },
  { name: 'Bahrain', arName: 'البحرين', code: 'BH' },
  { name: 'Comoros', arName: 'جزر القمر', code: 'KM' },
  { name: 'Djibouti', arName: 'جيبوتي', code: 'DJ' },
  { name: 'Egypt', arName: 'مصر', code: 'EG' },
  { name: 'Iraq', arName: 'العراق', code: 'IQ' },
  { name: 'Jordan', arName: 'الأردن', code: 'JO' },
  { name: 'Kuwait', arName: 'الكويت', code: 'KW' },
  { name: 'Lebanon', arName: 'لبنان', code: 'LB' },
  { name: 'Libya', arName: 'ليبيا', code: 'LY' },
  { name: 'Mauritania', arName: 'موريتانيا', code: 'MR' },
  { name: 'Morocco', arName: 'المغرب', code: 'MA' },
  { name: 'Oman', arName: 'عُمان', code: 'OM' },
  { name: 'Palestine', arName: 'فلسطين', code: 'PS' },
  { name: 'Qatar', arName: 'قطر', code: 'QA' },
  { name: 'Saudi Arabia', arName: 'المملكة العربية السعودية', code: 'SA' },
  { name: 'Somalia', arName: 'الصومال', code: 'SO' },
  { name: 'Sudan', arName: 'السودان', code: 'SD' },
  { name: 'Syria', arName: 'سوريا', code: 'SY' },
  { name: 'Tunisia', arName: 'تونس', code: 'TN' },
  { name: 'United Arab Emirates', arName: 'الإمارات العربية المتحدة', code: 'AE' },
  { name: 'Yemen', arName: 'اليمن', code: 'YE' },
];