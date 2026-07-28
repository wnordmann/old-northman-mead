import { useState } from 'react';

/**
 * Reusable Image Extension Placeholder banner component for artists & designers.
 * Displays target dimensions, aspect ratio, and a toggle control for easy review.
 */
const ImageExtensionPlaceholder = ({
  targetWidth = 1920,
  targetHeight = 1080,
  aspectRatio = '16:9',
  description = 'Target Full-Width Canvas Height Extension',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="absolute bottom-4 right-4 z-30 bg-[#161412]/90 border border-[#c69f69] text-[#c69f69] text-xs px-3 py-1.5 rounded-full font-['Oswald'] tracking-widest uppercase hover:bg-[#c69f69] hover:text-[#161412] transition-all shadow-lg"
      >
        Show Image Spec Overlay
      </button>
    );
  }

  return (
    <div
      className={`relative w-full border-t-2 border-b-2 border-dashed border-[#c69f69]/60 bg-[#161412]/95 backdrop-blur-md flex flex-col items-center justify-center p-6 z-20 text-center ${className}`}
    >
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-4 text-[#c69f69]/70 hover:text-[#c69f69] text-xs uppercase tracking-widest font-['Oswald'] transition-colors"
      >
        [ Hide Overlay ]
      </button>

      <div className="border-2 border-dashed border-[#c69f69] px-6 py-4 rounded-xl bg-black/60 shadow-2xl max-w-xl">
        <div className="flex items-center justify-center gap-3 mb-1">
          <span className="w-3 h-3 rounded-full bg-[#c69f69] animate-ping inline-block"></span>
          <p className="text-[#e6dfcc] font-extrabold text-xl md:text-3xl tracking-widest uppercase">
            PLACEHOLDER {targetWidth}px by {targetHeight}px
          </p>
        </div>
        <p className="text-[#c69f69] font-bold text-xs md:text-sm tracking-wider uppercase">
          Aspect Ratio: {aspectRatio} • {description}
        </p>
      </div>
    </div>
  );
};

export default ImageExtensionPlaceholder;
