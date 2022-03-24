import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import PermissionsPage from './pages/auth/permission/PermissionsPage';
import RolesPage from './pages/auth/role/RolesPage';
import NewRole from './pages/auth/role/NewRole';
import MainLayout from './components/layout/mainlayout/MainLayout';
import Home from './pages/home/Home';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout content={<Home/>}></MainLayout>} />
          <Route path="/auth/permissions" element={<PermissionsPage />} />
          <Route path="/auth/roles" element={<RolesPage />} />
          <Route path="/auth/roles/new" element={<NewRole />} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
