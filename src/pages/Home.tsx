import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  // Overall scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Gallery specific scroll progress for parallax effect
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for editorial layout
  const ySlow = useTransform(galleryScroll, [0, 1], ["0%", "-10%"]);
  const yMedium = useTransform(galleryScroll, [0, 1], ["0%", "-25%"]);
  const yFast = useTransform(galleryScroll, [0, 1], ["0%", "-45%"]);

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeUpItem = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-bg-secondary">
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20"
        >
          <motion.div variants={staggerContainer} initial="hidden" animate="show">
            <motion.h2 variants={fadeUpItem} className="font-sans text-text-secondary text-sm md:text-base tracking-[0.4em] uppercase mb-6">
              2022 - 2026
            </motion.h2>
            <motion.h1 variants={fadeUpItem} className="font-serif text-5xl md:text-7xl lg:text-8xl text-black mb-8 leading-tight tracking-wide">
              明亮的<br />
              <span className="italic font-light">校園生活</span>
            </motion.h1>
            <motion.p variants={fadeUpItem} className="text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-text-secondary">
              記錄在校園裡的每一個美好瞬間，陽光、草地、圖書館的安靜角落，以及與朋友們的歡笑聲。這是一段最純粹的時光。
            </motion.p>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        >
          <span className="font-sans text-xs uppercase tracking-widest text-text-secondary mb-3">Scroll</span>
          <motion.div 
            animate={{ height: ["0px", "40px", "0px"], y: [0, 0, 40] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] bg-black origin-top"
          ></motion.div>
        </motion.div>
      </section>

      {/* About Section - Clean White */}
      <section id="about" className="py-32 relative bg-white z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:col-span-5"
            >
              <motion.h2 variants={fadeUpItem} className="font-serif text-3xl md:text-5xl text-black mb-8 leading-snug">
                在陽光灑落的<br />長廊下
              </motion.h2>
              <motion.div variants={fadeUpItem} className="w-12 h-[2px] bg-black mb-10"></motion.div>
              <div className="space-y-6 text-base md:text-lg font-light leading-loose text-text-secondary">
                <motion.p variants={fadeUpItem}>
                  大學四年的時光，就像是一場充滿驚喜的旅行。我們在圖書館裡埋頭苦讀，在操場上揮灑汗水，在社團活動中找到志同道合的夥伴。
                </motion.p>
                <motion.p variants={fadeUpItem}>
                  每一個角落都充滿了回憶，那些看似平凡的日常，卻是日後最珍貴的寶藏。透過鏡頭，我想把這些明亮、充滿活力的瞬間捕捉下來。
                </motion.p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="lg:col-span-7 relative"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/campus-library/1200/900" 
                  alt="Campus Library" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-bg-secondary -z-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Editorial Asymmetrical Layout */}
      {/* Dark background to make vibrant photos pop */}
      <section id="gallery" ref={galleryRef} className="py-20 md:py-32 bg-bg-dark relative z-10 overflow-visible">
        {/* Massive Top Transition - Overlapping upwards to ensure no gaps */}
        <div className="absolute bottom-[99.5%] left-0 right-0 h-[100vh] bg-gradient-to-b from-white via-white to-bg-dark pointer-events-none"></div>
        
        {/* Massive Bottom Transition - Overlapping downwards to ensure no gaps */}
        <div className="absolute top-[99.5%] left-0 right-0 h-[100vh] bg-gradient-to-b from-bg-dark via-bg-secondary to-bg-secondary pointer-events-none"></div>
        
        {/* Blurred glow at the top of dark section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100vh] bg-gradient-to-b from-white/10 to-transparent blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center md:text-left md:ml-12 mb-20 md:mb-32"
          >
            <motion.h2 variants={fadeUpItem} className="font-serif text-4xl md:text-6xl text-text-light mb-4 tracking-widest">
              校園光影
            </motion.h2>
            <motion.p variants={fadeUpItem} className="text-text-muted font-light tracking-[0.3em] uppercase text-xs md:text-sm">
              Campus Moments
            </motion.p>
          </motion.div>

          {/* Asymmetrical Layout Container */}
          <div className="relative pb-32">
            
            {/* Item 1: Large, left-aligned */}
            <motion.div style={{ y: ySlow }} className="w-full md:w-8/12 relative z-10">
              <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-gray-800">
                <img 
                  src="https://picsum.photos/seed/campus-morning/1200/800" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt="晨間的操場" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-16 md:bottom-10 right-4 md:-right-16 bg-white p-6 md:p-10 shadow-2xl max-w-[85%] md:max-w-sm z-20">
                <h3 className="font-serif text-2xl text-black mb-4 tracking-widest">晨間的操場</h3>
                <div className="w-8 h-[1px] bg-black mb-4"></div>
                <p className="font-light text-sm text-text-secondary leading-loose">
                  陽光剛升起時的清新空氣，伴隨著第一道曙光，喚醒了沉睡的校園。這是屬於早起者的寧靜時刻。
                </p>
              </div>
            </motion.div>

            {/* Item 2: Tall, right-aligned, overlapping Item 1 */}
            <motion.div style={{ y: yFast }} className="w-10/12 md:w-4/12 ml-auto mt-32 md:-mt-40 relative z-30">
              <div className="aspect-[3/4] overflow-hidden bg-gray-800 border-4 md:border-8 border-bg-dark">
                <img 
                  src="https://picsum.photos/seed/campus-club/800/1000" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt="社團博覽會" 
                  referrerPolicy="no-referrer"
                />
              </div>
              {/* Vertical Text */}
              <div className="absolute top-10 -left-8 md:-left-12 text-text-light [writing-mode:vertical-rl] tracking-[0.5em] font-serif text-lg md:text-xl drop-shadow-lg mix-blend-difference">
                充滿活力的青春氣息
              </div>
            </motion.div>

            {/* Item 3: Wide, center-left, overlapping Item 2 */}
            <motion.div style={{ y: yMedium }} className="w-11/12 md:w-7/12 mr-auto mt-24 md:mt-10 relative z-20">
              <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                <img 
                  src="https://picsum.photos/seed/campus-grad/1000/750" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt="畢業季" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 md:absolute md:top-1/2 md:-right-40 md:-translate-y-1/2 bg-bg-dark/80 backdrop-blur-sm p-6 md:p-8">
                <h3 className="font-serif text-3xl text-text-light mb-2 tracking-widest">畢業季</h3>
                <p className="font-light text-sm text-text-muted tracking-widest">穿著學士服的燦爛笑容</p>
              </div>
            </motion.div>

            {/* Item 4: Small, far right */}
            <motion.div style={{ y: yFast }} className="w-8/12 md:w-4/12 ml-auto mt-20 md:-mt-32 relative z-40">
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img 
                  src="https://picsum.photos/seed/campus-cafe/800/800" 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt="午後的咖啡廳" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-10 text-text-light">
                <h3 className="font-serif text-xl mb-2 tracking-widest">午後的咖啡廳</h3>
                <div className="w-12 h-[1px] bg-text-muted mb-4"></div>
                <p className="font-light text-xs text-text-muted leading-loose tracking-widest">討論報告與分享生活</p>
              </div>
            </motion.div>
            
            {/* Item 5: Center, overlapping bottom */}
            <motion.div style={{ y: ySlow }} className="w-full md:w-6/12 mx-auto mt-32 md:mt-20 relative z-10">
              <div className="aspect-[16/10] overflow-hidden bg-gray-800 relative shadow-2xl">
                 <img 
                  src="https://picsum.photos/seed/campus-path/1000/600" 
                  className="w-full h-full object-cover opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-1000" 
                  alt="林蔭大道" 
                  referrerPolicy="no-referrer"
                 />
                 {/* Inner border decoration */}
                 <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
              </div>
              <div className="text-center mt-8">
                 <h3 className="font-serif text-2xl text-text-light mb-2 tracking-widest">林蔭大道</h3>
                 <p className="font-light text-sm text-text-muted tracking-widest">秋天落葉鋪滿的浪漫小徑</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Quote Section - Layered White */}
      <section className="py-32 bg-bg-secondary relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
          >
            <h2 className="font-serif text-2xl md:text-4xl text-black leading-relaxed mb-8">
              「堅信建築的根基是紮在真實的生活上，<br className="hidden md:block" />
              但生活最真實的狀態，卻非物理體驗般固定不動，而是無時無刻變化。」
            </h2>
            <p className="font-sans text-text-secondary tracking-widest text-sm uppercase">
              — 記錄每一個變化的瞬間
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
