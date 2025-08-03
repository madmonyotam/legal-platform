import styled from "styled-components";

export const Button = styled.button`
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    padding: ${({ theme }) => {
        console.log('Spacing:', theme.spacing);
        return `${theme.spacing.sm} ${theme.spacing.md}`;
    }};
    border: none;
    border-radius: ${({ theme }) => theme.radii.md};
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primaryHover};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;

export const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
`;