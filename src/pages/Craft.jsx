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

const Craft = () => {
  return (
    <div className="flex flex-col w-full bg-[#1c1a17]">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-screen md:min-h-[110vh] w-full flex items-center justify-start bg-[#1c1a17] overflow-hidden pb-32">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            src={`${import.meta.env.BASE_URL}assets/craft_hero.png`}
            alt="Craft Hero Background" 
            className="w-full h-[75vh] md:h-[80vh] object-cover object-top opacity-90" 
          />

          {/* Reusable Extension Placeholder Component */}
          <ImageExtensionPlaceholder 
            targetWidth={1920}
            targetHeight={1080}
            aspectRatio="16:9"
            description="Required Full-Width Craft Hero Banner Artwork"
            className="absolute bottom-0 left-0 right-0 h-[35vh]"
          />

          {/* Dual opacity gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1a17] via-[#1c1a17]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-[#1c1a17]/60 pointer-events-none" />
        </div>

        <div className="relative z-10 p-8 md:p-24 max-w-5xl">
          <FadeInUp delay={0.2}>
            <h3 className="text-[#c69f69] tracking-[0.3em] text-lg md:text-xl font-bold mb-4 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] flex items-center gap-3">
              <span className="w-8 h-[2px] bg-[#c69f69] inline-block"></span>
              THE CRAFT
            </h3>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-extrabold text-[#e6dfcc] leading-none mb-8 tracking-tighter drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
              TRADITION<br/>POURED
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* Organic Norse Divider */}
      <NorseSectionDivider />

      {/* 2. Content 1 Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden border-b-[8px] border-[#1c1a17] py-12 md:py-0">
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/craft_content1.png`} 
             alt="Crafting Process" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1200}
             aspectRatio="1:1"
             description="60% Width Crafting Process Artwork"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
        
        {/* 40% Width Text Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-8 leading-none">HONORING<br/>THE OLD WAYS</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-xl md:text-2xl text-[#1c1a17] font-medium leading-relaxed mb-8">
               We begin with the purest ingredients, seeking out the finest honey, crisp water, and select herbs. The process is unhurried, respecting the natural transformation that has been practiced for centuries.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-lg md:text-xl text-[#c69f69] font-bold tracking-widest uppercase">
               Our Meadowsweet is carefully infused, bringing a delicate balance and an essential connection to the earth.
             </p>
           </FadeInUp>
        </div>
      </section>

      {/* 3. Content 2 Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row-reverse items-center bg-[#1c1a17] overflow-hidden py-12 md:py-0">
        {/* 60% Width Image Container */}
        <div className="w-full md:w-[60%] h-full min-h-[60vh] flex flex-col items-center justify-center p-8 relative">
           <img 
             src={`${import.meta.env.BASE_URL}assets/craft_content2.png`} 
             alt="Crafting Tools" 
             className="max-h-[70vh] w-auto object-contain drop-shadow-2xl mb-6" 
           />
           <ImageExtensionPlaceholder 
             targetWidth={1200}
             targetHeight={1600}
             aspectRatio="3:4"
             description="60% Width Crafting Tools & Fermentation Artwork"
             className="w-full max-w-xl rounded-xl shadow-xl"
           />
        </div>
        
        {/* 40% Width Text Container */}
        <div className="w-full md:w-[40%] p-10 md:p-20 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#e6dfcc] mb-8 leading-none">FORGED THROUGH<br/>NECESSITY</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-xl md:text-2xl text-[#e6dfcc] font-medium leading-relaxed mb-8">
               Patience is our primary tool. We do not rush the fermentation, allowing the complex flavor profiles to develop fully.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-lg md:text-xl text-[#c69f69] font-bold tracking-widest uppercase">
               The result is a mead that stands the test of time—a drink worthy of the hall, meant to be shared in good company.
             </p>
           </FadeInUp>
        </div>
      </section>
      
      {/* 4. Bottom Panoramic Image Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center bg-[#d8cfaa] overflow-hidden py-16">
         <div className="w-full h-full min-h-screen flex flex-col items-center justify-center p-8 max-w-7xl">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5 }}
              src={`${import.meta.env.BASE_URL}assets/craft_content3.png`}
              alt="Mead Hall" 
              className="max-w-full max-h-[70vh] object-contain drop-shadow-2xl mb-8" 
            />
            <ImageExtensionPlaceholder 
              targetWidth={1920}
              targetHeight={1080}
              aspectRatio="16:9"
              description="Panoramic Mead Hall Interior Artwork"
              className="w-full max-w-4xl rounded-xl shadow-xl"
            />
         </div>
      </section>

    </div>
  );
};

export default Craft;
