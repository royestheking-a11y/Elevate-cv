import { SVGProps } from "react";

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="url(#paint0_linear)" />
      {/* E and C combined */}
      <path 
        d="M20 10H14C11.7909 10 10 11.7909 10 14V18C10 20.2091 11.7909 22 14 22H20" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M10 16H18" 
        stroke="white" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M22 14C22 11.7909 20.2091 10 18 10" 
        stroke="#D6A85F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M22 18C22 20.2091 20.2091 22 18 22" 
        stroke="#D6A85F" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
      />
      
      <defs>
        <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B2F2F" />
          <stop offset="1" stopColor="#1a1414" />
        </linearGradient>
      </defs>
    </svg>
  );
}