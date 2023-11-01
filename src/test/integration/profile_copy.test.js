
// import { firestore } from '../utils/firebase-config';
// import { doc, getDoc } from 'firebase/firestore';
// const { getProfile } = require('./profile_copy');
import { getProfile  } from './profile_copy';

// the UID below actually exists in our firebase database "users" and getProfile checks if it can
test('Shows that the function can get existing data from the database (UID exists)', async () => {
  expect(getProfile("CrlJbP4uftdQ47XNoAtHgI4alDH3")).toBe(0);
});

// the UID below is random and does not exist in our firebase, so this code tests "errors"
test('Shows that the function can determine that data does not exist for a non-existent UID', async () => {
  expect(getProfile("nonExistentUID")).toBe(1);
});
