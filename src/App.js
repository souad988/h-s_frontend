import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/Login';
import SignUpForm from './components/auth/Signup';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />
    </Routes>
  );
}

export default App;
