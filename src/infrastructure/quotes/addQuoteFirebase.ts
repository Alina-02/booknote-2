import { doc, setDoc } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { FirebaseDatabase } from '../config';

export const addNewQuoteFirebase = async (book: Book, newQuotes: Quote[]) => {
  try {
    if (book.bookId) {
      const booksRef = doc(FirebaseDatabase, 'books', book.bookId);

      await setDoc(booksRef, {
        ...book,
        quotes: newQuotes,
      });
    }
  } catch (e) {
    console.error((e as Error).message + ' creating a quote.');
  }
};
