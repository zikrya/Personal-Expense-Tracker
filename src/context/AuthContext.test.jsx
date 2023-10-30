import { renderHook } from '@testing-library/react-hooks';
import AuthContextProvider, { useAuth } from './AuthContext';
import { expect } from 'chai';
import sinon from 'sinon';

// Mocking our Firebase auth module
import * as firebaseConfig from '../utils/firebase-config';

describe('<AuthContext />', () => {
    let createUserWithEmailAndPasswordStub;
    let signInWithEmailAndPasswordStub;
    let signOutStub;
    let sendPasswordResetEmailStub;

    beforeEach(() => {
        // Stubbing the functions before each test
        createUserWithEmailAndPasswordStub = sinon.stub(firebaseConfig, 'createUserWithEmailAndPassword');
        signInWithEmailAndPasswordStub = sinon.stub(firebaseConfig, 'signInWithEmailAndPassword');
        signOutStub = sinon.stub(firebaseConfig, 'signOut');
        sendPasswordResetEmailStub = sinon.stub(firebaseConfig, 'sendPasswordResetEmail');
    });

    afterEach(() => {
        // Restore the stubs after each test
        sinon.restore();
    });

    it('should register a user', async () => {
        const { result } = renderHook(() => useAuth(), { wrapper: AuthContextProvider });
        await result.current.register('test@test.com', 'password123');
        expect(createUserWithEmailAndPasswordStub.calledWith(sinon.match.any, 'test@test.com', 'password123')).to.be.true;
    });

    // ... More tests for login, logout, and forgotPassword in similar fashion.
});

