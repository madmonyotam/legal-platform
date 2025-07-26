import { Page } from '../components/Page';
import { useTranslation } from 'react-i18next';

export const CasesList = () => {
  const { t } = useTranslation();
  return (
    <Page>
      <h2>{t('cases.title')}</h2>
      <p>List of cases will appear here.</p>
    </Page>
  );
};
