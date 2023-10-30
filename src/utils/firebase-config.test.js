import { expect } from 'chai';
import sinon from 'sinon';
import * as firebaseConfig from './firebase-config.js';

describe('Firebase Config Functions', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should update user name', async () => {
    const setStub = sinon.stub().resolves();
    firebaseConfig.__setMockFunctions(setStub, null); // Mock the set function

    await firebaseConfig.updateUserName('sampleUID', 'TestName');
    sinon.assert.calledWith(setStub, sinon.match.any, 'TestName');
  });

  it('should get user name', async () => {
    const getStub = sinon.stub().resolves({
      val: () => 'TestName'
    });
    firebaseConfig.__setMockFunctions(null, getStub); // Mock the get function

    const result = await firebaseConfig.getUserName('sampleUID');
    expect(result).to.equal('TestName');
  });
});


