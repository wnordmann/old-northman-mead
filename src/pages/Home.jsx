import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ImageExtensionPlaceholder from '../components/ImageExtensionPlaceholder';
import NorseSectionDivider from '../components/NorseSectionDivider';

const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-[#1c1a17]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen md:min-h-[110vh] w-full flex items-center justify-start bg-[#1c1a17] overflow-hidden pb-32">
        {/* Full-width hero image background (Mead Hall Scene) */}
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src={`${import.meta.env.BASE_URL}assets/home_hero.png`}
            alt="Hero Mead Hall Background" 
            className="w-full h-[75vh] md:h-[80vh] object-cover object-top opacity-90" 
          />
          
          {/* Reusable Extension Placeholder Component */}
          <ImageExtensionPlaceholder 
            targetWidth={1920}
            targetHeight={1080}
            aspectRatio="16:9"
            description="Required Full-Width Canvas Height for Artist Artwork"
            className="absolute bottom-0 left-0 right-0 h-[35vh]"
          />

          {/* Dual opacity gradient overlays for contrast & legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1a17] via-[#1c1a17]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#1c1a17]/60 pointer-events-none" />
        </div>

        {/* Text Content Overlay */}
        <div className="relative z-10 p-8 md:p-24 max-w-5xl">
          <FadeInUp delay={0.2}>
            <h3 className="text-[#c69f69] tracking-[0.3em] text-lg md:text-xl font-bold mb-4 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#c69f69] inline-block"></span>
              WELCOME TO THE HALL
            </h3>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-[#e6dfcc] leading-none mb-8 tracking-tighter drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
              OLD NORTHMEN'S<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e6dfcc] via-[#c69f69] to-[#e6dfcc]">
                MEAD
              </span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.6}>
            <p className="text-xl md:text-3xl font-['Inter'] font-semibold text-[#c69f69] uppercase tracking-wider drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] max-w-2xl border-l-4 border-[#c69f69] pl-6 py-2 bg-black/30 backdrop-blur-sm rounded-r-lg">
              Rooted in Heritage.<br/>Forged through necessity.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* Creative Organic Norse Divider Seal */}
      <NorseSectionDivider />

      {/* 2. The Craft Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden border-b-[8px] border-[#1c1a17] py-12 md:py-0">
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/home_craft.png`} 
             alt="Pouring Mead" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           {/* Placeholder Overlay for 60% Section Artwork */}
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Section Craft Artwork Graphic"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
        
        {/* 40% Width Text Content Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h4 className="text-[#c69f69] tracking-widest font-semibold mb-4 text-xl">THE CRAFT</h4>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-8 leading-none">TRADITION<br/>POURED.</h2>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-xl md:text-2xl text-[#1c1a17] font-medium leading-relaxed uppercase mb-12">
               Mead born from<br/>nature's finest<br/>and time-honored<br/>practices.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <Link to="/craft" className="text-[#1c1a17] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors flex items-center gap-4">
               Explore the Craft <span className="text-3xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
      </section>

      {/* 3. Nature's Gift Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row-reverse items-center bg-[#1c1a17] overflow-hidden border-b-[8px] border-[#c69f69]/20 py-12 md:py-0">
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/home_nature.png`} 
             alt="Meadowsweet" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           {/* Placeholder Overlay for 60% Botanical Artwork */}
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Section Botanical Artwork Graphic"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
        
        {/* 40% Width Text Content Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-6xl md:text-8xl font-bold text-[#e6dfcc] mb-8 leading-none">NATURE'S<br/>GIFT.</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-2xl text-[#c69f69] font-medium leading-relaxed uppercase mb-6">
               Meadowsweet<br/>at our core.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-2xl text-[#e6dfcc] font-medium leading-relaxed uppercase mb-12">
               Pure. Delicate.<br/>Essential.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <Link to="/craft" className="text-[#e6dfcc] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors flex items-center gap-4">
               Our Ingredients <span className="text-3xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
      </section>

      {/* 4. The Five Expressions Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#d8cfaa] overflow-hidden py-12 md:py-0">
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/home_expressions.png`} 
             alt="The Founder" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           {/* Placeholder Overlay for 60% Artwork */}
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Section Five Expressions Artwork Graphic"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
        
        {/* 40% Width Text Content Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-8 leading-none">THE FIVE<br/>EXPRESSIONS</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-xl text-[#1c1a17] mb-8 max-w-2xl leading-relaxed">
               Built upon one foundation of honey, water, yeast, and Meadowsweet, the Five Expressions reveal five distinct paths through the same tradition.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <ul className="font-['Inter'] text-xl md:text-2xl text-[#1c1a17] mb-12 space-y-4">
               <li><Link to="/profile/oak-n-orange" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Oak-N-Orange</strong> welcomes.</Link></li>
               <li><Link to="/profile/odrerir" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Óðrerir</strong> inspires.</Link></li>
               <li><Link to="/profile/herbal" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Herbal</strong> restores.</Link></li>
               <li><Link to="/profile/apple-spiced" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Apple-Spiced</strong> illuminates.</Link></li>
               <li><Link to="/profile/holiday-spiced" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Holiday-Spiced</strong> reflects.</Link></li>
             </ul>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <p className="font-['Inter'] text-lg md:text-xl text-[#1c1a17] mb-8 font-bold uppercase tracking-widest">
               Together they form the<br/>Mead Hall Collection.
             </p>
             <Link to="/profile/odrerir" className="text-[#1c1a17] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors flex items-center gap-4">
               Explore the Collection <span className="text-3xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
      </section>

      {/* 5. Shared Section */}
      <section id="fellowship" className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#1c1a17] overflow-hidden border-t-8 border-[#c69f69]/20 py-12 md:py-0">
        {/* 40% Width Text Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#e6dfcc] mb-12 leading-none">MEAD IS MEANT<br/>TO BE SHARED.</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-xl md:text-3xl text-[#c69f69] font-semibold leading-relaxed uppercase mb-16">
               Between friends.<br/>Between family.<br/>Between allies.<br/>In fellowship.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <Link to="#" className="inline-flex items-center gap-4 text-[#e6dfcc] text-xl md:text-2xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors">
               Join us at the Hall <span className="text-4xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
        
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/home_shared.png`} 
             alt="Fellowship" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           {/* Placeholder Overlay for 60% Fellowship Artwork */}
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Section Fellowship Artwork Graphic"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
      </section>

      {/* 6. Credo Section */}
      <section id="credo" className="relative min-h-[80vh] w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden py-12 md:py-0">
        {/* 40% Width Text Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center text-left">
           <FadeInUp delay={0.1}>
             <h4 className="text-[#c69f69] tracking-widest font-semibold mb-6 text-xl">THE FOUNDER'S CREDO</h4>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <h2 className="text-4xl md:text-6xl font-bold text-[#1c1a17] mb-12 leading-tight">WE DO NOT SEEK GLORY.<br/>WE SEEK MEANING.</h2>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-lg md:text-xl leading-relaxed uppercase text-[#c69f69] mb-12 font-semibold">
               The bond of Old Northmen's Mead.<br/>The hidden thread within.<br/>Strength behind the word.<br/>Honor in the harmony.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <Link to="#" className="inline-flex items-center gap-4 text-[#1c1a17] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors border-2 border-[#1c1a17] px-8 py-4">
               Read the Credo <span>&rarr;</span>
             </Link>
           </FadeInUp>
        </div>

        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/home_credo.png`} 
             alt="Credo Texture" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           {/* Placeholder Overlay for 60% Credo Artwork */}
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Section Credo Runic Texture Artwork"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
      </section>

    </div>
  );
};

export default Home;
