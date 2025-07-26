import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Button = styled.button`
  margin-left: 0.5rem;
`;

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const toggle = () => {
    const next = i18n.language === 'en' ? 'he' : 'en';
    void i18n.changeLanguage(next);
  };

  return <Button onClick={toggle}>{i18n.language === 'en' ? 'HE' : 'EN'}</Button>;
};
