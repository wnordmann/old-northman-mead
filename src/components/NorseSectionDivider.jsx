/**
 * Creative Norse-themed section divider that bridges dark background sections
 * into light parchment (#e6dfcc) sections with an organic curve and metallic runic medallion.
 */
const NorseSectionDivider = () => {
  return (
    <div className="relative w-full overflow-hidden leading-none z-20 pointer-events-none -mt-16 md:-mt-24">
      {/* SVG Organic Wave Curve matching #e6dfcc bottom section color */}
      <svg
        className="relative block w-full h-20 md:h-32 text-[#e6dfcc]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft background glow path */}
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
          className="opacity-95"
        />
        <path
          d="M0,30 C300,110 600,20 900,80 C1050,110 1150,50 1200,80 L1200,120 L0,120 Z"
          fill="currentColor"
        />
      </svg>

      {/* Floating Centered Metallic Norse Medallion Seal */}
      <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 pointer-events-auto flex flex-col items-center">
        <div className="relative group cursor-pointer">
          {/* Glowing Aura Ring */}
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#c69f69] via-[#e6dfcc] to-[#c69f69] opacity-75 blur-md group-hover:opacity-100 transition duration-500 animate-pulse"></div>

          {/* Runic Shield Seal Button */}
          <div className="relative w-14 h-14 md:w-18 md:h-18 rounded-full bg-[#161412] border-2 border-[#c69f69] flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
            <svg
              className="w-8 h-8 md:w-10 md:h-10 text-[#c69f69]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {/* Vegvisir / Compass Rune Symbol */}
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1" strokeDasharray="3 2" />
              <path d="M12 3v18M3 12h18M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="1.5" />
              <circle cx="12" cy="12" r="3" fill="#c69f69" fillOpacity="0.3" />
            </svg>
          </div>
        </div>

        {/* Subtle Runic Text Accent */}
        <span className="mt-2 text-[10px] md:text-xs font-['Oswald'] text-[#1c1a17] tracking-[0.4em] uppercase font-bold">
          ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ
        </span>
      </div>
    </div>
  );
};

export default NorseSectionDivider;
