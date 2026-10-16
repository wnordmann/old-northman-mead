import { useState } from 'react';
import { useMixedBox } from '../context/MixedBoxContext';

const MixedBoxDrawer = () => {
  const { boxItems, removeFromBox, clearBox, totalBottles, isDrawerOpen, setIsDrawerOpen } = useMixedBox();
  const [isOrdered, setIsOrdered] = useState(false);
  const targetCapacity = totalBottles > 6 ? 12 : 6;
  const progressPercent = Math.min(100, Math.round((totalBottles / targetCapacity) * 100));

  const handleCheckout = () => {
    if (totalBottles === 0) return;
    setIsOrdered(true);
    setTimeout(() => {
      setIsOrdered(false);
      clearBox();
      setIsDrawerOpen(false);
    }, 4500);
  };

  return (
    <>
      {/* 1. Floating Sticky Box Badge Indicator */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="bg-[#161412] text-[#e6dfcc] border-2 border-[#c69f69] px-5 py-3 rounded-2xl shadow-2xl font-['Oswald'] tracking-wider uppercase flex items-center gap-3 hover:bg-[#c69f69] hover:text-[#161412] transition-all group"
        >
          <span className="text-2xl group-hover:scale-125 transition-transform">📦</span>
          <div className="text-left">
            <p className="text-xs text-[#c69f69] group-hover:text-[#161412] font-bold">MIXED CELLAR CRATE</p>
            <p className="text-sm font-extrabold">{totalBottles} / {targetCapacity} BOTTLES</p>
          </div>
          {totalBottles > 0 && (
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse ml-1" />
          )}
        </button>
      </div>

      {/* 2. Order Confirmation Toast */}
      {isOrdered && (
        <div className="fixed top-8 right-8 z-50 bg-[#c69f69] text-[#1c1a17] px-8 py-5 rounded-2xl shadow-2xl font-['Oswald'] tracking-wider uppercase flex items-center gap-4 animate-bounce">
          <span className="text-3xl">⚔️</span>
          <div>
            <p className="font-bold text-xl">Mixed Crate Order Placed!</p>
            <p className="text-xs font-['Inter']">Your custom {totalBottles}-bottle mixed mead crate request has been submitted to the cellar master.</p>
          </div>
        </div>
      )}

      {/* 3. Slide-Over Summary Drawer Overlay */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity">
          <div className="w-full max-w-md bg-[#161412] border-l-2 border-[#c69f69] h-full flex flex-col justify-between p-6 md:p-8 text-[#e6dfcc] font-['Inter'] shadow-2xl overflow-y-auto">
            
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#c69f69]/30">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">📦</span>
                  <div>
                    <h2 className="text-2xl font-bold font-['Oswald'] text-[#c69f69] uppercase tracking-wider">
                      Mixed Cellar Crate
                    </h2>
                    <p className="text-xs text-[#e6dfcc]/70">Curate your personalized mead selection</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="text-2xl text-[#c69f69] hover:text-white transition-colors p-2"
                >
                  ✕
                </button>
              </div>

              {/* Capacity Progress Bar */}
              <div className="my-6 p-4 rounded-xl bg-[#1c1a17] border border-[#c69f69]/30 font-['Oswald']">
                <div className="flex justify-between text-xs text-[#c69f69] uppercase tracking-wider mb-2 font-bold">
                  <span>CRATE FILL PROGRESS</span>
                  <span>{totalBottles} / {targetCapacity} BOTTLES</span>
                </div>
                <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden border border-[#c69f69]/20">
                  <div
                    className="h-full bg-gradient-to-r from-[#c69f69] via-[#e6dfcc] to-[#c69f69] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Box Items List */}
              <div className="space-y-4 my-6 max-h-[45vh] overflow-y-auto pr-2">
                {boxItems.length === 0 ? (
                  <div className="text-center py-12 text-[#e6dfcc]/50 font-['Oswald'] tracking-wider uppercase">
                    <p className="text-4xl mb-3">🏺</p>
                    <p className="text-lg">Your Mixed Crate is Empty</p>
                    <p className="text-xs text-[#c69f69] mt-1">Use "Add to Mixed Box" in the mead builder below to add expressions.</p>
                  </div>
                ) : (
                  boxItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-xl bg-[#1c1a17] border border-[#c69f69]/30 gap-4"
                    >
                      <img
                        src={item.bottleImg}
                        alt={item.title}
                        className="w-12 h-16 object-contain"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold font-['Oswald'] text-lg text-[#e6dfcc] uppercase">{item.title}</h4>
                        <p className="text-xs text-[#c69f69]">{item.honeyBase} • {item.infusionLevel}</p>
                        <p className="text-xs text-[#e6dfcc]/70 mt-1">Qty: <strong className="text-[#c69f69]">{item.count}</strong></p>
                      </div>
                      <button
                        onClick={() => removeFromBox(index)}
                        className="text-red-400 hover:text-red-300 p-2 text-lg transition-colors"
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Footer Summary Actions */}
            <div className="pt-6 border-t border-[#c69f69]/30 font-['Oswald'] space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-[#c69f69] uppercase tracking-wider font-bold">Total Mead Count:</span>
                <span className="text-2xl font-extrabold text-[#e6dfcc]">{totalBottles} Bottles</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={clearBox}
                  disabled={boxItems.length === 0}
                  className="w-1/3 py-3 rounded-xl border border-red-500/50 text-red-400 uppercase tracking-widest text-sm hover:bg-red-500/20 transition-all disabled:opacity-30"
                >
                  Clear
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={boxItems.length === 0}
                  className="w-2/3 py-3 rounded-xl bg-[#c69f69] text-[#1c1a17] font-bold uppercase tracking-widest text-lg hover:bg-[#e6dfcc] transition-all shadow-xl disabled:opacity-30"
                >
                  Procure Mixed Box
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default MixedBoxDrawer;
