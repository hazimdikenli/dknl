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
import UsersPage from './pages/auth/user/UsersPage';
import UsersForm from './pages/auth/user/UsersForm';

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainLayout content={<Home/>}></MainLayout>} />
          <Route path="/auth/permissions" element={
          <MainLayout content={<PermissionsPage />} />
          } />
          <Route path="/auth/roles" element={
          <MainLayout content={<RolesPage />}/>} />
          <Route path="/auth/roles/new" element={
          <MainLayout content={<NewRole />}/>} />
          <Route path="/auth/users" element={
          <MainLayout content={<UsersPage />}/>} />
          <Route path="/auth/users/new" element={
          <MainLayout content={<UsersForm />}/>} />
        </Routes>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
