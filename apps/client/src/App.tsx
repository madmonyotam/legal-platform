import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './components/AuthProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import './i18n';

export const App = () => (
  <Provider store={store}>
    <AuthProvider>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  </Provider>
);