import React from 'react';

interface HeroIconProps {
  icon: string;
  className?: string;
}

export const HeroIcon: React.FC<HeroIconProps> = ({ icon, className }) => {
  const classes = [icon, className].filter(Boolean).join(' ');
  return <i className={classes}></i>;
};
