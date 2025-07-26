import type { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const Wrapper = styled.div`
  padding: 2rem;
`;

const Nav = styled.nav`
  margin-bottom: 2rem;
  a {
    margin-right: 1rem;
    text-decoration: none;
    color: ${({ theme }) => theme.colors.primary || 'blue'};
  }
`;

export const MainLayout = ({ children }: { children?: ReactNode }) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <Nav>
        <Link to="/">{t('nav.home')}</Link>
        <Link to="/cases">{t('nav.cases')}</Link>
        <Link to="/me">{t('nav.profile')}</Link>
        <Link to="/login">{t('nav.login')}</Link>
        <LanguageSwitcher />
      </Nav>
      {children ?? <Outlet />}
    </Wrapper>
  );
};
