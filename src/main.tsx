import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider.tsx'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient();

// Ghi đè console.warn để tắt cảnh báo cụ thể
const originalWarn = console.warn;
console.warn = (message, ...args) => {
  if (typeof message === 'string' && message.includes('Third-party cookie will be blocked in future Chrome versions as part of Privacy Sandbox')) {
    return;
  }
  originalWarn(message, ...args);
};

// Đặt giá trị vào localStorage trước khi render
localStorage.setItem('key', 'value');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
)