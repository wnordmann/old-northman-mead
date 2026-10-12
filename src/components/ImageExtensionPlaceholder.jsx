import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageReviewer } from '../context/ImageReviewerContext';
import { getSlotById } from '../data/candidateRegistry';

/**
 * Lightweight, Sleek Image Extension Placeholder & Candidate Reviewer Component.
 * - Prominent "FAVORITE SELECTED" status note badge & reviewer note callout on the picker bar.
 * - Next (▶) and Previous (◀) buttons to cycle candidate images to try.
 * - Star Rating, inline Feedback Popover, & Grid Comparison modal.
 */
const ImageExtensionPlaceholder = ({
  slotId,
  targetWidth = 1920,
  targetHeight = 1080,
  aspectRatio = '16:9',
  description = 'Target Canvas Extension',
  className = '',
  onSelectCandidate,
}) => {
  const {
    reviewerModeActive,
    selectCandidate,
    setCandidateRating,
    setCandidateFeedback,
    ratings,
    feedbackNotes,
    getActiveCandidate,
    getNextCandidate,
    getPrevCandidate,
    getNextSlot,
    getPrevSlot,
  } = useImageReviewer();

  const slotData = getSlotById(slotId) || {
    slotId,
    slotName: description,
    targetWidth,
    targetHeight,
    aspectRatio,
    description,
    candidates: [],
  };

  const activeFavorite = getActiveCandidate(slotId) || slotData.candidates[0];
  const [viewingCandidateId, setViewingCandidateId] = useState(activeFavorite?.id || slotData.candidates[0]?.id);
  const [showNotePopover, setShowNotePopover] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Active viewing candidate object
  const currentCandidate =
    slotData.candidates.find((c) => c.id === viewingCandidateId) || activeFavorite || slotData.candidates[0];

  const currentCandidateIndex = slotData.candidates.findIndex((c) => c.id === currentCandidate?.id);
  const totalCandidates = slotData.candidates.length;

  if (!reviewerModeActive) {
    return null;
  }

  const isFavorite = activeFavorite?.id === currentCandidate?.id;

  const handleToggleFavorite = () => {
    if (currentCandidate) {
      selectCandidate(slotId, currentCandidate.id);
      if (onSelectCandidate) {
        onSelectCandidate(currentCandidate.id);
      }
    }
  };

  // Next / Prev Candidate Image controls (Primary Workflow)
  const handlePrevCandidate = (e) => {
    e?.stopPropagation();
    const prev = getPrevCandidate(slotId, currentCandidate.id);
    if (prev) {
      setViewingCandidateId(prev.id);
      selectCandidate(slotId, prev.id); // Auto live-preview active selection
    }
  };

  const handleNextCandidate = (e) => {
    e?.stopPropagation();
    const next = getNextCandidate(slotId, currentCandidate.id);
    if (next) {
      setViewingCandidateId(next.id);
      selectCandidate(slotId, next.id); // Auto live-preview active selection
    }
  };

  // Jump to Next / Prev Slot
  const handlePrevSlot = (e) => {
    e?.stopPropagation();
    const prevS = getPrevSlot(slotId);
    if (prevS) {
      const el = document.getElementById(`reviewer-overlay-${prevS.slotId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNextSlot = (e) => {
    e?.stopPropagation();
    const nextS = getNextSlot(slotId);
    if (nextS) {
      const el = document.getElementById(`reviewer-overlay-${nextS.slotId}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const currentRating = ratings[currentCandidate?.id] || 0;
  const currentNote = feedbackNotes[currentCandidate?.id] || '';

  return (
    <>
      {/* Lightweight Floating Control Bar */}
      <div
        id={`reviewer-overlay-${slotId}`}
        className={`relative z-30 pointer-events-auto my-3 ${className}`}
      >
        <div className="mx-auto w-full max-w-4xl bg-[#161412]/95 backdrop-blur-xl border border-[#c69f69]/80 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] p-2.5 sm:p-3 text-[#e6dfcc] font-['Inter'] transition-all">
          
          {/* Main Controls Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Slot Badge & Spec info */}
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c69f69] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c69f69]"></span>
              </span>
              <div className="leading-tight">
                <span className="text-[#c69f69] font-['Oswald'] text-xs font-bold uppercase tracking-wider block">
                  {slotData.slotName || description}
                </span>
                <span className="text-[10px] text-[#e6dfcc]/60 font-mono">
                  {targetWidth}x{targetHeight} ({aspectRatio})
                </span>
              </div>
            </div>

            {/* Core Feature: Candidate Image Switcher (Prev / Next) */}
            <div className="flex items-center gap-1.5 bg-black/60 p-1 rounded-xl border border-[#c69f69]/40 shadow-inner">
              <button
                onClick={handlePrevCandidate}
                title="Previous Image Candidate"
                className="px-2.5 py-1 bg-[#1c1a17] hover:bg-[#c69f69] text-[#c69f69] hover:text-[#161412] text-xs font-extrabold font-['Oswald'] uppercase rounded-lg border border-[#c69f69]/40 transition-all flex items-center gap-1 active:scale-95"
              >
                <span>◀</span>
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="px-2 py-0.5 text-center min-w-[140px] max-w-[200px] truncate">
                <div className="text-[10px] text-[#c69f69] font-mono font-bold flex items-center justify-center gap-1">
                  <span>Image {currentCandidateIndex + 1} of {totalCandidates}</span>
                  {isFavorite && <span className="text-[#c69f69] text-xs">★</span>}
                </div>
                <div
                  className="text-xs font-mono font-extrabold text-[#e6dfcc] truncate"
                  title={currentCandidate?.filename}
                >
                  {currentCandidate?.filename}
                </div>
              </div>

              <button
                onClick={handleNextCandidate}
                title="Next Image Candidate"
                className="px-2.5 py-1 bg-[#1c1a17] hover:bg-[#c69f69] text-[#c69f69] hover:text-[#161412] text-xs font-extrabold font-['Oswald'] uppercase rounded-lg border border-[#c69f69]/40 transition-all flex items-center gap-1 active:scale-95"
              >
                <span className="hidden sm:inline">Next</span>
                <span>▶</span>
              </button>
            </div>

            {/* Action Buttons: Pick Favorite, Star Rating, Note Popover, & Slot Navigation */}
            <div className="flex items-center gap-2">
              {/* Favorite Toggle Button */}
              <button
                onClick={handleToggleFavorite}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold font-['Oswald'] uppercase tracking-wider transition-all flex items-center gap-1.5 shadow ${
                  isFavorite
                    ? 'bg-[#c69f69] text-[#161412] ring-2 ring-[#c69f69] shadow-[#c69f69]/40'
                    : 'bg-[#1c1a17] text-[#c69f69] border border-[#c69f69] hover:bg-[#c69f69] hover:text-[#161412]'
                }`}
              >
                <span>{isFavorite ? '★' : '☆'}</span>
                <span>{isFavorite ? 'Favorite Picked' : 'Set as Favorite'}</span>
              </button>

              {/* Star Rating Widget */}
              <div className="hidden md:flex items-center gap-0.5 bg-black/40 px-2 py-1 rounded-lg border border-[#c69f69]/20">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setCandidateRating(currentCandidate.id, star)}
                    className={`text-sm transition-transform hover:scale-125 ${
                      star <= currentRating ? 'text-[#c69f69]' : 'text-gray-600'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Note Popover Toggle */}
              <button
                onClick={() => setShowNotePopover(!showNotePopover)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold font-['Oswald'] uppercase tracking-wider border transition-colors flex items-center gap-1 ${
                  currentNote.trim()
                    ? 'bg-[#c69f69]/20 text-[#c69f69] border-[#c69f69]'
                    : 'bg-[#1c1a17] text-[#e6dfcc]/80 border-[#c69f69]/30 hover:border-[#c69f69]'
                }`}
                title="Add Feedback Note"
              >
                <span>💬</span>
                <span className="hidden sm:inline">{currentNote.trim() ? 'Note Saved' : 'Note'}</span>
              </button>

              {/* Grid Gallery Modal Trigger */}
              <button
                onClick={() => setShowModal(true)}
                title="View All Options in Grid"
                className="p-1.5 bg-[#1c1a17] hover:bg-[#c69f69] text-[#c69f69] hover:text-[#161412] rounded-xl border border-[#c69f69]/30 text-xs transition-colors"
              >
                🔍
              </button>

              {/* Slot Navigation Prev/Next */}
              <div className="flex items-center gap-0.5 border-l border-[#c69f69]/30 pl-1.5">
                <button
                  onClick={handlePrevSlot}
                  title="Previous Slot"
                  className="px-1.5 py-1 text-[11px] text-[#c69f69] hover:text-white font-mono"
                >
                  ↑
                </button>
                <button
                  onClick={handleNextSlot}
                  title="Next Slot"
                  className="px-1.5 py-1 text-[11px] text-[#c69f69] hover:text-white font-mono"
                >
                  ↓
                </button>
              </div>
            </div>
          </div>

          {/* Prominent Favorite Note Callout Banner when Favorite is active */}
          {isFavorite && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2.5 px-3 py-1.5 bg-gradient-to-r from-[#c69f69]/25 via-[#d8cfaa]/15 to-transparent border border-[#c69f69]/60 rounded-xl flex flex-wrap items-center justify-between gap-2 shadow-inner"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className="bg-[#c69f69] text-[#161412] font-black text-[10px] uppercase font-['Oswald'] px-2 py-0.5 rounded-full shadow flex items-center gap-1">
                  ★ FAVORITE SELECTED FOR PRODUCTION
                </span>
                <span className="text-[#c69f69] font-mono font-bold truncate">
                  {currentCandidate?.filename}
                </span>
              </div>

              {/* Reviewer Note Display or Prompt */}
              <div className="flex items-center gap-2 text-xs">
                {currentNote.trim() ? (
                  <span className="text-[#e6dfcc] italic truncate max-w-md font-['Inter']">
                    “{currentNote}”
                  </span>
                ) : (
                  <button
                    onClick={() => setShowNotePopover(true)}
                    className="text-[#c69f69] hover:text-[#e6dfcc] underline text-[11px] font-bold uppercase font-['Oswald']"
                  >
                    + Add note for developer
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Expandable Feedback Popover */}
          <AnimatePresence>
            {showNotePopover && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2.5 pt-2.5 border-t border-[#c69f69]/30"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold font-['Oswald'] uppercase tracking-wider text-[#c69f69]">
                    Feedback & Reviewer Notes for {currentCandidate?.filename}:
                  </label>
                  
                  {/* Rating Stars on Mobile */}
                  <div className="flex md:hidden items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setCandidateRating(currentCandidate.id, star)}
                        className={`text-xs ${star <= currentRating ? 'text-[#c69f69]' : 'text-gray-600'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  rows={2}
                  value={currentNote}
                  onChange={(e) => setCandidateFeedback(currentCandidate.id, e.target.value)}
                  placeholder="e.g. Great contrast and linework. Prefers warmer amber lighting for the mead hall."
                  className="w-full bg-black/80 text-[#e6dfcc] border border-[#c69f69]/40 rounded-xl p-2.5 text-xs focus:outline-none focus:border-[#c69f69] font-['Inter'] placeholder:text-gray-600"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Comparison Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md font-['Inter']">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1c1a17] border-2 border-[#c69f69] rounded-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-[#e6dfcc]"
            >
              <div className="flex items-center justify-between border-b border-[#c69f69]/30 pb-4 mb-6">
                <div>
                  <h3 className="text-xl font-bold font-['Oswald'] text-[#c69f69] uppercase tracking-wider">
                    {slotData.slotName} — All Candidates
                  </h3>
                  <p className="text-xs text-[#e6dfcc]/70">
                    Click any candidate to preview live and select favorite.
                  </p>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="text-[#c69f69] hover:text-[#e6dfcc] text-lg font-bold px-3 py-1 border border-[#c69f69]/30 rounded-lg"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {slotData.candidates?.map((cand) => {
                  const isFav = activeFavorite?.id === cand.id;
                  const isCur = currentCandidate?.id === cand.id;
                  const r = ratings[cand.id] || 0;

                  return (
                    <div
                      key={cand.id}
                      onClick={() => {
                        setViewingCandidateId(cand.id);
                        selectCandidate(slotId, cand.id);
                      }}
                      className={`flex flex-col bg-[#161412] border-2 rounded-xl p-3 cursor-pointer transition-all ${
                        isFav
                          ? 'border-[#c69f69] shadow-lg shadow-[#c69f69]/20'
                          : isCur
                          ? 'border-[#c69f69]/70 bg-[#221f1b]'
                          : 'border-[#c69f69]/20 hover:border-[#c69f69]/50'
                      }`}
                    >
                      <div className="relative h-48 bg-black rounded-lg overflow-hidden mb-2">
                        <img
                          src={`${import.meta.env.BASE_URL}${cand.path}`}
                          alt={cand.title}
                          className="w-full h-full object-contain"
                        />
                        {isFav && (
                          <span className="absolute top-2 right-2 bg-[#c69f69] text-[#161412] text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow">
                            ★ Favorite
                          </span>
                        )}
                      </div>

                      <p className="text-xs font-mono font-bold text-[#c69f69] truncate">
                        {cand.filename}
                      </p>
                      <p className="text-xs font-bold text-[#e6dfcc] truncate">{cand.title}</p>
                      <p className="text-[11px] text-[#e6dfcc]/60 italic truncate mb-2">{cand.style}</p>

                      <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#c69f69]/20">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-xs ${star <= r ? 'text-[#c69f69]' : 'text-gray-600'}`}>
                              ★
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            selectCandidate(slotId, cand.id);
                            setViewingCandidateId(cand.id);
                          }}
                          className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase font-['Oswald'] ${
                            isFav
                              ? 'bg-[#c69f69] text-[#161412]'
                              : 'bg-black text-[#c69f69] border border-[#c69f69]/40 hover:bg-[#c69f69] hover:text-[#161412]'
                          }`}
                        >
                          {isFav ? 'Selected' : 'Pick Favorite'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageExtensionPlaceholder;
