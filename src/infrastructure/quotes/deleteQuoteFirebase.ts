import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Quote } from '../../domain/models/quotes';
import { Book } from '../../domain/models/books';
import { getAuth } from 'firebase/auth';

export const deleteQuoteFirebase = async (quote: Quote, book: Book) => {
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

      await updateDoc(bookDoc, {
        ...book,
        quotes: quotes?.filter((q) => quote.text !== q.text),
      });
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a quote.');
  }
};
