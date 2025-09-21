import React from 'react';

const WaterRipplesFilter = () => {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }}>
      <filter id="waterRippleEffect">
        {/* Create a turbulence noise pattern */}
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.04"
          numOctaves="3"
          seed="2"
          id="turbulence"
        />
        
        {/* Use the turbulence as a displacement map to distort the image */}
        <feDisplacementMap in="SourceGraphic" scale="20" />

        {/* Animate the baseFrequency of the turbulence to create movement */}
        <animate 
            xlinkHref="#turbulence"
            attributeName="baseFrequency"
            dur="20s"
            keyTimes="0;0.5;1"
            values="0.01 0.04;0.02 0.06;0.01 0.04"
            repeatCount="indefinite"
        />
      </filter>
    </svg>
  );
};

export default WaterRipplesFilter;