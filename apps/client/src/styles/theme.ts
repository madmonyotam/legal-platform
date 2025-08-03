import type { DefaultTheme } from 'styled-components';
import { merge } from 'lodash-es';

export const themeBase = {
  font: {
    family: 'Segoe UI, sans-serif',
    size: '1rem',
    weight: '400'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  },
  radii: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',    // 8px
    lg: '1rem'       // 16px
  },
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: '#0077ff',
    primaryHover: '#005bb5',
    border: '#cccccc',
    gray100: '#f0f0f0',
    danger: '#ff4d4f',
    success: '#52c41a',
    warning: '#faad14',
  },
};

export const lightTheme: DefaultTheme = merge({}, themeBase, {
  colors: {
    border: '#e0e0e0',
  }
});

export const darkTheme: DefaultTheme = merge({}, themeBase, {
  colors: {
    background: '#111111',
    text: '#ffffff',
    primary: '#00aaff',
    border: '#444444',
    gray100: '#1e1e1e'
  }
});

export type ThemeType = typeof themeBase;
