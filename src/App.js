import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
// import LoginForm from "./components/auth/Login";
// import SignUpForm from "./components/auth/Signup";
// import ConfirmationError from "./components/auth/Confirmation_error";
// import ResetPasswordLink from "./components/auth/resetPasswordLink";
import Header1 from "./components/header/Header1";
import Header2 from "./components/header/Header2";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header1 />
        <Header2 />
      </ThemeProvider>
    </ColorModeContext.Provider>

    // <Router>

    //   <Routes>
    //     <Route path="/login" element={<LoginForm confirmation="" />} />
    //     <Route path="/resetPassword" element={<ResetPasswordLink />} />
    //     <Route path="/signup" element={<SignUpForm />} />
    //     <Route path="/confirmation_error/:id" element={<ConfirmationError />} />
    //     <Route
    //       path="/confirmation_success"
    //       element={<LoginForm confirmation="confirmation_success" />}
    //     />
    //     <Route
    //       path="/confirmation_sent"
    //       element={<LoginForm confirmation="confirmation_sent" />}
    //     />
    //     <Route path="/" element={<LoginForm confirmation="" />} exact />
    //   </Routes>
    // </Router>
  );
}
export default App;
