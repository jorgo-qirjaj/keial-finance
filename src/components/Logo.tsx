/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkBackground?: boolean;
}

export function Logo({ className = '', size = 'md', darkBackground = false }: LogoProps) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  // SVG dimensions: width: 90, height: 60 for the graphic alone
  // Aspect ratio is maintained per size
  const graphicWidth = isLarge ? 120 : isSmall ? 48 : 72;
  const graphicHeight = isLarge ? 80 : isSmall ? 32 : 48;

  const textColor = darkBackground ? 'text-white' : 'text-[#111827]';
  const subtextColor = darkBackground ? 'text-gray-300' : 'text-[#374151]';
  const borderDivider = darkBackground ? 'border-gray-700 text-gray-400' : 'border-[#E5E7EB] text-[#4B5563]';

  return (
    <div className={`flex items-center gap-4 select-none ${className}`}>
      {/* Official Geometric Logo Graphic */}
      <svg 
        width={graphicWidth} 
        height={graphicHeight} 
        viewBox="0 0 90 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* BAR 1: Lime / Yellow-Green */}
        {/* Top/Left piece of Bar 1 (Light Yellow-Green) */}
        <path 
          d="M0 0H20V45L0 36V0Z" 
          fill="#C6D854" 
        />
        {/* Bottom/Right piece of Bar 1 (Olive Shadow) */}
        <path 
          d="M0 36L20 45V60H0V36Z" 
          fill="#94A335" 
        />

        {/* BAR 2: Emerald Green */}
        {/* Top part of Bar 2 (Light Emerald) */}
        <path 
          d="M25 0H45V30L25 42V0Z" 
          fill="#3BBA74" 
        />
        {/* Bottom part of Bar 2 (Deep Emerald) */}
        <path 
          d="M25 42L45 30V60H25V42Z" 
          fill="#237243" 
        />

        {/* BAR 3: Coral / Orange */}
        {/* Top part of Bar 3 (Light Coral) */}
        <path 
          d="M50 0H70V33L50 18V0Z" 
          fill="#EC7A55" 
        />
        {/* Bottom part of Bar 3 (Rust Orange) */}
        <path 
          d="M50 18L70 33V60H50V18Z" 
          fill="#D65431" 
        />
      </svg>

      {/* Official Corporate Typography branding */}
      <div className="flex flex-col justify-center leading-none">
        <h1 
          className={`font-sans font-black tracking-[0.05em] ${textColor} uppercase leading-none`}
          style={{ 
            fontSize: isLarge ? '32px' : isSmall ? '16px' : '24px',
            lineHeight: '1'
          }}
        >
          KEI-AL
        </h1>
        <div 
          className={`font-sans font-light tracking-[0.34em] ${subtextColor} uppercase mt-1 leading-none`}
          style={{ 
            fontSize: isLarge ? '12px' : isSmall ? '6px' : '9px',
            lineHeight: '1'
          }}
        >
          AUDITING
        </div>
        {isLarge && (
          <div className={`font-sans text-[9px] mt-2 border-t ${borderDivider} pt-1.5 max-w-[200px] leading-snug`}>
            Auditing &amp; Related Services,<br />
            Accounting, Tax Advice and Business
          </div>
        )}
      </div>
    </div>
  );
}
