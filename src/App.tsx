import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Coleta from './pages/Coleta';
import Historico from './pages/Historico';
import Recompensas from './pages/Recompensas';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/coleta" element={<PrivateRoute><Coleta /></PrivateRoute>} />
          <Route path="/historico" element={<PrivateRoute><Historico /></PrivateRoute>} />
          <Route path="/recompensas" element={<PrivateRoute><Recompensas /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
