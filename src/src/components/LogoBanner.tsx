import { useState } from 'react';
import { motion } from 'motion/react';

export function LogoBanner() {
  const logoUrls = [
    // 1. High-speed, high-res Apple CDN of the Match Masters App Icon
    'https://is4-ssl.mzstatic.com/image/thumb/Purple112/v4/8d/68/73/8d68735c-fe25-bf27-18b8-b4b045feef3b/AppIcon-0-0-1x_U007emarketing-0-85-220-0-4.png/256x256bb.jpg',
    // 2. High-speed redditmedia icon
    'https://styles.redditmedia.com/t5_pk6f1/styles/communityIcon_idizd909pqs91.png',
    // 3. Logos world link as fallback
    'https://logos-world.net/wp-content/uploads/2022/10/Match-Masters-Logo.png',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [useFallbackText, setUseFallbackText] = useState(false);

  const handleImageError = () => {
    if (currentIndex < logoUrls.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setUseFallbackText(true);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-[300px] mx-auto select-none"
    >
      {/* Outer container mirroring the screenshot header banner with high-fidelity styling */}
      <div className="relative overflow-hidden bg-[#170e28] border-2 border-cyan-400 rounded-2xl py-2 px-4 shadow-[0_0_18px_rgba(6,182,212,0.4)] flex justify-center items-center h-16">
        {/* Subtle interior gradient glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-cyan-500/15 pointer-events-none" />

        {/* Real Match Masters logo image / SVG Fallback */}
        <div className="flex flex-row items-center select-none relative z-10 py-1 w-full justify-center gap-3">
          {!useFallbackText ? (
            <>
              {/* Left element: App Icon if we are using the icon CDN url */}
              {logoUrls[currentIndex].includes('mzstatic') || logoUrls[currentIndex].includes('redditmedia') ? (
                <div className="flex items-center gap-3">
                  <img
                    src={logoUrls[currentIndex]}
                    alt="Match Masters"
                    onError={handleImageError}
                    className="h-10 w-10 rounded-xl object-cover filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] border border-cyan-400/50"
                  />
                  {/* Premium Brand text mimicking Match Masters logo */}
                  <div className="flex flex-col items-start leading-none">
                    <span 
                      className="font-black italic tracking-wider text-[#ffd700] text-lg uppercase drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}
                    >
                      MATCH
                    </span>
                    <span 
                      className="font-black italic tracking-wide text-[#ff3267] text-sm uppercase -mt-0.5 drop-shadow-[0_2px_3px_rgba(0,0,0,0.8)]"
                      style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}
                    >
                      MASTERS
                    </span>
                  </div>
                </div>
              ) : (
                /* Native horizontal banner image */
                <img
                  src={logoUrls[currentIndex]}
                  alt="Match Masters"
                  onError={handleImageError}
                  className="h-11 w-auto max-w-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]"
                />
              )}
            </>
          ) : (
            /* Premium SVG text fallback mimicking original Match Masters typographic logo */
            <div className="flex flex-col items-center justify-center leading-none">
              <span 
                className="font-black italic tracking-widest text-[#ffd700] text-xl uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}
              >
                MATCH
              </span>
              <span 
                className="font-black italic tracking-wider text-[#ff3267] text-md uppercase -mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                style={{ fontFamily: '"Impact", "Arial Black", sans-serif' }}
              >
                MASTERS
              </span>
            </div>
          )}

          {/* Glowing gaming star vectors surrounding the logo for feedback match feel */}
          <div className="absolute top-0 right-1 animate-bounce">
            <svg className="w-3.5 h-3.5 text-[#ffd700] drop-shadow-[0_0_4px_rgba(255,215,0,0.6)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-1 animate-pulse">
            <svg className="w-3 h-3 text-[#ff3267] drop-shadow-[0_0_4px_rgba(255,50,103,0.6)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
