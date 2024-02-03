import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/Login';
import SignUpForm from './components/auth/Signup';
import ConfirmationError from './components/auth/Confirmation_error';
import ResetPasswordLink from './components/auth/resetPasswordLink';
import Home from './views/home';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<LoginForm confirmation="" />} />
      <Route path="/resetPassword" element={<ResetPasswordLink />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/confirmation_error/:id" element={<ConfirmationError />} />
      <Route path="/confirmation_success" element={<LoginForm confirmation="confirmation_success" />} />
      <Route path="/confirmation_sent" element={<LoginForm confirmation="confirmation_sent" />} />
      <Route path="/" element={<Home />} exact />
    </Routes>
  </Router>
);

export default App;
