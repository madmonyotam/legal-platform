import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const CaseDetails = () => {
  const { id } = useParams();
  return (
    <Page>
      <h2>Case {id}</h2>
      <p>Details for case {id} will appear here.</p>
    </Page>
  );
};
