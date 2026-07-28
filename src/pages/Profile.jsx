import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMixedBox } from '../context/MixedBoxContext';

const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const flavorData = {
  'apple-spiced': {
    id: 'apple-spiced',
    title: 'Apple-Spiced',
    subtitle: 'Illuminates.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of AppleSpiced Bottle.png',
    description: 'A warm, inviting blend that illuminates the spirit. Crisp orchard apples meld with traditional cinnamon, clove, and Meadowsweet.',
    color: '#b95133',
    abv: '14.5%',
    sweetness: 'Semi-Sweet',
    barrel: 'Toasted French Oak',
    notes: ['Crisp Apple', 'Cinnamon Bark', 'Wild Honey', 'Meadowsweet Bloom'],
    pairings: ['Roasted Pork', 'Aged Cheddar', 'Spiced Honey Cakes'],
  },
  'herbal': {
    id: 'herbal',
    title: 'Herbal',
    subtitle: 'Restores.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Herbal Bottle.png',
    description: 'A restorative infusion of earth and meadow. Grounding, pure, and deeply connected to ancient botanical traditions.',
    color: '#5c6c4c',
    abv: '13.8%',
    sweetness: 'Off-Dry',
    barrel: 'Neutral Slavonian Oak',
    notes: ['Meadowsweet', 'Wild Sage', 'Pine Resin', 'Goldenrod Honey'],
    pairings: ['Wild Game', 'Herb Crust Goat Cheese', 'Roasted Root Vegetables'],
  },
  'holiday-spiced': {
    id: 'holiday-spiced',
    title: 'Holiday-Spiced',
    subtitle: 'Reflects.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Holiday-Spiced Bottle.png',
    description: 'A festive reflection of the winter solstice. Rich, complex, and crafted for sacred moments of shared joy.',
    color: '#8b2b2d',
    abv: '15.2%',
    sweetness: 'Sweet Reserve',
    barrel: 'Charred American Oak',
    notes: ['Star Anise', 'Orange Peel', 'Dark Forest Honey', 'Nutmeg'],
    pairings: ['Venison Stew', 'Dark Chocolate', 'Solstice Feasts'],
  },
  'oak-n-orange': {
    id: 'oak-n-orange',
    title: 'Oak-N-Orange',
    subtitle: 'Welcomes.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of OakNOrange Bottle.png',
    description: 'A welcoming expression where bright citrus zest meets the sturdy, rounded depth of white oak aging.',
    color: '#d27c2f',
    abv: '14.0%',
    sweetness: 'Semi-Dry',
    barrel: 'Heavy Toasted White Oak',
    notes: ['Blood Orange Zest', 'Vanilla Oak', 'Raw Blossom Honey', 'Caramel'],
    pairings: ['Smoked Salmon', 'Hard Alpine Cheeses', 'Tarte Tatin'],
  },
  'odrerir': {
    id: 'odrerir',
    title: 'Óðrerir',
    subtitle: 'Inspires.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Odrerir Bottle.png',
    description: 'The legendary draught of poetry and wisdom. A masterful, unadulterated classic mead of raw honey and pure Meadowsweet.',
    color: '#c69f69',
    abv: '16.0%',
    sweetness: 'Classic Traditional',
    barrel: 'Heritage Oak Casks',
    notes: ['Pure Raw Honey', 'Meadowsweet Nectar', 'Golden Amber', 'Elderflower'],
    pairings: ['Feast Roasts', 'Smoked Meats', 'Hall Celebrations'],
  }
};

const Profile = () => {
  const { flavor } = useParams();
  const data = flavorData[flavor] || flavorData['odrerir'];
  const currentKey = flavorData[flavor] ? flavor : 'odrerir';

  const { addToBox } = useMixedBox();

  // Builder & Sensory State
  const [activeNote, setActiveNote] = useState(null);
  const [activePairing, setActivePairing] = useState(null);
  const [honeyBase, setHoneyBase] = useState('Raw Wildflower');
  const [infusionLevel, setInfusionLevel] = useState('Traditional');
  const [bottleCount, setBottleCount] = useState(1);
  const [crateOption, setCrateOption] = useState(true);
  const [isProcured, setIsProcured] = useState(false);

  const handleProcure = () => {
    setIsProcured(true);
    setTimeout(() => setIsProcured(false), 4000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1c1a17]">
      
      {/* 1. Top Builder & Expression Navigation Bar */}
      <div className="sticky top-0 z-40 w-full bg-[#161412]/95 backdrop-blur-md border-b border-[#c69f69]/30 px-6 py-4 flex flex-wrap items-center justify-between gap-4 font-['Oswald']">
        
        {/* Expression Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <span className="text-xs text-[#c69f69] uppercase tracking-widest mr-2 font-semibold">EXPRESSIONS:</span>
          {Object.keys(flavorData).map((key) => {
            const isSelected = key === currentKey;
            return (
              <Link
                key={key}
                to={`/profile/${key}`}
                className={`px-3 py-1.5 rounded-md text-sm uppercase tracking-wider transition-all duration-300 ${
                  isSelected
                    ? 'bg-[#c69f69] text-[#1c1a17] font-bold shadow-lg'
                    : 'text-[#e6dfcc]/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {flavorData[key].title}
              </Link>
            );
          })}
        </div>

        {/* Section Quick Jump Links */}
        <div className="flex items-center gap-4 md:gap-6 text-xs text-[#c69f69] tracking-widest uppercase">
          <button onClick={() => scrollToSection('overview')} className="hover:text-white transition-colors cursor-pointer">Overview</button>
          <button onClick={() => scrollToSection('flavor-profile')} className="hover:text-white transition-colors cursor-pointer">Flavor Notes</button>
          <button onClick={() => scrollToSection('builder')} className="hover:text-white transition-colors cursor-pointer">Batch Builder</button>
          <button onClick={() => scrollToSection('procure')} className="hover:text-white transition-colors cursor-pointer">Procure</button>
        </div>
      </div>

      {/* Procure Confirmation Alert Banner */}
      {isProcured && (
        <div className="fixed bottom-8 right-8 z-50 bg-[#c69f69] text-[#1c1a17] px-6 py-4 rounded-xl shadow-2xl font-['Oswald'] tracking-wider uppercase flex items-center gap-4 animate-bounce">
          <span className="text-2xl">⚔️</span>
          <div>
            <p className="font-bold text-lg">Batch Requested!</p>
            <p className="text-xs">Your procurement request for {data.title} ({bottleCount} Bottle{bottleCount > 1 ? 's' : ''}) has been logged in the Mead Hall.</p>
          </div>
        </div>
      )}

      {/* 2. Hero Expression Section */}
      <section id="overview" className="relative min-h-screen flex flex-col md:flex-row items-center justify-center border-b-[8px] border-[#c69f69]/20 overflow-hidden py-16">
        
        {/* Left Bottle Display with Aura Glow */}
        <div className="w-full md:w-1/2 flex justify-center p-8 md:p-16">
           <div className="relative">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: 0.35, scale: 1.4 }}
                 transition={{ duration: 1.5 }}
                 className="absolute inset-0 rounded-full blur-3xl transform"
                 style={{ backgroundColor: data.color }}
              />
              <motion.img 
                key={data.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src={data.bottleImg} 
                alt={data.title} 
                className="relative z-10 max-h-[75vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]" 
              />
           </div>
        </div>

        {/* Right Expression Details */}
        <div className="w-full md:w-1/2 max-w-2xl p-8 md:p-16">
           <FadeInUp delay={0.1}>
             <div className="flex items-center gap-3 mb-4">
               <span className="w-8 h-[2px] bg-[#c69f69]"></span>
               <h3 className="text-[#c69f69] tracking-widest text-lg font-semibold uppercase">MEAD HALL EXPRESSION</h3>
             </div>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <h1 className="text-6xl md:text-8xl font-bold text-[#e6dfcc] leading-none mb-4 uppercase">{data.title}</h1>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <h2 className="text-3xl md:text-5xl font-['Oswald'] mb-8" style={{ color: data.color }}>{data.subtitle}</h2>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <p className="font-['Inter'] text-xl md:text-2xl text-[#e6dfcc]/90 leading-relaxed mb-10">
               {data.description}
             </p>
           </FadeInUp>

           {/* Quick Stats Badges */}
           <FadeInUp delay={0.8}>
             <div className="grid grid-cols-3 gap-4 mb-10 text-center font-['Oswald']">
               <div className="bg-[#161412] p-4 rounded-xl border border-[#c69f69]/30">
                 <p className="text-xs text-[#c69f69] uppercase tracking-wider">ALC BY VOL</p>
                 <p className="text-2xl text-[#e6dfcc] font-bold mt-1">{data.abv}</p>
               </div>
               <div className="bg-[#161412] p-4 rounded-xl border border-[#c69f69]/30">
                 <p className="text-xs text-[#c69f69] uppercase tracking-wider">PROFILE</p>
                 <p className="text-xl text-[#e6dfcc] font-bold mt-1">{data.sweetness}</p>
               </div>
               <div className="bg-[#161412] p-4 rounded-xl border border-[#c69f69]/30">
                 <p className="text-xs text-[#c69f69] uppercase tracking-wider">OAK CASKS</p>
                 <p className="text-sm text-[#e6dfcc] font-bold mt-2 truncate">{data.barrel}</p>
               </div>
             </div>
           </FadeInUp>

           {/* Primary Procure CTA */}
           <FadeInUp delay={0.9}>
             <button
               onClick={handleProcure}
               className="w-full bg-[#c69f69] text-[#1c1a17] px-10 py-5 font-['Oswald'] tracking-widest text-xl uppercase font-bold hover:bg-[#e6dfcc] transition-colors shadow-2xl flex items-center justify-center gap-4 rounded-xl"
             >
               <span>Procure {data.title} Mead</span>
               <span className="text-2xl">&rarr;</span>
             </button>
           </FadeInUp>
        </div>
      </section>

      {/* 3. Flavor Notes, Sensory Meters & Pairings Section */}
      <section id="flavor-profile" className="relative min-h-[70vh] flex flex-col items-center justify-center p-8 md:p-24 bg-[#161412] border-b-[8px] border-[#1c1a17]">
         <div className="max-w-6xl w-full">
            <FadeInUp delay={0.1}>
              <div className="text-center mb-12">
                <h4 className="text-[#c69f69] tracking-widest font-semibold text-sm md:text-base uppercase mb-2">SENSORY EVALUATION</h4>
                <h2 className="text-4xl md:text-6xl font-bold text-[#e6dfcc] uppercase tracking-widest font-['Oswald']">
                  Flavor Profile & Feast Pairings
                </h2>
              </div>
            </FadeInUp>

            {/* Sensory Intensity Progress Meters */}
            <FadeInUp delay={0.2}>
              <div className="bg-[#1c1a17] p-8 rounded-2xl border border-[#c69f69]/40 mb-12 font-['Oswald']">
                <h3 className="text-xl text-[#c69f69] uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span>🍷</span> Sensory Profile Metrics ({data.title})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <div className="flex justify-between text-xs text-[#e6dfcc] uppercase mb-1">
                      <span>Honey Sweetness</span>
                      <span className="text-[#c69f69] font-bold">75%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-[#c69f69]/30">
                      <div className="h-full bg-gradient-to-r from-[#c69f69] to-[#e6dfcc] w-[75%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#e6dfcc] uppercase mb-1">
                      <span>Oak Cask Depth</span>
                      <span className="text-[#c69f69] font-bold">85%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-[#c69f69]/30">
                      <div className="h-full bg-gradient-to-r from-[#c69f69] to-[#e6dfcc] w-[85%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#e6dfcc] uppercase mb-1">
                      <span>Botanical Herb Notes</span>
                      <span className="text-[#c69f69] font-bold">90%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-[#c69f69]/30">
                      <div className="h-full bg-gradient-to-r from-[#c69f69] to-[#e6dfcc] w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs text-[#e6dfcc] uppercase mb-1">
                      <span>Spice Finish</span>
                      <span className="text-[#c69f69] font-bold">80%</span>
                    </div>
                    <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-[#c69f69]/30">
                      <div className="h-full bg-gradient-to-r from-[#c69f69] to-[#e6dfcc] w-[80%]" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Key Flavor Notes */}
               <FadeInUp delay={0.3}>
                 <div className="bg-[#1c1a17] p-8 rounded-2xl border border-[#c69f69]/40 h-full flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-['Oswald'] text-[#c69f69] uppercase tracking-wider mb-6 flex items-center gap-3">
                       <span>🌿</span> Key Tasting Notes
                     </h3>
                     <p className="text-xs text-[#e6dfcc]/70 mb-4 font-['Inter']">Click any tasting note below to explore aroma characteristics:</p>
                     <div className="flex flex-wrap gap-3">
                       {data.notes.map((note, i) => {
                         const isSelected = activeNote === note;
                         return (
                           <button
                             key={i}
                             onClick={() => setActiveNote(isSelected ? null : note)}
                             className={`px-4 py-2.5 rounded-xl text-sm font-['Oswald'] uppercase tracking-wider border transition-all ${
                               isSelected
                                 ? 'bg-[#c69f69] text-[#1c1a17] font-bold border-[#c69f69] shadow-lg scale-105'
                                 : 'bg-[#161412] text-[#e6dfcc] border-[#c69f69]/40 hover:border-[#c69f69] hover:text-white'
                             }`}
                           >
                             {note} {isSelected ? '✓' : ''}
                           </button>
                         );
                       })}
                     </div>
                   </div>

                   {activeNote && (
                     <div className="mt-6 p-4 rounded-xl bg-[#161412] border border-[#c69f69]/50 text-xs font-['Inter'] text-[#e6dfcc] animate-fadeIn">
                       <p className="font-bold text-[#c69f69] uppercase mb-1">Aroma Profile: {activeNote}</p>
                       <p>Delivers a prominent, rich bouquet on the palate that enhances the heritage character of {data.title}.</p>
                     </div>
                   )}
                 </div>
               </FadeInUp>

               {/* Recommended Food Pairings */}
               <FadeInUp delay={0.5}>
                 <div className="bg-[#1c1a17] p-8 rounded-2xl border border-[#c69f69]/40 h-full flex flex-col justify-between">
                   <div>
                     <h3 className="text-2xl font-['Oswald'] text-[#c69f69] uppercase tracking-wider mb-6 flex items-center gap-3">
                       <span>🥩</span> Recommended Feast Pairings
                     </h3>
                     <p className="text-xs text-[#e6dfcc]/70 mb-4 font-['Inter']">Select a culinary match for feast recommendations:</p>
                     <div className="space-y-3 font-['Inter'] text-sm text-[#e6dfcc]">
                       {data.pairings.map((pairing, i) => {
                         const isSelected = activePairing === pairing;
                         return (
                           <button
                             key={i}
                             onClick={() => setActivePairing(isSelected ? null : pairing)}
                             className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between font-['Oswald'] tracking-wider uppercase ${
                               isSelected
                                 ? 'bg-[#c69f69] text-[#1c1a17] font-bold border-[#c69f69] shadow-lg'
                                 : 'bg-[#161412] text-[#e6dfcc] border-[#c69f69]/30 hover:border-[#c69f69]'
                             }`}
                           >
                             <div className="flex items-center gap-3">
                               <span className="w-2.5 h-2.5 rounded-full bg-[#c69f69]" />
                               <span>{pairing}</span>
                             </div>
                             <span className="text-xs text-[#c69f69]">{isSelected ? 'Active Match' : 'Select'}</span>
                           </button>
                         );
                       })}
                     </div>
                   </div>

                   {activePairing && (
                     <div className="mt-6 p-4 rounded-xl bg-[#161412] border border-[#c69f69]/50 text-xs font-['Inter'] text-[#e6dfcc] animate-fadeIn">
                       <p className="font-bold text-[#c69f69] uppercase mb-1">Pairing Note: {activePairing}</p>
                       <p>The natural acidity and honey body of {data.title} harmonizes exquisitely with the rich flavors of {activePairing}.</p>
                     </div>
                   )}
                 </div>
               </FadeInUp>
            </div>
         </div>
      </section>

      {/* 4. Interactive Custom Mead Batch Builder Section */}
      <section id="builder" className="relative min-h-screen flex flex-col items-center justify-center p-8 md:p-24 bg-[#e6dfcc] border-b-[8px] border-[#1c1a17]">
         <div className="max-w-5xl w-full">
            <FadeInUp delay={0.1}>
              <div className="text-center mb-12">
                <h4 className="text-[#c69f69] tracking-widest font-semibold text-lg uppercase mb-2">CUSTOMIZE YOUR CELLAR BATCH</h4>
                <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] leading-none uppercase font-['Oswald']">
                  MEAD BUILDER
                </h2>
                <p className="text-lg text-[#1c1a17]/80 mt-4 max-w-2xl mx-auto font-['Inter']">
                  Customize your custom batch of {data.title}. Select raw honey origins, infusion intensity, and oak conditioning before procurement.
                </p>
              </div>
            </FadeInUp>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1c1a17] text-[#e6dfcc] p-8 md:p-12 rounded-3xl border-4 border-[#c69f69]/50 shadow-2xl">
               
               {/* Controls Column */}
               <div className="space-y-8 font-['Oswald']">
                  {/* Select Honey Base */}
                  <div>
                    <label className="block text-[#c69f69] uppercase tracking-wider text-sm mb-3">1. Select Raw Honey Base</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Raw Wildflower', 'Orange Blossom', 'Clover Nectar', 'Raw Meadow'].map((honey) => (
                        <button
                          key={honey}
                          onClick={() => setHoneyBase(honey)}
                          className={`p-3 rounded-lg text-sm uppercase tracking-wider border transition-all ${
                            honeyBase === honey
                              ? 'bg-[#c69f69] text-[#1c1a17] font-bold border-[#c69f69]'
                              : 'bg-[#161412] text-[#e6dfcc] border-[#c69f69]/30 hover:border-[#c69f69]'
                          }`}
                        >
                          {honey}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Select Infusion Intensity */}
                  <div>
                    <label className="block text-[#c69f69] uppercase tracking-wider text-sm mb-3">2. Meadowsweet & Herb Infusion</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Mild', 'Traditional', 'Reserve Strength'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setInfusionLevel(level)}
                          className={`p-3 rounded-lg text-sm uppercase tracking-wider border transition-all ${
                            infusionLevel === level
                              ? 'bg-[#c69f69] text-[#1c1a17] font-bold border-[#c69f69]'
                              : 'bg-[#161412] text-[#e6dfcc] border-[#c69f69]/30 hover:border-[#c69f69]'
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Wooden Crate */}
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[#c69f69] uppercase tracking-wider text-sm mb-3">3. Bottle Count</label>
                       <div className="flex items-center gap-3 bg-[#161412] p-2 rounded-lg border border-[#c69f69]/30">
                         <button
                           onClick={() => setBottleCount(Math.max(1, bottleCount - 1))}
                           className="w-10 h-10 rounded-lg bg-[#c69f69]/20 text-[#c69f69] font-bold text-xl hover:bg-[#c69f69] hover:text-[#1c1a17]"
                         >
                           -
                         </button>
                         <span className="text-xl font-bold text-center flex-1">{bottleCount}</span>
                         <button
                           onClick={() => setBottleCount(bottleCount + 1)}
                           className="w-10 h-10 rounded-lg bg-[#c69f69]/20 text-[#c69f69] font-bold text-xl hover:bg-[#c69f69] hover:text-[#1c1a17]"
                         >
                           +
                         </button>
                       </div>
                     </div>

                     <div>
                       <label className="block text-[#c69f69] uppercase tracking-wider text-sm mb-3">4. Packaging</label>
                       <button
                         onClick={() => setCrateOption(!crateOption)}
                         className={`w-full p-3 rounded-lg text-sm uppercase tracking-wider border transition-all ${
                           crateOption
                             ? 'bg-[#c69f69] text-[#1c1a17] font-bold border-[#c69f69]'
                             : 'bg-[#161412] text-[#e6dfcc] border-[#c69f69]/30'
                         }`}
                       >
                         {crateOption ? 'Wooden Crate' : 'Standard Box'}
                       </button>
                     </div>
                  </div>
               </div>

               {/* Live Summary Card */}
               <div className="bg-[#161412] p-8 rounded-2xl border border-[#c69f69]/40 flex flex-col justify-between font-['Inter']">
                  <div>
                    <h3 className="text-2xl font-['Oswald'] text-[#c69f69] uppercase tracking-wider mb-6 pb-4 border-b border-[#c69f69]/30">
                      Batch Summary
                    </h3>
                    <div className="space-y-4 text-base">
                      <div className="flex justify-between">
                        <span className="text-[#c69f69]">Expression:</span>
                        <span className="font-bold text-[#e6dfcc]">{data.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#c69f69]">Honey Origin:</span>
                        <span className="font-bold text-[#e6dfcc]">{honeyBase}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#c69f69]">Infusion:</span>
                        <span className="font-bold text-[#e6dfcc]">{infusionLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#c69f69]">Quantity:</span>
                        <span className="font-bold text-[#e6dfcc]">{bottleCount} Bottle{bottleCount > 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#c69f69]">Cask Conditioning:</span>
                        <span className="font-bold text-[#e6dfcc]">{data.barrel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={() =>
                        addToBox({
                          flavorKey: currentKey,
                          title: data.title,
                          bottleImg: data.bottleImg,
                          color: data.color,
                          honeyBase,
                          infusionLevel,
                          count: bottleCount,
                        })
                      }
                      className="w-full bg-[#c69f69] text-[#1c1a17] py-4 rounded-xl font-['Oswald'] text-lg font-bold uppercase tracking-widest hover:bg-[#e6dfcc] transition-colors shadow-lg flex items-center justify-center gap-2"
                    >
                      <span>📦</span>
                      <span>Add ({bottleCount}) to Mixed Box</span>
                    </button>

                    <button
                      onClick={handleProcure}
                      className="w-full bg-transparent text-[#e6dfcc] border border-[#c69f69]/60 py-3 rounded-xl font-['Oswald'] text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                      Procure {data.title} Batch Only
                    </button>
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* 5. Discover Other Expressions Section */}
      <section id="procure" className="relative min-h-[50vh] flex flex-col items-center justify-center p-16 bg-[#e6dfcc]">
         <FadeInUp delay={0.1}>
           <h2 className="text-4xl font-bold text-[#1c1a17] mb-8 uppercase tracking-widest font-['Oswald']">
             Explore Other Hall Expressions
           </h2>
         </FadeInUp>
         <FadeInUp delay={0.3}>
           <div className="flex flex-wrap justify-center gap-6">
             {Object.keys(flavorData).map((key) => {
               const isSelected = key === currentKey;
               return (
                 <Link 
                   key={key} 
                   to={`/profile/${key}`} 
                   onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                   className={`px-6 py-3 rounded-xl font-['Oswald'] text-lg uppercase tracking-widest border-2 transition-all ${
                     isSelected 
                       ? 'bg-[#1c1a17] text-[#c69f69] border-[#1c1a17]' 
                       : 'bg-transparent text-[#1c1a17] border-[#1c1a17]/40 hover:border-[#c69f69] hover:text-[#c69f69]'
                   }`}
                 >
                   {flavorData[key].title}
                 </Link>
               );
             })}
           </div>
         </FadeInUp>
      </section>

    </div>
  );
};

export default Profile;
