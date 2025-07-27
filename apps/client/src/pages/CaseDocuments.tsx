import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const CaseDocuments = () => {
  const { id } = useParams();
  return (
    <Page>
      <h2>Case {id} Documents</h2>
      <p>Documents list will appear here.</p>
    </Page>
  );
};
