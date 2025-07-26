import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const CaseEdit = () => {
  const { id } = useParams();
  return (
    <Page>
      <h2>Edit Case {id}</h2>
      <p>Case editing form will appear here.</p>
    </Page>
  );
};
