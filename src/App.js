import './App.css';
import { Routes, Route } from 'react-router-dom';
import AuthFormInhanced from './components/auth/AuthForm';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthFormInhanced />} />
      <Route path="/signup" element={<AuthFormInhanced />} />
    </Routes>
  );
}

export default App;
