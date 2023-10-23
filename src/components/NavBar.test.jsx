import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';

test('renders login and register links when not logged in', () => {
  render(
    <Router>
      <AuthContext.Provider value={{ currentUser: null }}>
        <NavBar />
      </AuthContext.Provider>
    </Router>
  );

  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Register')).toBeInTheDocument();
});

test('renders dashboard and logout button when logged in', () => {
  render(
    <Router>
      <AuthContext.Provider value={{ currentUser: { uid: '123' } }}>
        <NavBar />
      </AuthContext.Provider>
    </Router>
  );

  expect(screen.getByText('Dashboard')).toBeInTheDocument();
  expect(screen.getByText('Log Out')).toBeInTheDocument();
});


test('handles error during logout', () => {
  const mockLogout = jest.fn().mockRejectedValue(new Error('Logout failed'));
  render(
    <Router>
      <AuthContext.Provider value={{ currentUser: { uid: '123' }, logout: mockLogout }}>
        <NavBar />
      </AuthContext.Provider>
    </Router>
  );

  fireEvent.click(screen.getByText('Log Out'));
  expect(mockLogout).toHaveBeenCalled();
});
