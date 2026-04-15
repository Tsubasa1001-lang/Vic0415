import { motion, usePresence, useMotionValue, animate } from 'motion/react';
import { useLayoutEffect, useId, useState } from 'react';

const MotionFeDisplacementMap = motion.create('feDisplacementMap');
const MotionFeGaussianBlur = motion.create('feGaussianBlur');

export default function SandTransition({ children, pathKey }: { children: React.ReactNode, pathKey: string }) {
  const [isPresent, safeToRemove] = usePresence();
  const scale = useMotionValue(0);
  const blur = useMotionValue(0);
  const opacity = useMotionValue(1);
  const y = useMotionValue(0);
  const x = useMotionValue(0);
  
  const [fixedStyle, setFixedStyle] = useState<React.CSSProperties>({});
  
  const rawId = useId();
  const filterId = `sand-filter-${rawId.replace(/:/g, '')}-${pathKey.replace(/[^a-zA-Z0-9]/g, '')}`;

  useLayoutEffect(() => {
    if (!isPresent) {
      // 凍結當前畫面位置，防止捲軸跳動造成的視覺突兀
      setFixedStyle({
        position: 'fixed',
        top: -window.scrollY,
        left: 0,
        width: document.documentElement.clientWidth,
        zIndex: 50,
        pointerEvents: 'none',
      });
      
      // 立即將捲軸移至最上方，讓新頁面能在正確位置載入
      window.scrollTo(0, 0);

      // 1. 更緩慢、更具離別感的時長 (3.5秒)
      const duration = 3.5;
      
      // 2. 極大的位移程度，讓像素向四面八方徹底散開 (非水平)
      animate(scale, 800, { duration, ease: [0.25, 0.1, 0.25, 1] });
      
      // 3. 均勻的模糊，模擬視線模糊、記憶漸漸消散的感覺
      animate(blur, 20, { duration, ease: "easeIn" });
      
      // 4. 緩慢向左上角飄散，像灰燼或靈魂升空
      animate(y, -200, { duration, ease: "easeOut" });
      animate(x, -200, { duration, ease: "easeOut" });
      
      // 5. 緩慢淡出，延後開始淡出的時間讓散亂的過程更深刻
      animate(opacity, 0, { duration: duration * 0.8, delay: duration * 0.2, ease: "easeInOut", onComplete: () => safeToRemove() });
    } else {
      scale.set(0);
      blur.set(0);
      opacity.set(0);
      y.set(20);
      x.set(20);
      
      animate(opacity, 1, { duration: 1.5, ease: "easeOut" });
      animate(y, 0, { duration: 1.5, ease: "easeOut" });
      animate(x, 0, { duration: 1.5, ease: "easeOut" });
    }
  }, [isPresent, safeToRemove, scale, blur, opacity, y, x]);

  return (
    <>
      <svg style={{ width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          {/* 均勻的高頻雜訊，產生無方向性的散亂沙塵/灰燼感 */}
          <feTurbulence type="fractalNoise" baseFrequency="0.4" numOctaves="5" result="noise" />
          <MotionFeDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={scale} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
          <MotionFeGaussianBlur stdDeviation={blur} />
        </filter>
      </svg>
      <motion.div 
        style={{ 
          ...fixedStyle,
          filter: `url(#${filterId})`,
          opacity,
          y,
          x,
        }}
        className="w-full"
      >
        {children}
      </motion.div>
    </>
  );
}
