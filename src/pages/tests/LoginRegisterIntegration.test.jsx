import { expect } from 'chai';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import sinon from 'sinon';
import * as AuthContextModule from '../../context/AuthContext';
import Login from '../Login';
import Register from '../Register';

describe('Integration Test: Login and Register with AuthContext', () => {
  let registerStub;
  let loginStub;
  let mockError = null;

  beforeEach(() => {
    // Stub the functions for the tests
    registerStub = sinon.stub(AuthContextModule, 'useAuth').callsFake(() => ({
      register: (email, password) => {
        if (mockError) throw mockError;
        return Promise.resolve();
      },
      login: (email, password) => {
        if (mockError) throw mockError;
        return Promise.resolve();
      }
    }));
  });

  afterEach(() => {
    // Restore the stubs after each test
    mockError = null;
    sinon.restore();
  });

  it('should register a user successfully', async () => {
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'test@test.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => expect(registerStub.called).to.be.true);
  });

  it('should handle registration error', async () => {
    mockError = new Error('Registration error');
    render(
      <Router>
        <Register />
      </Router>
    );

    fireEvent.change(screen.getByPlaceholderText('name@company.com'), {
      target: { value: 'test@test.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => screen.getByText('Registration error'));
  });

  // Similarly, write tests for Login

});

