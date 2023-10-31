
// import { firestore } from '../utils/firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// const { getProfile } = require('./profile_copy');
import { getProfile } from './profile_copy';

test('Shows the correct total spent when input is a number', async () => {
  getProfile("CrlJbP4uftdQ47XNoAtHgI4alDH3");
  expect(getProfile("CrlJbP4uftdQ47XNoAtHgI4alDH3")).toBe(0);
}, 600000);
