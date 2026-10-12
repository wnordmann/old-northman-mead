import { createContext, useContext, useState, useEffect } from 'react';
import { CANDIDATE_REGISTRY, getSlotById } from '../data/candidateRegistry';

const ImageReviewerContext = createContext(null);

const STORAGE_KEY = 'onm_image_reviewer_state';

const getInitialState = () => {
  const defaults = {
    selectedCandidates: {},
    ratings: {},
    feedbackNotes: {},
    slotFeedback: {},
    reviewerModeActive: true,
  };

  // Set default selected candidates to v1 for each slot
  CANDIDATE_REGISTRY.forEach((slot) => {
    if (slot.candidates && slot.candidates.length > 0) {
      defaults.selectedCandidates[slot.slotId] = slot.candidates[0].id;
    }
  });

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...defaults,
        ...parsed,
        selectedCandidates: {
          ...defaults.selectedCandidates,
          ...(parsed.selectedCandidates || {}),
        },
      };
    }
  } catch (e) {
    console.error('Failed to load image reviewer state from localStorage:', e);
  }

  return defaults;
};

export const ImageReviewerProvider = ({ children }) => {
  const [state, setState] = useState(getInitialState);

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save image reviewer state to localStorage:', e);
    }
  }, [state]);

  const selectCandidate = (slotId, candidateId) => {
    setState((prev) => ({
      ...prev,
      selectedCandidates: {
        ...prev.selectedCandidates,
        [slotId]: candidateId,
      },
    }));
  };

  const setCandidateRating = (candidateId, rating) => {
    setState((prev) => ({
      ...prev,
      ratings: {
        ...prev.ratings,
        [candidateId]: rating,
      },
    }));
  };

  const setCandidateFeedback = (candidateId, note) => {
    setState((prev) => ({
      ...prev,
      feedbackNotes: {
        ...prev.feedbackNotes,
        [candidateId]: note,
      },
    }));
  };

  const setSlotFeedback = (slotId, note) => {
    setState((prev) => ({
      ...prev,
      slotFeedback: {
        ...prev.slotFeedback,
        [slotId]: note,
      },
    }));
  };

  const toggleReviewerMode = () => {
    setState((prev) => ({
      ...prev,
      reviewerModeActive: !prev.reviewerModeActive,
    }));
  };

  const resetReviewerState = () => {
    const defaults = getInitialState();
    localStorage.removeItem(STORAGE_KEY);
    setState(defaults);
  };

  const getActiveCandidate = (slotId) => {
    const slot = getSlotById(slotId);
    if (!slot) return null;

    const selectedId = state.selectedCandidates[slotId];
    const found = slot.candidates.find((c) => c.id === selectedId);
    return found || slot.candidates[0] || null;
  };

  // Navigation Helpers: Candidate Next/Prev
  const getNextCandidate = (slotId, currentCandidateId) => {
    const slot = getSlotById(slotId);
    if (!slot || !slot.candidates || slot.candidates.length === 0) return null;
    const currentIndex = slot.candidates.findIndex((c) => c.id === currentCandidateId);
    const nextIndex = (currentIndex + 1) % slot.candidates.length;
    return slot.candidates[nextIndex];
  };

  const getPrevCandidate = (slotId, currentCandidateId) => {
    const slot = getSlotById(slotId);
    if (!slot || !slot.candidates || slot.candidates.length === 0) return null;
    const currentIndex = slot.candidates.findIndex((c) => c.id === currentCandidateId);
    const prevIndex = (currentIndex - 1 + slot.candidates.length) % slot.candidates.length;
    return slot.candidates[prevIndex];
  };

  // Navigation Helpers: Slot Next/Prev
  const getNextSlot = (currentSlotId) => {
    const currentIndex = CANDIDATE_REGISTRY.findIndex((s) => s.slotId === currentSlotId);
    if (currentIndex === -1) return CANDIDATE_REGISTRY[0];
    const nextIndex = (currentIndex + 1) % CANDIDATE_REGISTRY.length;
    return CANDIDATE_REGISTRY[nextIndex];
  };

  const getPrevSlot = (currentSlotId) => {
    const currentIndex = CANDIDATE_REGISTRY.findIndex((s) => s.slotId === currentSlotId);
    if (currentIndex === -1) return CANDIDATE_REGISTRY[CANDIDATE_REGISTRY.length - 1];
    const prevIndex = (currentIndex - 1 + CANDIDATE_REGISTRY.length) % CANDIDATE_REGISTRY.length;
    return CANDIDATE_REGISTRY[prevIndex];
  };

  // Check if all slots have a selected candidate
  const isAllFavoritesPicked = CANDIDATE_REGISTRY.every((slot) => !!state.selectedCandidates[slot.slotId]);

  // Generate Developer Hand-Off Markdown Report
  const generateDeveloperReportMarkdown = () => {
    const dateStr = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    let md = `# Old Northmen's Mead — Developer Image Production Hand-off Report\n`;
    md += `**Generated At:** ${dateStr}\n`;
    md += `**Status:** All ${CANDIDATE_REGISTRY.length} Placeholder Favorites Confirmed\n\n`;
    md += `---\n\n`;
    md += `## 📋 Selected Production Image Manifest\n\n`;
    md += `| Slot ID | Page | Target Specs | Selected Solid Filename | Title / Style | Rating | Reviewer Feedback |\n`;
    md += `|---|---|---|---|---|---|---|\n`;

    CANDIDATE_REGISTRY.forEach((slot) => {
      const selectedId = state.selectedCandidates[slot.slotId];
      const candidate = slot.candidates.find((c) => c.id === selectedId) || slot.candidates[0];
      const ratingStars = state.ratings[candidate?.id] ? '★'.repeat(state.ratings[candidate?.id]) : 'Unrated';
      const feedback = state.feedbackNotes[candidate?.id] || 'No specific notes';

      md += `| \`${slot.slotId}\` | ${slot.page} | ${slot.targetWidth}x${slot.targetHeight} (${slot.aspectRatio}) | \`${candidate?.filename}\` | ${candidate?.title} | ${ratingStars} | ${feedback.replace(/\n/g, ' ')} |\n`;
    });

    md += `\n---\n\n`;
    md += `## 💻 Developer Integration Code Snippet\n\n`;
    md += `Replace temporary placeholder mappings in \`src/data/candidateRegistry.js\` or production asset aliases:\n\n`;
    md += `\`\`\`js\n`;
    md += `export const PRODUCTION_IMAGES = {\n`;
    CANDIDATE_REGISTRY.forEach((slot) => {
      const selectedId = state.selectedCandidates[slot.slotId];
      const candidate = slot.candidates.find((c) => c.id === selectedId) || slot.candidates[0];
      md += `  ${slot.slotId}: 'assets/candidates/${slot.slotId}/${candidate?.filename}', // ${candidate?.title}\n`;
    });
    md += `};\n`;
    md += `\`\`\`\n\n`;

    md += `---\n\n`;
    md += `## 🔍 Comprehensive Candidate Evaluation Summary\n\n`;

    CANDIDATE_REGISTRY.forEach((slot) => {
      md += `### Slot: \`${slot.slotId}\` (${slot.slotName})\n`;
      md += `- **Page:** ${slot.page}\n`;
      md += `- **Dimensions:** ${slot.targetWidth}px x ${slot.targetHeight}px (${slot.aspectRatio})\n`;
      md += `- **Description:** ${slot.description}\n`;
      if (state.slotFeedback[slot.slotId]) {
        md += `- **General Slot Note:** ${state.slotFeedback[slot.slotId]}\n`;
      }
      md += `\n**Candidate Options Review:**\n`;
      slot.candidates.forEach((cand) => {
        const isFav = cand.id === state.selectedCandidates[slot.slotId];
        const r = state.ratings[cand.id] ? `${state.ratings[cand.id]}/5 Stars` : 'No rating';
        const notes = state.feedbackNotes[cand.id] || 'None';
        md += `- ${isFav ? '🏆 **[FAVORITE]**' : '▫️'} \`${cand.filename}\` — *${cand.title}* (${r})\n`;
        md += `  - *Notes:* ${notes}\n`;
      });
      md += `\n`;
    });

    return md;
  };

  const downloadDeveloperReportMarkdown = () => {
    const mdContent = generateDeveloperReportMarkdown();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', url);
    downloadAnchor.setAttribute('download', `ONM_Developer_Hand-off_Report_${new Date().toISOString().slice(0, 10)}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportReviewSummary = () => {
    const reportData = CANDIDATE_REGISTRY.map((slot) => {
      const selectedId = state.selectedCandidates[slot.slotId];
      const selectedCandidate = slot.candidates.find((c) => c.id === selectedId) || slot.candidates[0];

      return {
        slotId: slot.slotId,
        slotName: slot.slotName,
        page: slot.page,
        targetSpecs: `${slot.targetWidth}x${slot.targetHeight} (${slot.aspectRatio})`,
        selectedFavorite: {
          id: selectedCandidate?.id,
          solidFilename: selectedCandidate?.filename,
          title: selectedCandidate?.title,
          rating: state.ratings[selectedCandidate?.id] || 'Not rated',
          feedback: state.feedbackNotes[selectedCandidate?.id] || 'No feedback provided',
        },
        slotGeneralFeedback: state.slotFeedback[slot.slotId] || '',
        allCandidatesReview: slot.candidates.map((cand) => ({
          id: cand.id,
          solidFilename: cand.filename,
          title: cand.title,
          isFavorite: cand.id === selectedId,
          rating: state.ratings[cand.id] || 0,
          feedback: state.feedbackNotes[cand.id] || '',
        })),
      };
    });

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({ exportedAt: new Date().toISOString(), reviews: reportData }, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `ONM_Developer_Image_Manifest_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <ImageReviewerContext.Provider
      value={{
        selectedCandidates: state.selectedCandidates,
        ratings: state.ratings,
        feedbackNotes: state.feedbackNotes,
        slotFeedback: state.slotFeedback,
        reviewerModeActive: state.reviewerModeActive,
        isAllFavoritesPicked,
        selectCandidate,
        setCandidateRating,
        setCandidateFeedback,
        setSlotFeedback,
        toggleReviewerMode,
        resetReviewerState,
        getActiveCandidate,
        getNextCandidate,
        getPrevCandidate,
        getNextSlot,
        getPrevSlot,
        generateDeveloperReportMarkdown,
        downloadDeveloperReportMarkdown,
        exportReviewSummary,
      }}
    >
      {children}
    </ImageReviewerContext.Provider>
  );
};

export const useImageReviewer = () => {
  const context = useContext(ImageReviewerContext);
  if (!context) {
    throw new Error('useImageReviewer must be used within an ImageReviewerProvider');
  }
  return context;
};
