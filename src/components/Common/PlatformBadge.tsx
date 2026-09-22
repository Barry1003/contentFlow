import React from 'react';
import {
  Instagram,
  Video,
  Youtube,
  Twitter,
  Linkedin,
  Pin,
  Share2,
  Facebook,
} from 'lucide-react';
import { PLATFORM_STYLE_TOKENS } from '../../utils';

interface PlatformBadgeProps {
  platformId: string;
  showName?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dot' | 'chip' | 'icon';
  className?: string;
}

export const getPlatformIcon = (id: string, sizeClass = 'w-3.5 h-3.5 stroke-[1.5]') => {
  switch (id.toLowerCase()) {
    case 'instagram':
      return <Instagram className={sizeClass} />;
    case 'tiktok':
      return <Video className={sizeClass} />;
    case 'youtube':
      return <Youtube className={sizeClass} />;
    case 'x':
    case 'twitter':
      return <Twitter className={sizeClass} />;
    case 'facebook':
      return <Facebook className={sizeClass} />;
    case 'linkedin':
      return <Linkedin className={sizeClass} />;
    case 'pinterest':
      return <Pin className={sizeClass} />;
    default:
      return <Share2 className={sizeClass} />;
  }
};

export const getPlatformColor = (id: string): string => {
  const token = PLATFORM_STYLE_TOKENS[id.toLowerCase()];
  if (token) return token.dotColor;
  switch (id.toLowerCase()) {
    case 'instagram':
      return '#92576E';
    case 'tiktok':
      return '#525252';
    case 'youtube':
      return '#964F4F';
    case 'x':
    case 'twitter':
      return '#5A6168';
    case 'facebook':
      return '#506680';
    case 'linkedin':
      return '#466782';
    case 'pinterest':
      return '#865050';
    default:
      return '#6F6C66';
  }
};

export const PlatformBadge: React.FC<PlatformBadgeProps> = ({
  platformId,
  showName = false,
  size = 'md',
  variant = 'chip',
  className = '',
}) => {
  const pId = platformId.toLowerCase();
  const token = PLATFORM_STYLE_TOKENS[pId] || {
    name: platformId,
    dotColor: '#6F6C66',
    softBg: 'bg-transparent',
    textColor: 'text-[#2A2925] dark:text-[#D9D7D1]',
  };

  const dotSize = 'w-2 h-2';

  if (variant === 'dot' || !showName) {
    return (
      <span
        id={`platform-dot-${platformId}`}
        className={`inline-block rounded-full shrink-0 ${dotSize} ${className}`}
        style={{ backgroundColor: token.dotColor }}
        title={token.name}
      />
    );
  }

  return (
    <span
      id={`platform-badge-${platformId}`}
      className={`inline-flex items-center gap-1.5 text-xs text-[#2A2925] dark:text-[#D9D7D1] font-normal ${className}`}
      title={token.name}
    >
      <span
        className={`rounded-full shrink-0 ${dotSize}`}
        style={{ backgroundColor: token.dotColor }}
      />
      <span>{token.name}</span>
    </span>
  );
};
