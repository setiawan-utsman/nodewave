import React from 'react'
import {Route, Routes } from 'react-router-dom';
import AppLayoutPage from '../components/AppLayoutPage';
import AdminPage from './Administrator/AdminPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


export default function IndexsRouting() {
  return (
    // <BrowserRouter>
    <Routes>
      <Route path="" element={<AppLayoutPage />}>
        <Route
          path="admin"
          element={
            <React.Suspense>
              <QueryClientProvider client={queryClient}>
                <AdminPage />
              </QueryClientProvider>
            </React.Suspense>
          }
        />

        {/* <Route index element={<Navigate to={"admin"} />} /> */}
      </Route>
    </Routes>
    // </BrowserRouter>
  );
}
