import type { DefaultTheme } from 'styled-components';
import { merge } from 'lodash';

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
  colors: {
    background: '',
    text: '',
    primary: '',
  },
};

export const lightTheme: DefaultTheme = merge({}, themeBase, {
  colors: {
    background: '#ffffff',
    text: '#111111',
    primary: '#0077ff',
  }
});

export const darkTheme: DefaultTheme = merge({}, themeBase, {
  colors: {
    background: '#111111',
    text: '#ffffff',
    primary: '#00aaff',
  }
});

export type ThemeType = typeof themeBase;
