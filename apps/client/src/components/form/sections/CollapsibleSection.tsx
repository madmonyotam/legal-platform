import { useState } from 'react';
import styled from 'styled-components';
import type { Section } from '../../../types/formTypes';

interface Props {
    section: Section;
    children: React.ReactNode;
}

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.gray100};
  padding: 0.75rem 1rem;
  cursor: pointer;
  font-weight: bold;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content = styled.div`
  padding: 1rem;
`;

export const CollapsibleSection = ({ section, children }: Props) => {
    const [open, setOpen] = useState(true);

    return (
        <Wrapper style={section.extraProps}>
            <Header onClick={() => setOpen((prev) => !prev)}>
                {section.title}
                <span>{open ? '▾' : '▸'}</span>
            </Header>
            {open && <Content>{children}</Content>}
        </Wrapper>
    );
};
