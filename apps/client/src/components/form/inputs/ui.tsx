import styled from 'styled-components';

export const Label = styled.label`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  display: block;
`;

export const ErrorText = styled(Label)`
  color: ${({ theme }) => theme.colors.danger};
  font-size: 0.875rem;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
`;