import { deleteDoc, doc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { getAuth } from 'firebase/auth';

export const deleteBookFirebase = async (bookId?: string) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    if (bookId) {
      const { uid } = user;
      const bookRef = doc(FirebaseDatabase, `users/${uid}/books`, bookId);
      await deleteDoc(bookRef);
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a book.');
  }
};
