
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const BananaIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 13.33c2.35-2.22 3.88-5.33 4-8.83 0-1 .4-2.5 2-2.5s2 1.5 2 2.5c.12 3.5 1.65 6.61 4 8.83"/>
    <path d="M4 14c0 4.42 3.58 8 8 8s8-3.58 8-8c0-3.13-2.03-6.2-4-7.5"/>
  </svg>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export const MagicWandIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 4V2"/>
    <path d="M15 10V8"/>
    <path d="M12.5 6.5L14 5"/>
    <path d="M12.5 8.5L14 10"/>
    <path d="M5 4V2"/>
    <path d="M5 10V8"/>
    <path d="M2.5 6.5L4 5"/>
    <path d="M2.5 8.5L4 10"/>
    <path d="M9 18l-6-6 6-6"/>
    <path d="M20 12h-8"/>
    <path d="M18 21l-3-3 3-3"/>
    <path d="M20.5 16.5L22 15"/>
    <path d="M18.5 16.5L17 15"/>
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="m12 3-1.9 5.8-5.8 1.9 5.8 1.9L12 18l1.9-5.8 5.8-1.9-5.8-1.9L12 3z"/>
        <path d="M5 3v4"/>
        <path d="M19 17v4"/>
        <path d="M3 5h4"/>
        <path d="M17 19h4"/>
    </svg>
);

export const AlertTriangleIcon: React.FC<IconProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);
