
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition-colors duration-200 flex-shrink-0 ${isCopied ? 'bg-green-100 text-green-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'} ${className}`}
      aria-label="Copy to clipboard"
    >
      {isCopied ? (
        <CheckIcon className="w-5 h-5" />
      ) : (
        <CopyIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default CopyButton;
