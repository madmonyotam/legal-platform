import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { Page } from '../components/Page';
import { GenericForm } from '../components/form/GenericForm';
import { useTranslation } from 'react-i18next';
import type { FormSchema } from '../types/formTypes';

export const Login = () => {
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const { t } = useTranslation();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const loginSchema: FormSchema = {
    mode: 'default',
    submitLabel: isLoading ? t('auth.logging_in') : t('auth.login'),
    validationMode: 'onBlur',
    elements: [
      {
        type: 'input',
        setPath: 'email',
        inputType: 'email',
        label: t('auth.email'),
        placeholder: t('auth.email_placeholder'),
        required: true
      },
      {
        type: 'input',
        setPath: 'password',
        inputType: 'password',
        label: t('auth.password'),
        placeholder: t('auth.password_placeholder'),
        required: true,
        validation: {
          min: 6
        }
      }
    ]
  };

  const handleSubmit = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <Page>
      <h2>{t('auth.login_title')}</h2>
      <GenericForm
        schema={loginSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={handleSubmit}
      />
      {error && <div style={{color: 'red'}}>{error}</div>}
    </Page>
  );
};


