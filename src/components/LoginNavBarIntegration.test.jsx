import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import App from '../App';
import { AuthProvider } from '../context/AuthContext';

test('login should change navbar state', async () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'password123' } });
  fireEvent.click(loginButton);

  await screen.findByText(/logging out/i);

  const logoutButton = screen.getByRole('button', { name: /log out/i });
  expect(logoutButton).toBeInTheDocument();
});


test('login error should show appropriate message', async () => {
    render(
      <AuthProvider>
        <App />
      </AuthProvider>
    );

    // Mock the login function to cause an error
  jest.spyOn(AuthProvider, 'useAuth').mockImplementation(() => {
    return {
      ...jest.requireActual(AuthProvider).useAuth(),
      login: () => Promise.reject(new Error('Invalid credentials'))
    };
  });

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const loginButton = screen.getByRole('button', { name: /login/i });

  fireEvent.change(emailInput, { target: { value: 'wrong@test.com' } });
  fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
  fireEvent.click(loginButton);

  const errorMessage = await screen.findByText(/invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
});
