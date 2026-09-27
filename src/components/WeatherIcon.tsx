import React from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Snowflake
} from 'lucide-react';
import { WeatherIconType } from '../services/weatherService';

interface WeatherIconProps {
  iconName?: WeatherIconType | string;
  className?: string;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({
  iconName = 'CloudSun',
  className = 'w-6 h-6'
}) => {
  switch (iconName) {
    case 'Sun':
      return <Sun className={className} />;
    case 'CloudSun':
      return <CloudSun className={className} />;
    case 'Cloud':
      return <Cloud className={className} />;
    case 'CloudFog':
      return <CloudFog className={className} />;
    case 'CloudDrizzle':
      return <CloudDrizzle className={className} />;
    case 'CloudRain':
      return <CloudRain className={className} />;
    case 'CloudLightning':
      return <CloudLightning className={className} />;
    case 'Snowflake':
      return <Snowflake className={className} />;
    default:
      return <CloudSun className={className} />;
  }
};
