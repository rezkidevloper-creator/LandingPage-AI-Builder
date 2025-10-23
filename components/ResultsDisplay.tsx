import React from 'react';
import type { LandingPageContent } from '../types';
import CopyButton from './CopyButton';
import { StarIcon, DocumentArrowDownIcon } from './icons';
import { TFunction } from '../hooks/useTranslations';

interface ResultsDisplayProps {
  content: LandingPageContent;
  t: TFunction;
}

const ResultCard: React.FC<{ title: string; children: React.ReactNode; actions?: React.ReactNode }> = ({ title, children, actions }) => (
  <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-gray-200 mb-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-2xl font-bold text-brand-purple">{title}</h3>
      {actions && <div>{actions}</div>}
    </div>
    {children}
  </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ content, t }) => {

  const handleExport = () => {
    let textContent = "";

    textContent += `====================\n`;
    textContent += `${t('result_card_title_titles')}\n`;
    textContent += `====================\n\n`;
    textContent += `${t('result_main_title_label')}: ${content.main_title}\n`;
    textContent += `${t('result_subtitle_label')}: ${content.sub_title}\n\n`;

    textContent += `====================\n`;
    textContent += `${t('result_card_title_script')}\n`;
    textContent += `====================\n\n`;
    content.script_sections.forEach((section, index) => {
        textContent += `----------\n`;
        textContent += `${t('result_script_section_label')} #${index + 1}:\n`;
        textContent += `${section.text}\n\n`;
        textContent += `${t('result_image_prompt_label')}:\n`;
        textContent += `"${section.image_prompt}"\n\n`;
    });

    textContent += `====================\n`;
    textContent += `${t('result_card_title_video')}\n`;
    textContent += `====================\n\n`;
    textContent += `"${content.video_prompt}"\n\n`;

    textContent += `====================\n`;
    textContent += `${t('result_card_title_cta')}\n`;
    textContent += `====================\n\n`;
    textContent += `${content.cta}\n\n`;

    textContent += `====================\n`;
    textContent += `${t('result_card_title_reviews')}\n`;
    textContent += `====================\n\n`;
    content.customer_reviews.forEach((review, index) => {
        textContent += `----------\n`;
        textContent += `${t('result_review_label')} #${index + 1}:\n`;
        textContent += `${review.name} (${review.region})\n`;
        textContent += `"${review.review}"\n\n`;
    });

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page-script.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const FullJson = () => (
    <div className="relative bg-brand-dark text-white p-4 rounded-lg overflow-x-auto">
      <CopyButton textToCopy={JSON.stringify(content, null, 2)} className="absolute top-2 right-2" />
      <pre className="text-sm whitespace-pre-wrap">
        <code>{JSON.stringify(content, null, 2)}</code>
      </pre>
    </div>
  )

  const exportButton = (
    <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-brand-purple text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition-transform transform hover:scale-105">
      <DocumentArrowDownIcon className="w-5 h-5" />
      {t('export_button_text')}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        {exportButton}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:col-span-2">
          <ResultCard title={t('result_card_title_titles')}>
            <div className="space-y-3">
              <div className="flex justify-between items-start gap-2">
                <p className="text-lg font-semibold text-gray-800 flex-1">{content.main_title}</p>
                <CopyButton textToCopy={content.main_title} />
              </div>
              <div className="flex justify-between items-start gap-2">
                <p className="text-lg text-gray-600 flex-1" lang="ar" dir="rtl">{content.sub_title}</p>
                <CopyButton textToCopy={content.sub_title} />
              </div>
            </div>
          </ResultCard>
        </div>

        <div className="space-y-6">
          <ResultCard title={t('result_card_title_script')}>
            <div className="space-y-6">
              {content.script_sections.map((section, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <p className="text-gray-700 flex-1" lang="ar" dir="rtl">{section.text}</p>
                    <CopyButton textToCopy={section.text} />
                  </div>
                  <div className="flex justify-between items-start gap-2 mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-500 italic flex-1">"{section.image_prompt}"</p>
                    <CopyButton textToCopy={section.image_prompt} />
                  </div>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title={t('result_card_title_video')}>
             <div className="flex justify-between items-start gap-2">
                <p className="text-sm text-gray-500 italic flex-1">"{content.video_prompt}"</p>
                <CopyButton textToCopy={content.video_prompt} />
              </div>
          </ResultCard>

           <ResultCard title={t('result_card_title_cta')}>
             <div className="flex justify-between items-start gap-2">
                <p className="text-xl font-bold text-center text-brand-dark flex-1" lang="ar" dir="rtl">{content.cta}</p>
                <CopyButton textToCopy={content.cta} />
              </div>
          </ResultCard>
        </div>

        <div className="space-y-6">
          <ResultCard title={t('result_card_title_reviews')}>
            <div className="space-y-4">
              {content.customer_reviews.map((review, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg border">
                   <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white font-bold text-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div className="ms-3">
                        <p className="font-bold">{review.name} ({review.region})</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-4 h-4" />)}
                        </div>
                      </div>
                   </div>
                   <div className="flex justify-between items-start gap-2 mt-2">
                      <p className="text-gray-700 flex-1" lang="ar" dir="rtl">{review.review}</p>
                      <CopyButton textToCopy={review.review} />
                   </div>
                </div>
              ))}
            </div>
          </ResultCard>

          <ResultCard title={t('result_card_title_json')}>
            <FullJson />
          </ResultCard>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;