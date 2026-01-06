import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LandingPage } from './components/LandingPage';
import { SignUpPage } from './components/SignUpPage';
import { SignInPage } from './components/SignInPage';
import { DashboardPage } from './pages/DashboardPage';
import { SurveyPage } from './pages/SurveyPage';
import { LegalRequirementsPage } from './pages/LegalRequirementsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-600 mb-2">Loading...</div>
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signin');
  };

  return (
    <Routes>
      <Route path="/" element={<LandingPage onGetStarted={handleGetStarted} />} />
      <Route path="/signin" element={<SignInPageWrapper />} />
      <Route path="/signup" element={<SignUpPageWrapper />} />
      <Route path="/legal-requirements" element={<LegalRequirementsPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <SurveyPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function SignInPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSuccess = () => {
    // Small delay to ensure state is updated
    setTimeout(() => {
      navigate('/dashboard');
    }, 100);
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <SignInPage
      onBack={handleBack}
      onSuccess={handleSuccess}
      onSignUpClick={handleSignUpClick}
    />
  );
}

function SignUpPageWrapper() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/signin');
  };

  const handleSuccess = () => {
    navigate('/signin');
  };

  return <SignUpPage onBack={handleBack} onSuccess={handleSuccess} />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
