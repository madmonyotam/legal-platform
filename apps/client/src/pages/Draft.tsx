import { Page } from '../components/Page';
import { useParams } from 'react-router-dom';

export const Draft = () => {
  const { type } = useParams();
  return (
    <Page>
      <h2>Create Draft: {type}</h2>
      <p>Draft editor for {type} will appear here.</p>
    </Page>
  );
};
