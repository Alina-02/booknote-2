import { doc, setDoc } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { FirebaseDatabase } from '../config';
import { getAuth } from 'firebase/auth';

export const addNewQuoteFirebase = async (book: Book, newQuotes: Quote[]) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    if (book.bookId) {
      const { uid } = user;
      const booksRef = doc(FirebaseDatabase, `users/${uid}/books`, book.bookId);

      await setDoc(booksRef, {
        ...book,
        quotes: newQuotes,
      });
    }
  } catch (e) {
    console.error((e as Error).message + ' creating a quote.');
  }
};
