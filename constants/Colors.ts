/**
 * 4wise brand palette
 * - primary bg: #0B0F1A
 * - accent blue: #3B82F6
 * - accent green: #22C55E
 */
const brand = {
  bg: '#0B0F1A',
  blue: '#3B82F6',
  green: '#22C55E',
  slate50: '#F8FAFC',
  slate100: '#F1F5F9',
  slate200: '#E2E8F0',
  slate400: '#94A3B8',
  slate500: '#64748B',
  slate700: '#334155',
  slate800: '#1F2937',
  slate900: '#0F172A',
  white: '#FFFFFF',
  black: '#000000',
};

export default {
  light: {
    text: brand.slate900,
    background: brand.slate50,
    tint: brand.blue,
    tabIconDefault: brand.slate400,
    tabIconSelected: brand.blue,
  },
  dark: {
    text: brand.slate100,
    background: brand.bg,
    tint: brand.blue,
    tabIconDefault: brand.slate500,
    tabIconSelected: brand.blue,
  },
  brand,
} as const;
