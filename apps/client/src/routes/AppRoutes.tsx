import { Routes, Route } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Button } from '../components/Button';
import { MainLayout } from './MainLayout';

export const AppRoutes = () => (
    <Routes>
        <Route element={<MainLayout />}>
            <Route
                path="/"
                element={
                    <main style={{ padding: '2rem' }}>
                        <h1>Legal Platform – Client</h1>
                        <Button>התחל</Button>
                    </main>
                }
            />
            <Route path="/login" element={<Login />} />
        </Route>
    </Routes>
);