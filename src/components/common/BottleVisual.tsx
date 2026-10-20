import React from 'react';

interface BottleVisualProps {
  type: 'mustard' | 'olive' | 'sunflower' | 'placeholder' | string;
  className?: string;
  bottleSize?: string;
  isPlaceholder?: boolean;
}

export const BottleVisual: React.FC<BottleVisualProps> = ({
  type,
  className = 'w-full h-full',
  bottleSize = '750 ml',
  isPlaceholder = false,
}) => {
  if (type === 'mustard') {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#FAF4EB] via-[#F4EBD8] to-[#EAE0CB] overflow-hidden ${className}`}>
        {/* Ambient warm glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-transparent to-transparent" />
        
        {/* Subtle decorative botanical pattern ring */}
        <svg className="w-56 h-80 drop-shadow-xl transition-transform duration-500 hover:scale-105" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glass Bottle Shadow */}
          <ellipse cx="100" cy="305" rx="45" ry="8" fill="rgba(60, 40, 20, 0.15)" />
          
          {/* Bottle Neck & Cap */}
          <rect x="91" y="24" width="18" height="24" rx="2" fill="#2E241E" />
          <rect x="88" y="44" width="24" height="6" rx="2" fill="#B38025" />
          <path d="M89 48 L111 48 L116 86 L84 86 Z" fill="#693B11" opacity="0.9" />

          {/* Bottle Body - Amber Glass */}
          <rect x="62" y="86" width="76" height="206" rx="14" fill="#6B3C0F" />
          {/* Liquid Oil Inner Glow */}
          <rect x="65" y="94" width="70" height="194" rx="11" fill="url(#mustardLiquid)" />
          {/* Glass Highlight Edge */}
          <path d="M68 96 L74 96 L74 286 L68 286 Z" fill="white" fillOpacity="0.22" />
          <path d="M128 98 L130 98 L130 284 L128 284 Z" fill="white" fillOpacity="0.1" />

          {/* Minimalist Cream Label */}
          <rect x="67" y="145" width="66" height="100" rx="3" fill="#FCF9F3" stroke="#D3B88C" strokeWidth="0.8" />
          
          {/* Label typography elements */}
          <text x="100" y="162" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="1.5" fill="#805C2B" fontWeight="600">
            HARVEST &amp; GROVE
          </text>
          <line x1="77" y1="168" x2="123" y2="168" stroke="#805C2B" strokeWidth="0.5" strokeOpacity="0.6" />
          <text x="100" y="180" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#2E1C0A">
            MUSTARD
          </text>
          <text x="100" y="191" textAnchor="middle" fontSize="6.5" fontFamily="serif" fontStyle="italic" fill="#5E3F1A">
            Cold-Pressed Oil
          </text>
          <circle cx="100" cy="204" r="5" fill="#C68A27" fillOpacity="0.3" stroke="#C68A27" strokeWidth="0.6" />
          <circle cx="100" cy="204" r="2" fill="#85530B" />
          <text x="100" y="222" textAnchor="middle" fontSize="5" fontFamily="sans-serif" letterSpacing="0.8" fill="#7C6146">
            KACHI GHANI · {bottleSize}
          </text>
          <text x="100" y="234" textAnchor="middle" fontSize="4.2" fontFamily="sans-serif" fill="#997D61">
            EST. 2026 · PURE GRADE
          </text>

          <defs>
            <linearGradient id="mustardLiquid" x1="65" y1="94" x2="135" y2="288" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E59B1F" />
              <stop offset="0.5" stopColor="#B66B12" />
              <stop offset="1" stopColor="#813C07" />
            </linearGradient>
          </defs>
        </svg>

        {/* Floating subtle origin mark */}
        <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-[#7A5B32]">
          Kachi Ghani Raw Press
        </div>
      </div>
    );
  }

  if (type === 'olive') {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#F2F5ED] via-[#E6EDE0] to-[#D8E3CE] overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-100/50 via-transparent to-transparent" />
        
        <svg className="w-56 h-80 drop-shadow-xl transition-transform duration-500 hover:scale-105" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="305" rx="44" ry="8" fill="rgba(30, 48, 25, 0.16)" />
          
          {/* Dark Green Glass Cap */}
          <rect x="91" y="22" width="18" height="26" rx="2" fill="#1A2818" />
          <rect x="88" y="44" width="24" height="6" rx="2" fill="#4B6338" />
          <path d="M89 48 L111 48 L117 88 L83 88 Z" fill="#243820" opacity="0.95" />

          {/* Bottle Body - Dark Green Glass */}
          <rect x="62" y="88" width="76" height="204" rx="14" fill="#243820" />
          {/* Liquid Oil Inner Glow */}
          <rect x="65" y="96" width="70" height="192" rx="11" fill="url(#oliveLiquid)" />
          {/* Glass Highlight Edge */}
          <path d="M68 98 L74 98 L74 284 L68 284 Z" fill="white" fillOpacity="0.24" />
          <path d="M128 100 L130 100 L130 282 L128 282 Z" fill="white" fillOpacity="0.1" />

          {/* Minimalist Botanical Cream Label */}
          <rect x="67" y="148" width="66" height="98" rx="3" fill="#FAFBF7" stroke="#BACAB0" strokeWidth="0.8" />
          
          <text x="100" y="165" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="1.5" fill="#3D562E" fontWeight="600">
            HARVEST &amp; GROVE
          </text>
          <line x1="77" y1="171" x2="123" y2="171" stroke="#3D562E" strokeWidth="0.5" strokeOpacity="0.6" />
          <text x="100" y="184" textAnchor="middle" fontSize="8" fontFamily="serif" fontWeight="bold" fill="#1E2E17">
            EXTRA VIRGIN
          </text>
          <text x="100" y="195" textAnchor="middle" fontSize="6.5" fontFamily="serif" fontStyle="italic" fill="#3A522C">
            Estate Olive Oil
          </text>
          {/* Olive branch motif */}
          <circle cx="95" cy="207" r="3.5" fill="#526E38" />
          <circle cx="105" cy="207" r="3.5" fill="#3F572A" />
          <path d="M91 211 Q100 205 109 211" stroke="#2D421E" strokeWidth="0.8" fill="none" />
          <text x="100" y="224" textAnchor="middle" fontSize="5" fontFamily="sans-serif" letterSpacing="0.8" fill="#4B6338">
            FIRST EXTRACTION · {bottleSize}
          </text>
          <text x="100" y="235" textAnchor="middle" fontSize="4.2" fontFamily="sans-serif" fill="#6B8558">
            SINGLE ESTATE · ACIDITY &lt; 0.35%
          </text>

          <defs>
            <linearGradient id="oliveLiquid" x1="65" y1="96" x2="135" y2="288" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6C8C38" />
              <stop offset="0.45" stopColor="#4A6525" />
              <stop offset="1" stopColor="#253813" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-[#3D562E]">
          Single Estate Early Harvest
        </div>
      </div>
    );
  }

  if (type === 'sunflower') {
    return (
      <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#FFFDF0] via-[#FBF5DC] to-[#F2E8C4] overflow-hidden ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/40 via-transparent to-transparent" />
        
        <svg className="w-56 h-80 drop-shadow-xl transition-transform duration-500 hover:scale-105" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="100" cy="305" rx="46" ry="8" fill="rgba(80, 60, 20, 0.14)" />
          
          {/* Golden Cap */}
          <rect x="91" y="20" width="18" height="26" rx="2" fill="#423010" />
          <rect x="88" y="42" width="24" height="6" rx="2" fill="#D4A017" />
          <path d="M89 46 L111 46 L118 86 L82 86 Z" fill="#9C700D" opacity="0.85" />

          {/* Bottle Body - Pure High-Transparency Glass */}
          <rect x="60" y="86" width="80" height="206" rx="14" fill="#805C0E" fillOpacity="0.4" stroke="#DDB13A" strokeWidth="0.8" />
          {/* Shimmering Sunflower Oil Glow */}
          <rect x="63" y="93" width="74" height="195" rx="11" fill="url(#sunflowerLiquid)" />
          {/* Glass Highlight Edge */}
          <path d="M66 96 L72 96 L72 284 L66 284 Z" fill="white" fillOpacity="0.4" />
          <path d="M132 98 L134 98 L134 282 L132 282 Z" fill="white" fillOpacity="0.25" />

          {/* Minimalist Botanical White Label */}
          <rect x="67" y="146" width="66" height="98" rx="3" fill="#FFFFFF" stroke="#E8D5A3" strokeWidth="0.8" />
          
          <text x="100" y="163" textAnchor="middle" fontSize="6" fontFamily="sans-serif" letterSpacing="1.5" fill="#78550B" fontWeight="600">
            HARVEST &amp; GROVE
          </text>
          <line x1="77" y1="169" x2="123" y2="169" stroke="#78550B" strokeWidth="0.5" strokeOpacity="0.6" />
          <text x="100" y="182" textAnchor="middle" fontSize="7.8" fontFamily="serif" fontWeight="bold" fill="#3D2900">
            SUNFLOWER
          </text>
          <text x="100" y="193" textAnchor="middle" fontSize="6.5" fontFamily="serif" fontStyle="italic" fill="#6B4D08">
            High-Oleic Pressed
          </text>
          {/* Sunflower petal icon */}
          <circle cx="100" cy="206" r="4.5" fill="#D4A017" />
          <circle cx="100" cy="206" r="2.2" fill="#5E3E04" />
          <text x="100" y="223" textAnchor="middle" fontSize="5" fontFamily="sans-serif" letterSpacing="0.8" fill="#856111">
            EXPELLER-PRESSED · {bottleSize}
          </text>
          <text x="100" y="234" textAnchor="middle" fontSize="4.2" fontFamily="sans-serif" fill="#A8832E">
            SMOKE POINT 232°C / 450°F
          </text>

          <defs>
            <linearGradient id="sunflowerLiquid" x1="63" y1="93" x2="137" y2="288" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F9DF66" />
              <stop offset="0.4" stopColor="#EAB308" />
              <stop offset="1" stopColor="#B47806" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-[#856111]">
          Expeller-Pressed High Oleic
        </div>
      </div>
    );
  }

  // Placeholder / Slot 4
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-b from-[#F5F2EB] via-[#ECE6D8] to-[#DDD4C0] overflow-hidden ${className}`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-200/50 via-transparent to-transparent" />
      
      <svg className="w-56 h-80 drop-shadow-xl transition-transform duration-500 hover:scale-105" viewBox="0 0 200 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="100" cy="305" rx="44" ry="8" fill="rgba(60, 50, 40, 0.15)" />
        
        {/* Stopper / Cork */}
        <rect x="92" y="22" width="16" height="24" rx="2" fill="#8C7355" />
        <rect x="88" y="44" width="24" height="6" rx="2" fill="#A38968" />
        <path d="M89 48 L111 48 L116 86 L84 86 Z" fill="#6B5945" opacity="0.8" />

        {/* Bottle Body - Frosted / Neutral Vessel */}
        <rect x="62" y="86" width="76" height="206" rx="14" fill="#52483E" fillOpacity="0.4" stroke="#B8A892" strokeWidth="1" strokeDasharray="4 2" />
        <rect x="65" y="94" width="70" height="194" rx="11" fill="url(#placeholderLiquid)" />
        <path d="M68 96 L74 96 L74 286 L68 286 Z" fill="white" fillOpacity="0.2" />

        {/* Minimalist Editorial Reserved Label */}
        <rect x="67" y="145" width="66" height="100" rx="3" fill="#FCFAF7" stroke="#C4B7A5" strokeWidth="0.8" />
        
        <text x="100" y="162" textAnchor="middle" fontSize="5.5" fontFamily="sans-serif" letterSpacing="1.2" fill="#6B5D4D" fontWeight="600">
          HARVEST &amp; GROVE
        </text>
        <line x1="77" y1="168" x2="123" y2="168" stroke="#6B5D4D" strokeWidth="0.5" strokeOpacity="0.6" />
        <text x="100" y="180" textAnchor="middle" fontSize="7" fontFamily="serif" fontWeight="bold" fill="#3D352B">
          RESERVE OIL
        </text>
        <text x="100" y="191" textAnchor="middle" fontSize="6" fontFamily="serif" fontStyle="italic" fill="#6E5F4F">
          Slot #4 Reserved
        </text>
        {/* Configurable Gear / Lock symbol */}
        <circle cx="100" cy="204" r="5.5" fill="#E8DEC8" stroke="#8C7355" strokeWidth="0.7" />
        <text x="100" y="207" textAnchor="middle" fontSize="6.5" fontFamily="sans-serif" fill="#5E4E3A" fontWeight="bold">
          4
        </text>
        <text x="100" y="222" textAnchor="middle" fontSize="4.8" fontFamily="sans-serif" letterSpacing="0.8" fill="#6B5D4D">
          ADMIN CONFIGURABLE
        </text>
        <text x="100" y="234" textAnchor="middle" fontSize="4.2" fontFamily="sans-serif" fill="#8C7D6B">
          {bottleSize} · LIVE EDITABLE
        </text>

        <defs>
          <linearGradient id="placeholderLiquid" x1="65" y1="94" x2="135" y2="288" gradientUnits="userSpaceOnUse">
            <stop stopColor="#D4C8B4" />
            <stop offset="0.5" stopColor="#B0A087" />
            <stop offset="1" stopColor="#7E6E56" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-3 left-4 text-[11px] font-medium tracking-wider uppercase text-[#736453]">
        Configurable Catalogue Slot
      </div>
    </div>
  );
};
