import { doc, updateDoc } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { FirebaseDatabase } from '../config';
import { getAuth } from 'firebase/auth';

export const udpateQuoteFirebase = async (book: Book) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    if (book.bookId) {
      const { uid } = user;
      const bookDoc = doc(FirebaseDatabase, `users/${uid}/books`, book.bookId);

      const { quotes } = book;
      if (quotes) {
        await updateDoc(bookDoc, {
          ...book,
          quotes: quotes,
        });
      }
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a quote.');
  }
};
