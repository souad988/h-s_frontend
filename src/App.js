import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import LoginForm from './components/auth/Login';
import SignUpForm from './components/auth/Signup';
import ConfirmationError from './components/auth/Confirmation_error';
import ResetPasswordLink from './components/auth/resetPasswordLink';
import Home from './views/home';
import { ColorModeContext, useMode } from './theme';
import ProductDetails from './components/product/productDetails';

const App = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm confirmation="" />} />
            <Route path="/resetPassword" element={<ResetPasswordLink />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/confirmation_error/:id" element={<ConfirmationError />} />
            <Route
              path="/confirmation_success"
              element={<LoginForm confirmation="confirmation_success" />}
            />
            <Route
              path="/confirmation_sent"
              element={<LoginForm confirmation="confirmation_sent" />}
            />
            <Route path="/productDetails" element={<ProductDetails />} />
            <Route path="/" element={<Home />} exact />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
