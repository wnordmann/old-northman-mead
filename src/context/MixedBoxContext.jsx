import { createContext, useContext, useState, useEffect } from 'react';

const MixedBoxContext = createContext();

export const MixedBoxProvider = ({ children }) => {
  const [boxItems, setBoxItems] = useState(() => {
    try {
      const saved = localStorage.getItem('onm_mixed_box');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('onm_mixed_box', JSON.stringify(boxItems));
    } catch (e) {
      console.error(e);
    }
  }, [boxItems]);

  const addToBox = (newItem) => {
    setBoxItems((prev) => {
      // Check if identical item configuration exists
      const existingIndex = prev.findIndex(
        (item) =>
          item.flavorKey === newItem.flavorKey &&
          item.honeyBase === newItem.honeyBase &&
          item.infusionLevel === newItem.infusionLevel
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].count += newItem.count;
        return updated;
      }
      return [...prev, newItem];
    });
    setIsDrawerOpen(true);
  };

  const removeFromBox = (index) => {
    setBoxItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearBox = () => {
    setBoxItems([]);
  };

  const totalBottles = boxItems.reduce((acc, item) => acc + item.count, 0);

  return (
    <MixedBoxContext.Provider
      value={{
        boxItems,
        addToBox,
        removeFromBox,
        clearBox,
        totalBottles,
        isDrawerOpen,
        setIsDrawerOpen,
      }}
    >
      {children}
    </MixedBoxContext.Provider>
  );
};

export const useMixedBox = () => useContext(MixedBoxContext);
