import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const DocumentUpload = () => {
  const { id } = useParams();
  return (
    <Page>
      <h2>Upload Document for Case {id}</h2>
      <p>Document upload form will appear here.</p>
    </Page>
  );
};
