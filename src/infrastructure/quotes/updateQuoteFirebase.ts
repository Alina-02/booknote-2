import { doc, updateDoc } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { FirebaseDatabase } from '../config';
import { getAuth } from 'firebase/auth';

export const udpateQuoteFirebase = async (
  quote: Quote,
  selectedQuote: Quote,
  book: Book
) => {
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
        const index = quotes?.findIndex((q) => q.text === selectedQuote.text);
        if (index > -1) {
          quotes[index] = quote;

          await updateDoc(bookDoc, {
            ...book,
            quotes: quotes,
          });
        }
      }
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a quote.');
  }
};
