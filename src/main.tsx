import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from './contexts/AuthProvider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
      <App />
    </AuthProvider>
  // <React.StrictMode>
    
  // </React.StrictMode>,
)
