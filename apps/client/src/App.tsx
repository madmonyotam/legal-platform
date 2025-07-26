import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme } from './styles/theme';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Button } from './components/Button';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={
            <main style={{ padding: '2rem' }}>
              <h1>Legal Platform – Client</h1>
              <Button>התחל</Button>
            </main>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </Provider>
);