import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Quote } from '../../domain/models/quotes';
import { Book } from '../../domain/models/books';

export const deleteQuoteFirebase = async (quote: Quote, book: Book) => {
  try {
    if (book.bookId) {
      const bookDoc = doc(FirebaseDatabase, 'books', book.bookId);

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
