import { Page } from '../components/Page';
import { useTranslation } from 'react-i18next';

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <h2>{t('notFound.title')}</h2>
      <p>{t('notFound.message')}</p>
    </Page>
  );
};
