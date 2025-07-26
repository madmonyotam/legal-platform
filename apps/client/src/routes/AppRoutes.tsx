import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cases } from '../pages/Cases';
import { Button } from '../components/Button';
import { MainLayout } from './MainLayout';
import { useTranslation } from 'react-i18next';

export const AppRoutes = () => {
    const { t } = useTranslation();
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path="/"
                    element={
                        <main style={{ padding: '2rem' }}>
                            <h1>{t('home.title')}</h1>
                            <Button>{t('home.start')}</Button>
                        </main>
                    }
                />
                <Route path="/cases" element={<Cases />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
};