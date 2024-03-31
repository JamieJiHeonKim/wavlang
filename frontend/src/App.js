import './App.scss';
import Home from './pages/About';
import {Routes, Route} from 'react-router-dom';
import Services from './pages/Services';
import BlogsPage from './pages/BlogsPage';
import PricingPage from './pages/PricingPage';
import Contactus from './pages/Contact/Contactus';
import Transcribe from './pages/Transcribe/TranscribeMainPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import VerifyEmailPage from './pages/VerifyEmailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/transcribe" element={<Transcribe />} />
      <Route path="/updates" element={<BlogsPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      {/* <Route path="/about" element={<About />} /> */}
      <Route path="/contact" element={<Contactus />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/dashboard/user/:userId" element={<DashboardPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
