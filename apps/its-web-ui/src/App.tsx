import { Button } from 'antd';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.css';
import PermissionsPage from './pages/auth/permission/PermissionsPage';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Button type="primary">Click me!</Button>
        <PermissionsPage />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
