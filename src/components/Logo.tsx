/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import logoImg from '../../images/logokeial-1.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkBackground?: boolean;
}

export function Logo({ className = '', size = 'md', darkBackground = false }: LogoProps) {
  // Height classes appropriate for clean responsive alignment
  const heightClass = size === 'lg' ? 'h-24' : size === 'sm' ? 'h-8' : 'h-12';

  const imgElement = (
    <img 
      src={logoImg} 
      alt="KEI-AL Auditing Logo" 
      className={`${heightClass} object-contain`}
      referrerPolicy="no-referrer"
    />
  );

  if (darkBackground) {
    return (
      <div className={`inline-flex items-center bg-white p-2 md:p-3 rounded-xl shadow-md border border-white/20 hover:shadow-lg transition-shadow duration-300 ${className}`}>
        {imgElement}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      {imgElement}
    </div>
  );
}
