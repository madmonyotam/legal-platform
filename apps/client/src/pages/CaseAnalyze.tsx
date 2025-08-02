import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const CaseAnalyze = () => {
  const { id } = useParams();
  return (
    <Page>
      <h2>Analyze Case {id}</h2>
      <p>AI analysis results will appear here.</p>
    </Page>
  );
};
