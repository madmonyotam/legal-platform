import type { DefaultTheme } from 'styled-components';
import { merge } from 'lodash';

export const themeBase = {
  colors: {
    background: '',
    text: '',
    primary: '',
  }
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
