import type { ReactNode } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled from 'styled-components';

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

export const MainLayout = ({ children }: { children?: ReactNode }) => (
  <Wrapper>
    <Nav>
      <Link to="/">בית</Link>
      <Link to="/cases">תיקים</Link>
      <Link to="/me">פרופיל</Link>
      <Link to="/login">התחברות</Link>
    </Nav>
    {children ?? <Outlet />}
  </Wrapper>
);
