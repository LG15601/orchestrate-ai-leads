import React from 'react';
import logoAgentConnect from '@/assets/logo-agentconnect.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className = '', size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10', 
    lg: 'w-12 h-12'
  };

  return (
    <img 
      src={logoAgentConnect} 
      alt="AgentConnect Logo" 
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
};

export default Logo;
