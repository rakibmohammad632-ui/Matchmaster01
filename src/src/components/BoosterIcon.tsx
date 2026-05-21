interface BoosterIconProps {
  className?: string;
  size?: number;
}

export function BoosterIcon({ className = '', size = 28 }: BoosterIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-[0_3px_4px_rgba(0,0,0,0.5)]`}
    >
      <defs>
        {/* Deep magical purple booster gradients */}
        <linearGradient id="boosterPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d500f9" />
          <stop offset="50%" stopColor="#7b1fa2" />
          <stop offset="100%" stopColor="#4a148c" />
        </linearGradient>
        {/* Shiny gold lid/borders */}
        <linearGradient id="boosterGold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff176" />
          <stop offset="50%" stopColor="#fbc02d" />
          <stop offset="100%" stopColor="#f57f17" />
        </linearGradient>
        {/* Lightning bolt energy grad */}
        <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#ffeb3b" />
          <stop offset="100%" stopColor="#ff9800" />
        </linearGradient>
      </defs>

      {/* Main 3D Booster Cube/Box Body representation */}
      {/* Front Face of the Box */}
      <path
        d="M 12 28 L 32 38 L 52 28 L 52 50 L 32 58 L 12 50 Z"
        fill="url(#boosterPurple)"
        stroke="#1a0033"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Glossy highlight vertical stripe on front-left face */}
      <path
        d="M 14 29 L 32 38 L 32 56 L 14 48 Z"
        fill="white"
        opacity="0.12"
      />

      {/* Gold Rim/Bezel at top of the booster box */}
      <path
        d="M 12 28 L 32 38 L 52 28 L 32 18 Z"
        fill="#8e24aa"
        stroke="#1a0033"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />

      {/* Gold Rim top insert cap */}
      <path
        d="M 16 27 L 32 35 L 48 27 L 32 19 Z"
        fill="url(#boosterGold)"
        stroke="#f57f17"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Embossed gold shield badge on the front face */}
      <polygon
        points="24,37 40,37 44,46 32,52 20,46"
        fill="#1a0033"
        opacity="0.3"
      />
      <polygon
        points="24,35 40,35 44,44 32,50 20,44"
        fill="url(#boosterGold)"
        stroke="#5d4037"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Vibrant Glowing Lightning energy insignia inside the shield */}
      <path
        d="M 34 37 L 26 44 L 32 44 L 30 48 L 38 41 L 32 41 Z"
        fill="url(#boltGrad)"
        stroke="#e65100"
        strokeWidth="1"
        strokeLinejoin="round"
        className="animate-pulse"
      />

      {/* Sparkles / Magic particles */}
      <path d="M 8,16 L 10,19 L 13,20 L 10,21 L 8,24 L 6,21 L 3,20 L 6,19 Z" fill="#ffeb3b" opacity="0.8" />
      <path d="M 52,12 L 54,14 L 57,15 L 54,16 L 52,18 L 50,16 L 47,15 L 50,14 Z" fill="#fff" opacity="0.9" />
    </svg>
  );
}
