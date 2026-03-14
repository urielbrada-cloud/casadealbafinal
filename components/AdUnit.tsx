
import React, { useEffect } from 'react';

interface AdUnitProps {
  slot: string; // The AdSense ad slot ID
  format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
  layout?: string; // For In-article ads
  client?: string; // Usually fixed, but can be overridden
  className?: string;
  label?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdUnit: React.FC<AdUnitProps> = ({ 
  slot, 
  format = 'auto', 
  layout, 
  client = 'ca-pub-XXXXXXXXXXXXXXXX', // Replace with your actual Publisher ID
  className = '',
  label = true
}) => {

  useEffect(() => {
    try {
      // This pushes the ad request to AdSense whenever the component mounts
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense Error:", e);
    }
  }, []);

  return (
    <div className={`w-full my-8 flex flex-col items-center justify-center bg-gray-50/50 rounded-lg overflow-hidden border border-gray-100 ${className}`}>
      {label && (
        <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 w-full text-center py-1 block">
          Publicidad
        </span>
      )}
      <div className="w-full flex justify-center min-h-[100px]">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
          {...(layout ? { 'data-ad-layout': layout } : {})}
        />
      </div>
    </div>
  );
};

export default AdUnit;
