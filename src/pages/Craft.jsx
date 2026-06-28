import { motion } from 'framer-motion';

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
      <section className="relative h-screen w-full flex items-center justify-start bg-[#1c1a17] overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-full md:w-2/3 z-0 flex justify-end">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/assets/craft_hero.png" 
            alt="Craft Hero Background" 
            className="h-full object-cover opacity-80" 
          />
        </div>
        <div className="relative z-10 p-16 md:p-24 max-w-4xl bg-gradient-to-r from-[#1c1a17] via-[#1c1a17]/80 to-transparent">
          <FadeInUp delay={0.2}>
            <h3 className="text-[#c69f69] tracking-widest text-xl font-semibold mb-6 uppercase">THE CRAFT</h3>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h1 className="text-7xl md:text-9xl font-bold text-[#e6dfcc] leading-none mb-10 tracking-tighter">
              TRADITION<br/>POURED
            </h1>
          </FadeInUp>
        </div>
      </section>

      {/* 2. Content 1 Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden border-b-[8px] border-[#1c1a17]">
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/craft_content1.png" alt="Crafting Process" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-8 leading-none">HONORING<br/>THE OLD WAYS</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-2xl text-[#1c1a17] font-medium leading-relaxed mb-8">
               We begin with the purest ingredients, seeking out the finest honey, crisp water, and select herbs. The process is unhurried, respecting the natural transformation that has been practiced for centuries.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-xl text-[#c69f69] font-bold tracking-widest uppercase">
               Our Meadowsweet is carefully infused, bringing a delicate balance and an essential connection to the earth.
             </p>
           </FadeInUp>
        </div>
      </section>

      {/* 3. Content 2 Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row-reverse items-center bg-[#1c1a17] overflow-hidden">
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/craft_content2.png" alt="Crafting Tools" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#e6dfcc] mb-8 leading-none">FORGED THROUGH<br/>NECESSITY</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-2xl text-[#e6dfcc] font-medium leading-relaxed mb-8">
               Patience is our primary tool. We do not rush the fermentation, allowing the complex flavor profiles to develop fully.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-xl text-[#c69f69] font-bold tracking-widest uppercase">
               The result is a mead that stands the test of time—a drink worthy of the hall, meant to be shared in good company.
             </p>
           </FadeInUp>
        </div>
      </section>
      
      {/* 4. Bottom Image Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center bg-[#d8cfaa] overflow-hidden">
         <div className="w-full h-full min-h-screen flex items-center justify-center p-16">
            <motion.img 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 1.5 }}
              src="/assets/craft_content3.png" 
              alt="Mead Hall" 
              className="max-w-full max-h-[90vh] object-contain drop-shadow-2xl" 
            />
         </div>
      </section>

    </div>
  );
};

export default Craft;
