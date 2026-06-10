/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const isLarge = size === 'lg';
  const isSmall = size === 'sm';

  const barWidth = isLarge ? 'w-4 h-12' : isSmall ? 'w-2 h-6' : 'w-2.5 h-8';
  const barSpacing = 'gap-1';
  
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Bars Graphic */}
      <div className={`flex items-end ${barSpacing}`}>
        {/* Yellow-Green bar (Now Slate) */}
        <div 
          className={`${barWidth} rounded-t-[2px] transition-all`} 
          style={{ 
            height: isLarge ? '32px' : isSmall ? '16px' : '22.5px', 
            backgroundColor: '#94A3B8' 
          }} 
        />
        {/* Green bar (Now Teal) */}
        <div 
          className={`${barWidth} rounded-t-[2px] transition-all`} 
          style={{ 
            height: isLarge ? '45px' : isSmall ? '22px' : '31.5px', 
            backgroundColor: '#0D9488' 
          }} 
        />
        {/* Orange bar (Now Steel Blue) */}
        <div 
          className={`${barWidth} rounded-t-[2px] transition-all`} 
          style={{ 
            height: isLarge ? '36px' : isSmall ? '18px' : '25px', 
            backgroundColor: '#0EA5E9' 
          }} 
        />
      </div>

      {/* Typography brand label */}
      <div className="flex flex-col leading-tight">
        <strong 
          className={`font-sans font-bold tracking-wider text-brand-dark transition-all`}
          style={{ fontSize: isLarge ? '26px' : isSmall ? '15px' : '20px' }}
        >
          KEI-AL
        </strong>
        <span 
          className="font-sans font-medium tracking-[0.25em] text-brand-text-muted uppercase"
          style={{ fontSize: isLarge ? '12px' : isSmall ? '8px' : '10px' }}
        >
          Auditing
        </span>
      </div>
    </div>
  );
}
