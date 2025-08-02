import type { DefaultTheme } from 'styled-components';
import { merge } from 'lodash-es';

export const themeBase = {
  font: {
    family: 'Segoe UI, sans-serif',
    size: '16px',
    weight: '400'
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '16px'
  },
  colors: {
    background: '',
    text: '',
    primary: '',
    border: '',
    gray100: ''
  },
};

export const lightTheme: DefaultTheme = merge({}, themeBase, {
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: '#0077ff',
    border: '#e0e0e0',
    gray100: '#f5f5f5'
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
