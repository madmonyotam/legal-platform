import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const toggle = () => {
    const next = i18n.language === 'en' ? 'he' : 'en';
    i18n.changeLanguage(next);
  };
  return (
    <button onClick={toggle} style={{ marginLeft: '1rem' }}>
      {i18n.language === 'en' ? 'עברית' : 'English'}
    </button>
  );
};
