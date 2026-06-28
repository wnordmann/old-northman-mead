import { Link } from 'react-router-dom';
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

const Home = () => {
  return (
    <div className="flex flex-col w-full bg-[#1c1a17]">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-start bg-[#1c1a17] overflow-hidden">
        <div className="absolute top-0 right-0 h-full w-full md:w-2/3 z-0 flex justify-end">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            src="/assets/home_hero.png" 
            alt="Hero Background" 
            className="h-full object-cover opacity-80" 
          />
        </div>
        <div className="relative z-10 p-16 md:p-24 max-w-4xl bg-gradient-to-r from-[#1c1a17] via-[#1c1a17]/80 to-transparent">
          <FadeInUp delay={0.2}>
            <h3 className="text-[#c69f69] tracking-widest text-xl font-semibold mb-6 uppercase">WELCOME TO THE HALL</h3>
          </FadeInUp>
          <FadeInUp delay={0.4}>
            <h1 className="text-7xl md:text-9xl font-bold text-[#e6dfcc] leading-none mb-10 tracking-tighter">
              OLD NORTHMEN'S<br/>MEAD
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.6}>
            <p className="text-2xl md:text-3xl font-['Inter'] font-semibold text-[#c69f69] uppercase tracking-wide">
              Rooted in Heritage.<br/>Forged through necessity.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* 2. The Craft Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden border-b-[8px] border-[#1c1a17]">
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/home_craft.png" alt="Pouring Mead" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h4 className="text-[#c69f69] tracking-widest font-semibold mb-4 text-xl">THE CRAFT</h4>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <h2 className="text-6xl md:text-8xl font-bold text-[#1c1a17] mb-8 leading-none">TRADITION<br/>POURED.</h2>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-2xl text-[#1c1a17] font-medium leading-relaxed uppercase mb-12">
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
      <section className="relative min-h-screen w-full flex flex-col md:flex-row-reverse items-center bg-[#1c1a17] overflow-hidden border-b-[8px] border-[#c69f69]/20">
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/home_nature.png" alt="Meadowsweet" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center">
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
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#d8cfaa] overflow-hidden">
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/home_expressions.png" alt="The Founder" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
        
        <div className="w-full md:w-1/2 p-16 md:p-24 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-8 leading-none">THE FIVE<br/>EXPRESSIONS</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-xl text-[#1c1a17] mb-8 max-w-2xl leading-relaxed">
               Built upon one foundation of honey, water, yeast, and Meadowsweet, the Five Expressions reveal five distinct paths through the same tradition.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <ul className="font-['Inter'] text-2xl text-[#1c1a17] mb-12 space-y-4">
               <li><Link to="/profile/oak-n-orange" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Oak-N-Orange</strong> welcomes.</Link></li>
               <li><Link to="/profile/odrerir" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Óðrerir</strong> inspires.</Link></li>
               <li><Link to="/profile/herbal" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Herbal</strong> restores.</Link></li>
               <li><Link to="/profile/apple-spiced" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Apple-Spiced</strong> illuminates.</Link></li>
               <li><Link to="/profile/holiday-spiced" className="hover:text-[#c69f69] transition-colors"><strong className="text-[#c69f69]">Holiday-Spiced</strong> reflects.</Link></li>
             </ul>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <p className="font-['Inter'] text-xl text-[#1c1a17] mb-8 font-bold uppercase tracking-widest">
               Together they form the<br/>Mead Hall Collection.
             </p>
             <Link to="/profile/odrerir" className="text-[#1c1a17] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors flex items-center gap-4">
               Explore the Collection <span className="text-3xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
      </section>

      {/* 5. Shared Section */}
      <section className="relative min-h-screen w-full flex flex-col md:flex-row items-center bg-[#1c1a17] overflow-hidden border-t-8 border-[#c69f69]/20">
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center">
           <FadeInUp delay={0.1}>
             <h2 className="text-6xl md:text-8xl font-bold text-[#e6dfcc] mb-12 leading-none">MEAD IS MEANT<br/>TO BE SHARED.</h2>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <p className="font-['Inter'] text-2xl md:text-3xl text-[#c69f69] font-semibold leading-relaxed uppercase mb-16">
               Between friends.<br/>Between family.<br/>Between allies.<br/>In fellowship.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <Link to="#" className="inline-flex items-center gap-4 text-[#e6dfcc] text-2xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors">
               Join us at the Hall <span className="text-4xl">&rarr;</span>
             </Link>
           </FadeInUp>
        </div>
        
        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/home_shared.png" alt="Fellowship" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
      </section>

      {/* 6. Credo Section */}
      <section className="relative min-h-[80vh] w-full flex flex-col md:flex-row items-center bg-[#e6dfcc] overflow-hidden">
        
        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center text-left">
           <FadeInUp delay={0.1}>
             <h4 className="text-[#c69f69] tracking-widest font-semibold mb-6 text-xl">THE FOUNDER'S CREDO</h4>
           </FadeInUp>
           <FadeInUp delay={0.3}>
             <h2 className="text-5xl md:text-7xl font-bold text-[#1c1a17] mb-12 leading-tight">WE DO NOT SEEK GLORY.<br/>WE SEEK MEANING.</h2>
           </FadeInUp>
           <FadeInUp delay={0.5}>
             <p className="font-['Inter'] text-xl leading-relaxed uppercase text-[#c69f69] mb-12 font-semibold">
               The bond of Old Northmen's Mead.<br/>The hidden thread within.<br/>Strength behind the word.<br/>Honor in the harmony.
             </p>
           </FadeInUp>
           <FadeInUp delay={0.7}>
             <Link to="#" className="inline-flex items-center gap-4 text-[#1c1a17] text-xl font-bold tracking-widest uppercase hover:text-[#c69f69] transition-colors border-2 border-[#1c1a17] px-8 py-4">
               Read the Credo <span>&rarr;</span>
             </Link>
           </FadeInUp>
        </div>

        <div className="w-full md:w-1/2 h-full min-h-[50vh] flex items-center justify-center p-8">
           <img src="/assets/home_credo.png" alt="Credo Texture" className="max-h-[80vh] w-auto object-contain drop-shadow-2xl" />
        </div>
      </section>

    </div>
  );
};

export default Home;
