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
import type { JSX } from 'react';
import { NotFound } from '../pages/NotFound';

const protect = (element: JSX.Element) => <ProtectedRoute>{element}</ProtectedRoute>;

export const AppRoutes = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
        <Route path="/cases" element={protect(<CasesList />)} />
        <Route path="/cases/:id" element={protect(<CaseDetails />)} />
        <Route path="/cases/:id/edit" element={protect(<CaseEdit />)} />
        <Route path="/cases/:id/documents" element={protect(<CaseDocuments />)} />
        <Route path="/cases/:id/documents/upload" element={protect(<DocumentUpload />)} />
        <Route path="/cases/:id/analyze" element={protect(<CaseAnalyze />)} />
        <Route path="/drafts/:type" element={protect(<Draft />)} />
        <Route path="/me" element={protect(<Profile />)} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};