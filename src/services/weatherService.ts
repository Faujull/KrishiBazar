import { useState, useEffect, useCallback, useRef } from 'react';
import {
  OpenMeteoApiResponse,
  NormalizedWeatherData,
  DailyForecastItem,
  Farm
} from '../types';

/**
 * Open-Meteo Weather API Configuration
 * Official Endpoint: https://api.open-meteo.com/v1/forecast
 */
export const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Default Agricultural Hub Coordinates (Bogura Sadar / North Bengal)
export const DEFAULT_COORDINATES = {
  lat: 24.8481,
  lng: 89.3730,
  districtBn: 'বগুড়া',
  districtEn: 'Bogura'
};

/**
 * Common Agricultural Districts Coordinates in Bangladesh for instant location resolution
 */
export const BANGLADESH_DISTRICT_COORDINATES: Record<
  string,
  { lat: number; lng: number; districtBn: string; districtEn: string }
> = {
  'বগুড়া': { lat: 24.8481, lng: 89.3730, districtBn: 'বগুড়া', districtEn: 'Bogura' },
  'bogura': { lat: 24.8481, lng: 89.3730, districtBn: 'বগুড়া', districtEn: 'Bogura' },
  'bogra': { lat: 24.8481, lng: 89.3730, districtBn: 'বগুড়া', districtEn: 'Bogura' },
  'রংপুর': { lat: 25.7439, lng: 89.2752, districtBn: 'রংপুর', districtEn: 'Rangpur' },
  'rangpur': { lat: 25.7439, lng: 89.2752, districtBn: 'রংপুর', districtEn: 'Rangpur' },
  'ঢাকা': { lat: 23.8103, lng: 90.4125, districtBn: 'ঢাকা', districtEn: 'Dhaka' },
  'dhaka': { lat: 23.8103, lng: 90.4125, districtBn: 'ঢাকা', districtEn: 'Dhaka' },
  'যশোর': { lat: 23.1664, lng: 89.2081, districtBn: 'যশোর', districtEn: 'Jashore' },
  'jashore': { lat: 23.1664, lng: 89.2081, districtBn: 'যশোর', districtEn: 'Jashore' },
  'jessore': { lat: 23.1664, lng: 89.2081, districtBn: 'যশোর', districtEn: 'Jashore' },
  'দিনাজপুর': { lat: 25.6279, lng: 88.6332, districtBn: 'দিনাজপুর', districtEn: 'Dinajpur' },
  'dinajpur': { lat: 25.6279, lng: 88.6332, districtBn: 'দিনাজপুর', districtEn: 'Dinajpur' },
  'রাজশাহী': { lat: 24.3745, lng: 88.6042, districtBn: 'রাজশাহী', districtEn: 'Rajshahi' },
  'rajshahi': { lat: 24.3745, lng: 88.6042, districtBn: 'রাজশাহী', districtEn: 'Rajshahi' },
  'ময়মনসিংহ': { lat: 24.7471, lng: 90.4203, districtBn: 'ময়মনসিংহ', districtEn: 'Mymensingh' },
  'mymensingh': { lat: 24.7471, lng: 90.4203, districtBn: 'ময়মনসিংহ', districtEn: 'Mymensingh' },
  'কুমিল্লা': { lat: 23.4682, lng: 91.1788, districtBn: 'কুমিল্লা', districtEn: 'Cumilla' },
  'cumilla': { lat: 23.4682, lng: 91.1788, districtBn: 'কুমিল্লা', districtEn: 'Cumilla' },
  'চট্টগ্রাম': { lat: 22.3569, lng: 91.7832, districtBn: 'চট্টগ্রাম', districtEn: 'Chattogram' },
  'chattogram': { lat: 22.3569, lng: 91.7832, districtBn: 'চট্টগ্রাম', districtEn: 'Chattogram' },
  'সিলেট': { lat: 24.8949, lng: 91.8687, districtBn: 'সিলেট', districtEn: 'Sylhet' },
  'sylhet': { lat: 24.8949, lng: 91.8687, districtBn: 'সিলেট', districtEn: 'Sylhet' },
  'বরিশাল': { lat: 22.7010, lng: 90.3535, districtBn: 'বরিশাল', districtEn: 'Barishal' },
  'barishal': { lat: 22.7010, lng: 90.3535, districtBn: 'বরিশাল', districtEn: 'Barishal' },
  'খুলনা': { lat: 22.8456, lng: 89.5403, districtBn: 'খুলনা', districtEn: 'Khulna' },
  'khulna': { lat: 22.8456, lng: 89.5403, districtBn: 'খুলনা', districtEn: 'Khulna' },
  'কুষ্টিয়া': { lat: 23.9013, lng: 89.1205, districtBn: 'কুষ্টিয়া', districtEn: 'Kushtia' },
  'kushtia': { lat: 23.9013, lng: 89.1205, districtBn: 'কুষ্টিয়া', districtEn: 'Kushtia' }
};

/**
 * Resolves latitude and longitude for a given farm or district
 */
export function resolveFarmCoordinates(
  farm?: Partial<Farm> | null,
  fallbackDistrict?: string
): { lat: number; lng: number; districtBn: string; districtEn: string } {
  if (
    farm?.latitude != null &&
    farm?.longitude != null &&
    !isNaN(farm.latitude) &&
    !isNaN(farm.longitude)
  ) {
    return {
      lat: farm.latitude,
      lng: farm.longitude,
      districtBn: farm.district || DEFAULT_COORDINATES.districtBn,
      districtEn: farm.district || DEFAULT_COORDINATES.districtEn
    };
  }

  const lookupKey = (farm?.district || fallbackDistrict || '').trim().toLowerCase();
  if (lookupKey && BANGLADESH_DISTRICT_COORDINATES[lookupKey]) {
    return BANGLADESH_DISTRICT_COORDINATES[lookupKey];
  }

  return DEFAULT_COORDINATES;
}

export type WeatherIconType =
  | 'Sun'
  | 'CloudSun'
  | 'Cloud'
  | 'CloudFog'
  | 'CloudDrizzle'
  | 'CloudRain'
  | 'CloudLightning'
  | 'Snowflake';

export interface WeatherCodeDetails {
  descriptionEn: string;
  descriptionBn: string;
  iconName: WeatherIconType;
}

/**
 * WMO Weather interpretation code (WW)
 * https://open-meteo.com/en/docs
 */
export function getWeatherInterpretation(code: number): WeatherCodeDetails {
  switch (code) {
    case 0:
      return {
        descriptionEn: 'Clear sky',
        descriptionBn: 'পরিষ্কার আকাশ',
        iconName: 'Sun'
      };
    case 1:
      return {
        descriptionEn: 'Mainly clear',
        descriptionBn: 'মূলত পরিষ্কার',
        iconName: 'CloudSun'
      };
    case 2:
      return {
        descriptionEn: 'Partly cloudy',
        descriptionBn: 'আংশিক মেঘলা',
        iconName: 'CloudSun'
      };
    case 3:
      return {
        descriptionEn: 'Overcast',
        descriptionBn: 'মেঘাচ্ছন্ন আকাশ',
        iconName: 'Cloud'
      };
    case 45:
    case 48:
      return {
        descriptionEn: 'Foggy',
        descriptionBn: 'কুয়াশাচ্ছন্ন',
        iconName: 'CloudFog'
      };
    case 51:
      return {
        descriptionEn: 'Light drizzle',
        descriptionBn: 'হালকা গুঁড়ি গুঁড়ি বৃষ্টি',
        iconName: 'CloudDrizzle'
      };
    case 53:
      return {
        descriptionEn: 'Moderate drizzle',
        descriptionBn: 'মাঝারি গুঁড়ি গুঁড়ি বৃষ্টি',
        iconName: 'CloudDrizzle'
      };
    case 55:
      return {
        descriptionEn: 'Dense drizzle',
        descriptionBn: 'ঘন গুঁড়ি গুঁড়ি বৃষ্টি',
        iconName: 'CloudDrizzle'
      };
    case 56:
    case 57:
      return {
        descriptionEn: 'Freezing drizzle',
        descriptionBn: 'হিমশীতল গুঁড়ি বৃষ্টি',
        iconName: 'CloudDrizzle'
      };
    case 61:
      return {
        descriptionEn: 'Slight rain',
        descriptionBn: 'হালকা বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 63:
      return {
        descriptionEn: 'Moderate rain',
        descriptionBn: 'মাঝারি বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 65:
      return {
        descriptionEn: 'Heavy rain',
        descriptionBn: 'ভারী বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 66:
    case 67:
      return {
        descriptionEn: 'Freezing rain',
        descriptionBn: 'হিমশীতল বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        descriptionEn: 'Snow fall',
        descriptionBn: 'তুষারপাত',
        iconName: 'Snowflake'
      };
    case 80:
      return {
        descriptionEn: 'Slight rain showers',
        descriptionBn: 'হালকা পশলা বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 81:
      return {
        descriptionEn: 'Moderate rain showers',
        descriptionBn: 'মাঝারি পশলা বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 82:
      return {
        descriptionEn: 'Violent rain showers',
        descriptionBn: 'প্রবল পশলা বৃষ্টি',
        iconName: 'CloudRain'
      };
    case 85:
    case 86:
      return {
        descriptionEn: 'Snow showers',
        descriptionBn: 'তুষার ঝাপটা',
        iconName: 'Snowflake'
      };
    case 95:
      return {
        descriptionEn: 'Thunderstorm',
        descriptionBn: 'বজ্রবিদ্যুৎসহ বৃষ্টি',
        iconName: 'CloudLightning'
      };
    case 96:
    case 99:
      return {
        descriptionEn: 'Thunderstorm with hail',
        descriptionBn: 'শিলাবৃষ্টিসহ বজ্রঝড়',
        iconName: 'CloudLightning'
      };
    default:
      if (code >= 60 && code < 70) {
        return {
          descriptionEn: 'Rain',
          descriptionBn: 'বৃষ্টি',
          iconName: 'CloudRain'
        };
      }
      return {
        descriptionEn: 'Partly cloudy',
        descriptionBn: 'আংশিক মেঘলা',
        iconName: 'CloudSun'
      };
  }
}

/**
 * Utility to convert English numbers to Bengali numerals
 */
export function toBengaliNumber(value: number | string | undefined | null): string {
  if (value == null) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(value).replace(/[0-9]/g, (digit) => bnDigits[parseInt(digit, 10)]);
}

/**
 * Default fallback weather data (used during initial load, network failure, or offline mode)
 * Matches existing KrishiBazar UI mock values for zero layout shift.
 */
export const FALLBACK_WEATHER: NormalizedWeatherData = {
  temperature: 34,
  humidity: 78,
  precipitation: 0.5,
  windSpeed: 12,
  weatherCode: 2,
  weatherDescription: 'Partly Cloudy',
  weatherDescriptionEn: 'Partly Cloudy',
  weatherDescriptionBn: 'আংশিক মেঘলা',
  highTemperature: 35,
  lowTemperature: 26,
  dailyForecast: [
    {
      date: '২০২৬-০৬-১৫',
      weatherCode: 2,
      weatherDescriptionEn: 'Partly cloudy',
      weatherDescriptionBn: 'আংশিক মেঘলা',
      tempMax: 35,
      tempMin: 26,
      precipitationSum: 0.5
    },
    {
      date: '২০২৬-০৬-১৬',
      weatherCode: 61,
      weatherDescriptionEn: 'Slight rain',
      weatherDescriptionBn: 'হালকা বৃষ্টি',
      tempMax: 33,
      tempMin: 25,
      precipitationSum: 4.2
    },
    {
      date: '২০২৬-০৬-১৭',
      weatherCode: 95,
      weatherDescriptionEn: 'Thunderstorm',
      weatherDescriptionBn: 'বজ্রবিদ্যুৎসহ বৃষ্টি',
      tempMax: 31,
      tempMin: 24,
      precipitationSum: 15.0
    },
    {
      date: '২০২৬-০৬-১৮',
      weatherCode: 1,
      weatherDescriptionEn: 'Mainly clear',
      weatherDescriptionBn: 'মূলত পরিষ্কার',
      tempMax: 34,
      tempMin: 25,
      precipitationSum: 0.0
    },
    {
      date: '২০২৬-০৬-১৯',
      weatherCode: 2,
      weatherDescriptionEn: 'Partly cloudy',
      weatherDescriptionBn: 'আংশিক মেঘলা',
      tempMax: 35,
      tempMin: 26,
      precipitationSum: 1.0
    }
  ],
  latitude: DEFAULT_COORDINATES.lat,
  longitude: DEFAULT_COORDINATES.lng,
  locationNameBn: DEFAULT_COORDINATES.districtBn,
  locationNameEn: DEFAULT_COORDINATES.districtEn,
  isLive: false,
  lastUpdated: 'ডিফল্ট ডেটা'
};

// In-memory weather cache to prevent unnecessary repeat requests (TTL: 10 minutes)
interface CacheEntry {
  data: NormalizedWeatherData;
  timestamp: number;
}
const weatherCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

/**
 * Normalizes raw Open-Meteo response into KrishiBazar standard weather format
 */
export function normalizeOpenMeteoResponse(
  raw: OpenMeteoApiResponse,
  locationNameBn?: string,
  locationNameEn?: string
): NormalizedWeatherData {
  const current = raw.current;
  const daily = raw.daily;

  const currentCode = current?.weather_code ?? 0;
  const interp = getWeatherInterpretation(currentCode);

  const dailyForecast: DailyForecastItem[] = [];
  if (daily && Array.isArray(daily.time)) {
    const count = Math.min(daily.time.length, 7);
    for (let i = 0; i < count; i++) {
      const code = daily.weather_code?.[i] ?? 0;
      const dailyInterp = getWeatherInterpretation(code);
      dailyForecast.push({
        date: daily.time[i],
        weatherCode: code,
        weatherDescriptionEn: dailyInterp.descriptionEn,
        weatherDescriptionBn: dailyInterp.descriptionBn,
        tempMax: Math.round(daily.temperature_2m_max?.[i] ?? 0),
        tempMin: Math.round(daily.temperature_2m_min?.[i] ?? 0),
        precipitationSum: daily.precipitation_sum?.[i] ?? 0
      });
    }
  }

  const highTemp =
    daily && Array.isArray(daily.temperature_2m_max) && daily.temperature_2m_max.length > 0
      ? Math.round(daily.temperature_2m_max[0])
      : Math.round(current.temperature_2m + 2);

  const lowTemp =
    daily && Array.isArray(daily.temperature_2m_min) && daily.temperature_2m_min.length > 0
      ? Math.round(daily.temperature_2m_min[0])
      : Math.round(current.temperature_2m - 4);

  return {
    temperature: Math.round(current.temperature_2m * 10) / 10,
    humidity: Math.round(current.relative_humidity_2m),
    precipitation: current.precipitation ?? 0,
    windSpeed: Math.round(current.wind_speed_10m * 10) / 10,
    weatherCode: currentCode,
    weatherDescription: interp.descriptionEn,
    weatherDescriptionEn: interp.descriptionEn,
    weatherDescriptionBn: interp.descriptionBn,
    highTemperature: highTemp,
    lowTemperature: lowTemp,
    dailyForecast,
    latitude: raw.latitude,
    longitude: raw.longitude,
    locationNameBn,
    locationNameEn,
    isLive: true,
    lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

/**
 * Fetch live weather data from Open-Meteo for specified latitude and longitude
 */
export async function fetchWeatherData(
  latitude: number,
  longitude: number,
  locationNameBn?: string,
  locationNameEn?: string,
  forceRefresh = false,
  signal?: AbortSignal
): Promise<NormalizedWeatherData> {
  const cacheKey = `${latitude.toFixed(3)},${longitude.toFixed(3)}`;

  // Return cached result if valid
  if (!forceRefresh) {
    const cached = weatherCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return cached.data;
    }
  }

  // Construct official Open-Meteo Forecast query
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
    timezone: 'auto'
  });

  const url = `${OPEN_METEO_BASE_URL}?${queryParams.toString()}`;

  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Open-Meteo API HTTP error ${response.status}`);
  }

  const rawData: OpenMeteoApiResponse = await response.json();
  const normalized = normalizeOpenMeteoResponse(rawData, locationNameBn, locationNameEn);

  // Store in cache
  weatherCache.set(cacheKey, {
    data: normalized,
    timestamp: Date.now()
  });

  return normalized;
}

export interface UseWeatherOptions {
  farm?: Partial<Farm> | null;
  lat?: number;
  lng?: number;
  district?: string;
  autoFetch?: boolean;
}

export interface UseWeatherResult {
  weather: NormalizedWeatherData;
  loading: boolean;
  error: string | null;
  isLive: boolean;
  refetch: () => Promise<void>;
  resolvedLocation: {
    lat: number;
    lng: number;
    districtBn: string;
    districtEn: string;
  };
}

/**
 * Reusable React Hook for consuming Open-Meteo weather
 * Automatically handles coordinates fallback, loading, error, and cached data.
 */
export function useWeather(options?: UseWeatherOptions): UseWeatherResult {
  const resolved = resolveFarmCoordinates(
    options?.farm || {
      latitude: options?.lat,
      longitude: options?.lng,
      district: options?.district
    },
    options?.district
  );

  const [weather, setWeather] = useState<NormalizedWeatherData>(() => {
    const latNum = resolved?.lat ?? DEFAULT_COORDINATES.lat;
    const lngNum = resolved?.lng ?? DEFAULT_COORDINATES.lng;
    const cacheKey = `${latNum.toFixed(3)},${lngNum.toFixed(3)}`;
    const cached = weatherCache.get(cacheKey);
    if (cached && cached.data) return cached.data;
    return {
      ...FALLBACK_WEATHER,
      latitude: latNum,
      longitude: lngNum,
      locationNameBn: resolved?.districtBn || DEFAULT_COORDINATES.districtBn,
      locationNameEn: resolved?.districtEn || DEFAULT_COORDINATES.districtEn
    };
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadData = useCallback(
    async (force = false) => {
      const lat = resolved?.lat ?? DEFAULT_COORDINATES.lat;
      const lng = resolved?.lng ?? DEFAULT_COORDINATES.lng;
      const dNameBn = resolved?.districtBn || DEFAULT_COORDINATES.districtBn;
      const dNameEn = resolved?.districtEn || DEFAULT_COORDINATES.districtEn;

      // Abort previous in-flight request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const data = await fetchWeatherData(
          lat,
          lng,
          dNameBn,
          dNameEn,
          force,
          controller.signal
        );
        if (data) {
          setWeather(data);
        }
      } catch (err: unknown) {
        if ((err as Error)?.name === 'AbortError') return;
        console.warn('Weather fetch fallback triggered:', err);
        setError((err as Error)?.message || 'Failed to fetch weather');
        // Graceful fallback to default mock weather without UI crashes
        setWeather((prev) => ({
          ...(prev || FALLBACK_WEATHER),
          latitude: lat,
          longitude: lng,
          locationNameBn: dNameBn,
          locationNameEn: dNameEn,
          isLive: false
        }));
      } finally {
        setLoading(false);
      }
    },
    [resolved.lat, resolved.lng, resolved.districtBn, resolved.districtEn]
  );

  useEffect(() => {
    if (options?.autoFetch === false) return;
    loadData(false);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadData, options?.autoFetch]);

  return {
    weather: weather || FALLBACK_WEATHER,
    loading,
    error,
    isLive: Boolean(weather?.isLive),
    refetch: () => loadData(true),
    resolvedLocation: resolved
  };
}
