import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { useParams, Navigate } from 'react-router-dom';

const yearData = {
  '1': {
    title: '大一：初來乍到',
    subtitle: 'FRESHMAN YEAR',
    description: '帶著懵懂與期待踏入校園，一切都是那麼新鮮。迎新營的歡笑、第一次熬夜趕報告、迷路在龐大的校園裡。',
    images: [
      { src: 'https://picsum.photos/seed/freshman1/1200/800', title: '迎新營', desc: '充滿熱情的破冰遊戲' },
      { src: 'https://picsum.photos/seed/freshman2/800/1000', title: '第一堂課', desc: '對未來充滿憧憬' },
      { src: 'https://picsum.photos/seed/freshman3/1000/750', title: '宿舍生活', desc: '與室友的深夜長談' },
      { src: 'https://picsum.photos/seed/freshman4/800/800', title: '校園探索', desc: '尋找最美的角落' },
      { src: 'https://picsum.photos/seed/freshman5/1000/600', title: '期末考週', desc: '圖書館裡的挑燈夜戰' },
    ]
  },
  '2': {
    title: '大二：探索與成長',
    subtitle: 'SOPHOMORE YEAR',
    description: '逐漸熟悉了大學的步調，開始參與社團、接辦活動。生活變得忙碌而充實，也結交了許多志同道合的朋友。',
    images: [
      { src: 'https://picsum.photos/seed/sophomore1/1200/800', title: '社團成發', desc: '舞台上的閃耀時刻' },
      { src: 'https://picsum.photos/seed/sophomore2/800/1000', title: '系隊練習', desc: '揮灑汗水的青春' },
      { src: 'https://picsum.photos/seed/sophomore3/1000/750', title: '迎新宿營', desc: '換我們帶領學弟妹' },
      { src: 'https://picsum.photos/seed/sophomore4/800/800', title: '校外教學', desc: '走出教室的學習' },
      { src: 'https://picsum.photos/seed/sophomore5/1000/600', title: '專題討論', desc: '激盪腦力的夜晚' },
    ]
  },
  '3': {
    title: '大三：專業與挑戰',
    subtitle: 'JUNIOR YEAR',
    description: '課業變得繁重，開始深入專業領域。面對未來的迷惘與焦慮，但也逐漸找到了自己的方向與熱情。',
    images: [
      { src: 'https://picsum.photos/seed/junior1/1200/800', title: '實驗室日常', desc: '無數次的失敗與嘗試' },
      { src: 'https://picsum.photos/seed/junior2/800/1000', title: '企業參訪', desc: '提早接觸職場環境' },
      { src: 'https://picsum.photos/seed/junior3/1000/750', title: '專題發表', desc: '展現努力的成果' },
      { src: 'https://picsum.photos/seed/junior4/800/800', title: '交換學生', desc: '體驗不同的文化' },
      { src: 'https://picsum.photos/seed/junior5/1000/600', title: '實習生活', desc: '將理論應用於實務' },
    ]
  },
  '4': {
    title: '大四：回首與前行',
    subtitle: 'SENIOR YEAR',
    description: '大學生活的尾聲，充滿了不捨與回憶。穿上學士服，拍下畢業照，準備迎接人生的下一個階段。',
    images: [
      { src: 'https://picsum.photos/seed/senior1/1200/800', title: '畢業專題', desc: '大學四年的集大成' },
      { src: 'https://picsum.photos/seed/senior2/800/1000', title: '學士服合影', desc: '留下最美的回憶' },
      { src: 'https://picsum.photos/seed/senior3/1000/750', title: '畢業旅行', desc: '與好友的最後一趟旅程' },
      { src: 'https://picsum.photos/seed/senior4/800/800', title: '謝師宴', desc: '感謝老師的教導' },
      { src: 'https://picsum.photos/seed/senior5/1000/600', title: '畢業典禮', desc: '邁向人生的新篇章' },
    ]
  }
};

export default function YearPage() {
  const { yearId } = useParams<{ yearId: string }>();
  const galleryRef = useRef<HTMLDivElement>(null);
  
  if (!yearId || !yearData[yearId as keyof typeof yearData]) {
    return <Navigate to="/" replace />;
  }

  const data = yearData[yearId as keyof typeof yearData];

  // Gallery specific scroll progress for parallax effect
  const { scrollYProgress: galleryScroll } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for editorial layout
  const ySlow = useTransform(galleryScroll, [0, 1], ["0%", "-10%"]);
  const yMedium = useTransform(galleryScroll, [0, 1], ["0%", "-25%"]);
  const yFast = useTransform(galleryScroll, [0, 1], ["0%", "-45%"]);

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
    <div className="pt-32">
      {/* Header Section */}
      <section className="py-20 bg-white relative z-10">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUpItem} className="text-text-muted font-light tracking-[0.3em] uppercase text-sm mb-4">
              {data.subtitle}
            </motion.p>
            <motion.h1 variants={fadeUpItem} className="font-serif text-4xl md:text-6xl text-black mb-8 tracking-widest">
              {data.title}
            </motion.h1>
            <motion.div variants={fadeUpItem} className="w-12 h-[2px] bg-black mx-auto mb-8"></motion.div>
            <motion.p variants={fadeUpItem} className="text-base md:text-lg font-light leading-loose text-text-secondary">
              {data.description}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section - Editorial Asymmetrical Layout */}
      <section id="gallery" ref={galleryRef} className="py-20 md:py-32 bg-bg-dark relative z-10 overflow-visible">
        {/* Massive Top Transition */}
        <div className="absolute bottom-[99.5%] left-0 right-0 h-[100vh] bg-gradient-to-b from-white via-white to-bg-dark pointer-events-none"></div>
        
        {/* Massive Bottom Transition */}
        <div className="absolute top-[99.5%] left-0 right-0 h-[100vh] bg-gradient-to-b from-bg-dark via-bg-secondary to-bg-secondary pointer-events-none"></div>
        
        {/* Blurred glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[100vh] bg-gradient-to-b from-white/10 to-transparent blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Asymmetrical Layout Container */}
          <div className="relative pb-32 mt-20">
            
            {/* Item 1 */}
            <motion.div style={{ y: ySlow }} className="w-full md:w-8/12 relative z-10">
              <div className="aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-gray-800">
                <img 
                  src={data.images[0].src} 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt={data.images[0].title} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-16 md:bottom-10 right-4 md:-right-16 bg-white p-6 md:p-10 shadow-2xl max-w-[85%] md:max-w-sm z-20">
                <h3 className="font-serif text-2xl text-black mb-4 tracking-widest">{data.images[0].title}</h3>
                <div className="w-8 h-[1px] bg-black mb-4"></div>
                <p className="font-light text-sm text-text-secondary leading-loose">
                  {data.images[0].desc}
                </p>
              </div>
            </motion.div>

            {/* Item 2 */}
            <motion.div style={{ y: yFast }} className="w-10/12 md:w-4/12 ml-auto mt-32 md:-mt-40 relative z-30">
              <div className="aspect-[3/4] overflow-hidden bg-gray-800 border-4 md:border-8 border-bg-dark">
                <img 
                  src={data.images[1].src} 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt={data.images[1].title} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute top-10 -left-8 md:-left-12 text-text-light [writing-mode:vertical-rl] tracking-[0.5em] font-serif text-lg md:text-xl drop-shadow-lg mix-blend-difference">
                {data.images[1].desc}
              </div>
            </motion.div>

            {/* Item 3 */}
            <motion.div style={{ y: yMedium }} className="w-11/12 md:w-7/12 mr-auto mt-24 md:mt-10 relative z-20">
              <div className="aspect-[4/3] overflow-hidden bg-gray-800">
                <img 
                  src={data.images[2].src} 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt={data.images[2].title} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="mt-6 md:absolute md:top-1/2 md:-right-40 md:-translate-y-1/2 bg-bg-dark/80 backdrop-blur-sm p-6 md:p-8">
                <h3 className="font-serif text-3xl text-text-light mb-2 tracking-widest">{data.images[2].title}</h3>
                <p className="font-light text-sm text-text-muted tracking-widest">{data.images[2].desc}</p>
              </div>
            </motion.div>

            {/* Item 4 */}
            <motion.div style={{ y: yFast }} className="w-8/12 md:w-4/12 ml-auto mt-20 md:-mt-32 relative z-40">
              <div className="aspect-square overflow-hidden bg-gray-800">
                <img 
                  src={data.images[3].src} 
                  className="w-full h-full object-cover opacity-90 hover:opacity-100 hover:scale-105 transition-all duration-1000" 
                  alt={data.images[3].title} 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-12 md:-bottom-16 left-4 md:left-10 text-text-light">
                <h3 className="font-serif text-xl mb-2 tracking-widest">{data.images[3].title}</h3>
                <div className="w-12 h-[1px] bg-text-muted mb-4"></div>
                <p className="font-light text-xs text-text-muted leading-loose tracking-widest">{data.images[3].desc}</p>
              </div>
            </motion.div>
            
            {/* Item 5 */}
            <motion.div style={{ y: ySlow }} className="w-full md:w-6/12 mx-auto mt-32 md:mt-20 relative z-10">
              <div className="aspect-[16/10] overflow-hidden bg-gray-800 relative shadow-2xl">
                 <img 
                  src={data.images[4].src} 
                  className="w-full h-full object-cover opacity-60 hover:opacity-90 hover:scale-105 transition-all duration-1000" 
                  alt={data.images[4].title} 
                  referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
              </div>
              <div className="text-center mt-8">
                 <h3 className="font-serif text-2xl text-text-light mb-2 tracking-widest">{data.images[4].title}</h3>
                 <p className="font-light text-sm text-text-muted tracking-widest">{data.images[4].desc}</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
