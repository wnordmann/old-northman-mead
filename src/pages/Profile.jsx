import { useParams, Link } from 'react-router-dom';
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

const flavorData = {
  'apple-spiced': {
    title: 'Apple-Spiced',
    subtitle: 'Illuminates.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of AppleSpiced Bottle.png',
    description: 'A warm, inviting blend that illuminates the spirit. Crisp apple notes meld with traditional spices.',
    color: '#b95133'
  },
  'herbal': {
    title: 'Herbal',
    subtitle: 'Restores.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Herbal Bottle.png',
    description: 'A restorative infusion of earth and meadow. Grounding, pure, and deeply connected to nature.',
    color: '#5c6c4c'
  },
  'holiday-spiced': {
    title: 'Holiday-Spiced',
    subtitle: 'Reflects.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Holiday-Spiced Bottle.png',
    description: 'A festive reflection of the season. Rich, complex, and meant for moments of shared joy.',
    color: '#8b2b2d'
  },
  'oak-n-orange': {
    title: 'Oak-N-Orange',
    subtitle: 'Welcomes.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of OakNOrange Bottle.png',
    description: 'A welcoming expression where the bright zest of orange meets the sturdy depth of oak.',
    color: '#d27c2f'
  },
  'odrerir': {
    title: 'Óðrerir',
    subtitle: 'Inspires.',
    bottleImg: import.meta.env.BASE_URL + 'assets/bottles/Image of Odrerir Bottle.png',
    description: 'The legendary draught that inspires poetry and wisdom. A masterful, classic mead.',
    color: '#c69f69'
  }
};

const Profile = () => {
  const { flavor } = useParams();
  const data = flavorData[flavor] || flavorData['odrerir'];

  const otherFlavors = Object.keys(flavorData).filter(key => key !== flavor);

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#1c1a17]">
       {/* 1. Hero / Profile Section */}
       <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center border-b-[8px] border-[#c69f69]/20 overflow-hidden">
          
          <div className="w-full md:w-1/2 flex justify-center p-16">
             <div className="relative">
                <motion.div 
                   initial={{ opacity: 0, scale: 0.5 }}
                   whileInView={{ opacity: 0.2, scale: 1.5 }}
                   transition={{ duration: 1.5 }}
                   className="absolute inset-0 rounded-full blur-3xl transform"
                   style={{ backgroundColor: data.color }}
                />
                <motion.img 
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  src={data.bottleImg} 
                  alt={data.title} 
                  className="relative z-10 max-h-[80vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                />
             </div>
          </div>

          <div className="w-full md:w-1/2 max-w-2xl p-16 md:p-32">
             <FadeInUp delay={0.1}>
               <h3 className="text-[#c69f69] tracking-widest text-xl font-semibold mb-4 uppercase">THE FIVE EXPRESSIONS</h3>
             </FadeInUp>
             <FadeInUp delay={0.3}>
               <h1 className="text-6xl md:text-8xl font-bold text-[#e6dfcc] leading-none mb-6 uppercase">{data.title}</h1>
             </FadeInUp>
             <FadeInUp delay={0.5}>
               <h2 className="text-4xl md:text-5xl font-['Oswald'] mb-10" style={{ color: data.color }}>{data.subtitle}</h2>
             </FadeInUp>
             <FadeInUp delay={0.7}>
               <p className="font-['Inter'] text-2xl text-[#e6dfcc] leading-relaxed mb-16">
                 {data.description}
               </p>
             </FadeInUp>
             <FadeInUp delay={0.9}>
               <button className="bg-transparent text-[#e6dfcc] px-10 py-5 font-['Oswald'] tracking-widest text-xl uppercase hover:bg-white/10 transition-colors border-2 border-[#e6dfcc]">
                 Procure this Mead
               </button>
             </FadeInUp>
          </div>
       </section>

       {/* 2. Discover Others Section */}
       <section className="relative min-h-[50vh] flex flex-col items-center justify-center p-16 bg-[#e6dfcc]">
          <FadeInUp delay={0.1}>
            <h2 className="text-4xl font-bold text-[#1c1a17] mb-12 uppercase tracking-widest">Discover Other Expressions</h2>
          </FadeInUp>
          <FadeInUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-8">
              {otherFlavors.map((key) => (
                <Link 
                  key={key} 
                  to={`/profile/${key}`} 
                  className="text-xl font-['Oswald'] text-[#1c1a17] border-b-2 border-transparent hover:border-[#c69f69] transition-colors uppercase tracking-widest"
                >
                  {flavorData[key].title}
                </Link>
              ))}
            </div>
          </FadeInUp>
       </section>
    </div>
  );
};

export default Profile;
