interface CoinIconProps {
  className?: string;
  size?: number;
}

export function CoinIcon({ className = '', size = 28 }: CoinIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)]`}
    >
      <defs>
        {/* Coin front-face gradient */}
        <linearGradient id="coinGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff350" />
          <stop offset="30%" stopColor="#ffca28" />
          <stop offset="70%" stopColor="#ff8f00" />
          <stop offset="100%" stopColor="#e65100" />
        </linearGradient>
        {/* Coin side depth gradient */}
        <linearGradient id="coinGoldDepth" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffa000" />
          <stop offset="100%" stopColor="#b76e00" />
        </linearGradient>
        {/* Highlight sparkle gradient */}
        <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ffca28" />
        </linearGradient>
      </defs>

      {/* Stacked background coin bottom left */}
      <ellipse cx="22" cy="44" rx="14" ry="10" fill="url(#coinGoldDepth)" />
      <ellipse cx="22" cy="42" rx="14" ry="10" fill="url(#coinGold)" stroke="#3e2723" strokeWidth="2" />
      <circle cx="22" cy="42" r="8" stroke="#ff8f00" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Stacked background coin bottom right */}
      <ellipse cx="44" cy="42" rx="14" ry="10" fill="url(#coinGoldDepth)" />
      <ellipse cx="44" cy="40" rx="14" ry="10" fill="url(#coinGold)" stroke="#3e2723" strokeWidth="2" />
      <circle cx="44" cy="40" r="8" stroke="#ff8f00" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Main centerpiece foremost coin */}
      {/* 3D cylindrical side extrusion */}
      <path d="M 16, 26 L 16, 32 A 16,11 0 0,0 48,32 L 48, 26 Z" fill="url(#coinGoldDepth)" stroke="#3e2723" strokeWidth="2" strokeLinejoin="round" />
      {/* Coin Front Face */}
      <ellipse cx="32" cy="26" rx="16" ry="11" fill="url(#coinGold)" stroke="#3e2723" strokeWidth="2.5" />

      {/* Embossed inner circle */}
      <ellipse cx="32" cy="26" rx="11" ry="7.5" fill="none" stroke="#ffa000" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* Embossed bold logo glyph 'M' inside foremost coin */}
      <path
        d="M 27 28.5 L 27 23 L 30 25.5 L 32 23.5 L 34 25.5 L 37 23 L 37 28.5"
        stroke="#3e2723"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 27 28.5 L 27 23 L 30 25.5 L 32 23.5 L 34 25.5 L 37 23 L 37 28.5"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Magic dynamic gleam/star highlight */}
      <path d="M 44,14 L 46,18 L 50,20 L 46,22 L 44,26 L 42,22 L 38,20 L 42,18 Z" fill="url(#sparkleGrad)" className="animate-pulse" />
      <circle cx="44" cy="20" r="1.5" fill="#fff" />
    </svg>
  );
}
