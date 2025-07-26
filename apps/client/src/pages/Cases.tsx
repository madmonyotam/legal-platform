import { useTranslation } from 'react-i18next';

export const Cases = () => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: '2rem' }}>
      <h2>{t('cases.title')}</h2>
      <p>...</p>
    </div>
  );
};
