// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import NavBar from './NavBar';
// // import AuthContextProvider from '../context/AuthContext';
// import { TestAuthContextProvider } from '../context/TestAuthContextProvider';


// test('renders login and register links when not logged in', () => {
//   render(
//     <Router>
//       <TestAuthContextProvider currentUser={null}>
//         <NavBar />
//       </TestAuthContextProvider>
//     </Router>
//   );

//   expect(screen.getByText('Login')).toBeInTheDocument();
//   expect(screen.getByText('Register')).toBeInTheDocument();
// });

// test('renders dashboard and logout button when logged in', () => {
//   const mockUser = { uid: '123' };
//   render(
//     <Router>
//       <TestAuthContextProvider currentUser={mockUser}>
//         <NavBar />
//       </TestAuthContextProvider>
//     </Router>
//   );

//   expect(screen.getByText('Dashboard')).toBeInTheDocument();
//   expect(screen.getByText('Log Out')).toBeInTheDocument();
// });


// test('handles error during logout', () => {
//   const mockLogout = jest.fn().mockRejectedValue(new Error('Logout failed'));
//   const mockUser = { uid: '123' };
//   render(
//     <Router>
//       <TestAuthContextProvider currentUser={mockUser} logout={mockLogout}>
//         <NavBar />
//       </TestAuthContextProvider>
//     </Router>
//   );

//   fireEvent.click(screen.getByText('Log Out'));
//   expect(mockLogout).toHaveBeenCalled();
// });

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, screen } from '@testing-library/react';
import NavBar from './NavBar';
import AuthContextProvider from "../context/AuthContext";

describe('NavBar Component', () => {
  const renderNavBar = (authContextValue) => {
    return render(
      <Router>
        <AuthContextProvider>
          <NavBar />
        </AuthContextProvider>
      </Router>
    );
  };

  test('renders dashboard and logout options when user is logged in', async () => {
    // Mock the signOut function from firebase
    jest.mock("../utils/firebase-config", () => ({
      auth: { signOut: jest.fn() },
    }));

    // Mock the onAuthStateChanged to immediately return a user
    jest.mock("firebase/auth", () => ({
      onAuthStateChanged: jest.fn((auth, callback) => {
        callback({ uid: '123', email: 'test@example.com' });
        return jest.fn(); // Unsubscribe function
      }),
      ...jest.requireActual("firebase/auth"), // Import actual other methods
    }));

    renderNavBar();

    expect(await screen.findByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('handles error during logout', async () => {
    // Mock the signOut function from firebase to throw an error
    jest.mock("../utils/firebase-config", () => ({
      auth: { signOut: jest.fn(() => Promise.reject(new Error('Logout Failed'))) },
    }));

    // Mock the onAuthStateChanged to immediately return a user
    jest.mock("firebase/auth", () => ({
      onAuthStateChanged: jest.fn((auth, callback) => {
        callback({ uid: '123', email: 'test@example.com' });
        return jest.fn(); // Unsubscribe function
      }),
      ...jest.requireActual("firebase/auth"), // Import actual other methods
    }));

    const { getByText } = renderNavBar();

    const originalError = console.error;
    console.error = jest.fn();

    fireEvent.click(getByText('Log Out'));

    // Restore the original console.error function
    console.error = originalError;

    expect(console.error).toHaveBeenCalledWith("Error logging out:", new Error('Logout Failed'));
  });
});