import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageReviewer } from '../context/ImageReviewerContext';
import { CANDIDATE_REGISTRY } from '../data/candidateRegistry';
import { useLocation } from 'react-router-dom';

/**
 * Floating Global Image Reviewer Dock.
 * Features:
 * - Real-time progress tracker (Favorites Selected / Notes Provided).
 * - Automatic "Developer Hand-Off Report" when all favorites are picked.
 * - Next & Previous quick navigation shortcuts.
 * - One-click export for both Markdown & JSON Developer Reports.
 */
const ImageReviewerDock = () => {
  const {
    reviewerModeActive,
    toggleReviewerMode,
    selectedCandidates,
    feedbackNotes,
    isAllFavoritesPicked,
    generateDeveloperReportMarkdown,
    downloadDeveloperReportMarkdown,
    exportReviewSummary,
    resetReviewerState,
  } = useImageReviewer();

  const [isOpen, setIsOpen] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const location = useLocation();

  // Filter slots for current active page
  const currentPageName = location.pathname === '/craft' ? 'Craft' : 'Home';
  const currentPageSlots = CANDIDATE_REGISTRY.filter((s) => s.page === currentPageName);

  // Compute stats
  const totalSlots = CANDIDATE_REGISTRY.length;
  const configuredSlotsCount = CANDIDATE_REGISTRY.filter((s) => selectedCandidates[s.slotId]).length;
  const reviewedCandidatesCount = Object.keys(feedbackNotes).filter((k) => feedbackNotes[k]?.trim().length > 0).length;

  const scrollToSlot = (slotId) => {
    const el = document.getElementById(`reviewer-overlay-${slotId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleCopyMarkdown = () => {
    const mdText = generateDeveloperReportMarkdown();
    navigator.clipboard.writeText(mdText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 font-['Inter']">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 bg-[#161412]/95 backdrop-blur-xl border-2 border-[#c69f69] rounded-2xl p-5 shadow-2xl w-80 sm:w-96 text-[#e6dfcc]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#c69f69]/30 pb-3 mb-4">
                <div>
                  <h3 className="font-bold font-['Oswald'] text-lg text-[#c69f69] tracking-wider uppercase flex items-center gap-2">
                    <span>🎨</span> Image Reviewer Control
                  </h3>
                  <p className="text-[11px] text-[#e6dfcc]/70">
                    Review candidates, pick favorites, and notify developer
                  </p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#c69f69] hover:text-[#e6dfcc] text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {/* All Favorites Picked Celebration Banner */}
              {isAllFavoritesPicked && (
                <div className="mb-4 bg-gradient-to-r from-[#c69f69]/30 via-[#d8cfaa]/20 to-[#c69f69]/30 p-3 rounded-xl border border-[#c69f69] text-center shadow-lg">
                  <span className="text-2xl block mb-1">🎉</span>
                  <p className="text-[#c69f69] font-bold font-['Oswald'] text-sm uppercase tracking-wider">
                    All 10 Favorites Selected!
                  </p>
                  <p className="text-xs text-[#e6dfcc]/90 mb-3">
                    Your complete developer hand-off manifest is ready.
                  </p>
                  <button
                    onClick={() => setShowReportModal(true)}
                    className="w-full py-2 bg-[#c69f69] text-[#161412] font-black font-['Oswald'] text-xs uppercase tracking-widest rounded-lg hover:brightness-110 transition-all shadow"
                  >
                    📄 View Developer Report
                  </button>
                </div>
              )}

              {/* Stats Summary */}
              <div className="grid grid-cols-2 gap-3 mb-4 bg-black/50 p-3 rounded-xl border border-[#c69f69]/20 text-center">
                <div>
                  <span className="text-xl font-bold font-mono text-[#c69f69]">
                    {configuredSlotsCount}/{totalSlots}
                  </span>
                  <p className="text-[10px] uppercase font-['Oswald'] tracking-wider text-[#e6dfcc]/80">
                    Favorites Selected
                  </p>
                </div>
                <div>
                  <span className="text-xl font-bold font-mono text-[#c69f69]">
                    {reviewedCandidatesCount}
                  </span>
                  <p className="text-[10px] uppercase font-['Oswald'] tracking-wider text-[#e6dfcc]/80">
                    Notes Provided
                  </p>
                </div>
              </div>

              {/* Jump to Page Placeholders */}
              <div className="mb-4">
                <label className="block text-[11px] font-bold font-['Oswald'] uppercase tracking-wider text-[#c69f69] mb-2">
                  Jump to {currentPageName} Placeholders:
                </label>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {currentPageSlots.map((slot) => {
                    const selId = selectedCandidates[slot.slotId];
                    const activeCand = slot.candidates.find((c) => c.id === selId) || slot.candidates[0];

                    return (
                      <button
                        key={slot.slotId}
                        onClick={() => scrollToSlot(slot.slotId)}
                        className="w-full text-left bg-black/40 hover:bg-[#c69f69]/20 border border-[#c69f69]/20 rounded-lg p-2 transition-all flex items-center justify-between group"
                      >
                        <div className="truncate pr-2">
                          <p className="text-xs font-bold text-[#e6dfcc] group-hover:text-[#c69f69] truncate">
                            {slot.slotName}
                          </p>
                          <p className="text-[10px] font-mono text-[#c69f69]/80 truncate">
                            Favorite: {activeCand?.filename}
                          </p>
                        </div>
                        <span className="text-xs text-[#c69f69] group-hover:translate-x-1 transition-transform">
                          →
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Report & Export Buttons */}
              <div className="space-y-2 pt-2 border-t border-[#c69f69]/30">
                <button
                  onClick={() => setShowReportModal(true)}
                  className="w-full py-2.5 bg-gradient-to-r from-[#c69f69] to-[#d8cfaa] text-[#161412] font-extrabold font-['Oswald'] text-xs uppercase tracking-widest rounded-lg shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
                >
                  <span>📄</span> Developer Hand-Off Report
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={downloadDeveloperReportMarkdown}
                    className="py-1.5 bg-[#161412] text-[#c69f69] border border-[#c69f69]/40 hover:border-[#c69f69] text-[10px] font-bold uppercase font-['Oswald'] tracking-wider rounded-lg transition-colors"
                  >
                    📄 Report (.MD)
                  </button>

                  <button
                    onClick={exportReviewSummary}
                    className="py-1.5 bg-[#161412] text-[#c69f69] border border-[#c69f69]/40 hover:border-[#c69f69] text-[10px] font-bold uppercase font-['Oswald'] tracking-wider rounded-lg transition-colors"
                  >
                    📥 Manifest (.JSON)
                  </button>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={toggleReviewerMode}
                    className="flex-1 py-1.5 bg-[#161412] text-[#e6dfcc]/80 border border-[#c69f69]/30 hover:text-[#c69f69] text-[10px] font-bold uppercase font-['Oswald'] tracking-wider rounded-lg transition-colors"
                  >
                    {reviewerModeActive ? 'Hide Overlays' : 'Show Overlays'}
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('Reset all image candidate ratings, favorites, and feedback?')) {
                        resetReviewerState();
                      }
                    }}
                    className="py-1.5 px-3 bg-red-950/40 text-red-300 border border-red-800/40 hover:bg-red-900/60 text-[10px] font-bold uppercase font-['Oswald'] tracking-wider rounded-lg transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`border-2 p-3 rounded-full shadow-2xl transition-all flex items-center gap-2 font-['Oswald'] uppercase text-xs tracking-widest font-bold group ${
            isAllFavoritesPicked
              ? 'bg-[#c69f69] text-[#161412] border-[#e6dfcc] animate-bounce shadow-[#c69f69]/50'
              : 'bg-[#161412] text-[#c69f69] border-[#c69f69] hover:bg-[#c69f69] hover:text-[#161412]'
          }`}
        >
          <span className="text-base group-hover:rotate-12 transition-transform">
            {isAllFavoritesPicked ? '🎉' : '🎨'}
          </span>
          <span className="hidden sm:inline">
            {isAllFavoritesPicked ? 'Send Report to Dev' : 'Image Reviewer'}
          </span>
          <span
            className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
              isAllFavoritesPicked
                ? 'bg-[#161412] text-[#c69f69]'
                : 'bg-[#c69f69] text-[#161412] group-hover:bg-[#161412] group-hover:text-[#c69f69]'
            }`}
          >
            {configuredSlotsCount}/{totalSlots}
          </span>
        </button>
      </div>

      {/* Developer Report Hand-Off Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-['Inter']">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1c1a17] border-2 border-[#c69f69] rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#e6dfcc]"
            >
              <div className="flex items-center justify-between border-b border-[#c69f69]/30 pb-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold font-['Oswald'] text-[#c69f69] uppercase tracking-wider flex items-center gap-2">
                    <span>📄</span> Developer Image Hand-Off Report
                  </h3>
                  <p className="text-xs text-[#e6dfcc]/70">
                    Generated report with solid candidate filenames, star ratings, and reviewer feedback notes.
                  </p>
                </div>

                <button
                  onClick={() => setShowReportModal(false)}
                  className="text-[#c69f69] hover:text-[#e6dfcc] text-xl font-bold px-3 py-1 border border-[#c69f69]/30 rounded-lg"
                >
                  ✕
                </button>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-black/60 p-4 rounded-xl border border-[#c69f69]/30 mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#c69f69] font-['Oswald'] uppercase tracking-wider">
                    Status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase font-mono ${
                      isAllFavoritesPicked
                        ? 'bg-green-900/60 text-green-300 border border-green-600'
                        : 'bg-yellow-900/60 text-yellow-300 border border-yellow-600'
                    }`}
                  >
                    {isAllFavoritesPicked
                      ? '✓ All 10 Favorites Selected'
                      : `${configuredSlotsCount}/${totalSlots} Favorites Selected`}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleCopyMarkdown}
                    className="px-4 py-2 bg-[#c69f69] text-[#161412] font-bold font-['Oswald'] text-xs uppercase tracking-widest rounded-lg shadow hover:brightness-110 transition-all flex items-center gap-1.5"
                  >
                    <span>{copied ? '✓ Copied!' : '📋 Copy Markdown'}</span>
                  </button>

                  <button
                    onClick={downloadDeveloperReportMarkdown}
                    className="px-4 py-2 bg-[#161412] text-[#c69f69] border border-[#c69f69] font-bold font-['Oswald'] text-xs uppercase tracking-widest rounded-lg hover:bg-[#c69f69] hover:text-[#161412] transition-all flex items-center gap-1.5"
                  >
                    <span>📄 Download .MD</span>
                  </button>

                  <button
                    onClick={exportReviewSummary}
                    className="px-4 py-2 bg-[#161412] text-[#c69f69] border border-[#c69f69]/60 font-bold font-['Oswald'] text-xs uppercase tracking-widest rounded-lg hover:border-[#c69f69] transition-all flex items-center gap-1.5"
                  >
                    <span>📥 Download .JSON</span>
                  </button>
                </div>
              </div>

              {/* Formatted Markdown Preview Display */}
              <div className="bg-black/80 p-5 rounded-xl border border-[#c69f69]/30 text-xs font-mono overflow-x-auto whitespace-pre-wrap text-[#e6dfcc] max-h-96 leading-relaxed">
                {generateDeveloperReportMarkdown()}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-6 py-2.5 bg-[#c69f69] text-[#161412] font-bold font-['Oswald'] text-xs uppercase tracking-widest rounded-xl hover:brightness-110 transition-all"
                >
                  Close Report Window
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageReviewerDock;
