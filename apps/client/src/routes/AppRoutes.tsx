import { Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Login } from '../pages/Login';
import { CasesList } from '../pages/CasesList';
import { CaseDetails } from '../pages/CaseDetails';
import { CaseEdit } from '../pages/CaseEdit';
import { CaseDocuments } from '../pages/CaseDocuments';
import { DocumentUpload } from '../pages/DocumentUpload';
import { CaseAnalyze } from '../pages/CaseAnalyze';
import { Draft } from '../pages/Draft';
import { Profile } from '../pages/Profile';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { Button } from '../components/Button';
import { MainLayout } from './MainLayout';

export const AppRoutes = () => {
  const { t } = useTranslation();
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <main style={{ padding: '2rem' }}>
              <h1>{t('welcome')}</h1>
              <Button>{t('start')}</Button>
            </main>
          }
        />
      <Route path="/login" element={<Login />} />
      <Route
        path="/cases"
        element={
          <ProtectedRoute>
            <CasesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id"
        element={
          <ProtectedRoute>
            <CaseDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id/edit"
        element={
          <ProtectedRoute>
            <CaseEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id/documents"
        element={
          <ProtectedRoute>
            <CaseDocuments />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id/documents/upload"
        element={
          <ProtectedRoute>
            <DocumentUpload />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cases/:id/analyze"
        element={
          <ProtectedRoute>
            <CaseAnalyze />
          </ProtectedRoute>
        }
      />
      <Route
        path="/drafts/:type"
        element={
          <ProtectedRoute>
            <Draft />
          </ProtectedRoute>
        }
      />
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
    </Routes>
  );
};
