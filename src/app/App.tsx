import React from 'react';
import ResumePage from './pages/ResumePage';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/Auth/SignInPage';
import RegisterPage from './pages/Auth/RegisterPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrivateRouter from './pages/Auth/PrivateRouter';
import IndexsRouting from './pages/IndexsRouting';
// import logo from './logo.svg';
// import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to={"signin"} />}></Route>
        <Route
          path="signin"
          element={
            <React.Suspense>
              <QueryClientProvider client={queryClient}>
                <SignInPage />
              </QueryClientProvider>
            </React.Suspense>
          }
        />
        <Route
          path="register"
          element={
            <React.Suspense>
              <QueryClientProvider client={queryClient}>
                <RegisterPage />
              </QueryClientProvider>
            </React.Suspense>
          }
        />
        {/* <Route
          path="*"
          element={
            <React.Suspense>
              <PrivateRouter />
                <Route path='*' element={<IndexsRouting />} />
            </React.Suspense>
          }
        /> */}
        <Route element={<PrivateRouter />}>
          <Route path="*" element={<React.Suspense><IndexsRouting /></React.Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
