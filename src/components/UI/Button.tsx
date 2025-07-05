"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { audioPlayer } from '@/utils/audio';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  external?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  onClick,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  type = 'button',
  ariaLabel,
  external = false,
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none';
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-space-purple-600 hover:bg-space-purple-700 text-white shadow-space-sm hover:shadow-space hover:translate-y-[-2px] active:translate-y-[1px]',
    secondary: 'bg-space-blue-600 hover:bg-space-blue-700 text-white shadow-space-sm hover:shadow-space hover:translate-y-[-2px] active:translate-y-[1px]',
    outline: 'bg-transparent border border-space-purple-500 hover:bg-space-purple-900/20 text-white hover:shadow-space-sm hover:translate-y-[-2px] active:translate-y-[1px]',
    ghost: 'bg-transparent hover:bg-space-purple-900/10 text-white',
  };
  
  // Disabled styles
  const disabledStyles = 'opacity-50 cursor-not-allowed pointer-events-none';
  
  // Full width style
  const fullWidthStyle = fullWidth ? 'w-full' : '';
  
  // Combine all styles
  const buttonStyles = `
    ${baseStyles} 
    ${sizeStyles[size]} 
    ${variantStyles[variant]} 
    ${disabled ? disabledStyles : ''} 
    ${fullWidthStyle}
    ${className}
  `;
  
  const handleClick = () => {
    if (!disabled && onClick) {
      audioPlayer.playClick();
      onClick();
    }
  };
  
  const handleHover = () => {
    if (!disabled) {
      audioPlayer.playHover();
    }
  };
  
  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  // Render as link if href is provided
  if (href) {
    return (
      <Link
        href={href}
        className={buttonStyles}
        onClick={handleClick}
        onMouseEnter={handleHover}
        aria-label={ariaLabel}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </Link>
    );
  }
  
  // Otherwise render as button
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      className={buttonStyles}
      onClick={handleClick}
      onMouseEnter={handleHover}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
} 