/* istanbul ignore file */
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const useProtectedRoute = () => {
  const { currentUser, loading, isSurveyCompleted } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login', { replace: true, state: { from: location } });
    }
    else if (!loading && currentUser && !isSurveyCompleted) {
      navigate('/register-survey', { replace: true, state: { from: location } });
    }
  }, [loading, currentUser, isSurveyCompleted, navigate, location]);
};

