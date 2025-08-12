import { deleteDoc, doc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';

export const deleteBookFirebase = async (bookId?: string) => {
  try {
    if (bookId) {
      await deleteDoc(doc(FirebaseDatabase, 'books', bookId));
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a book.');
  }
};
