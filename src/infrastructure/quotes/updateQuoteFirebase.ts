import { doc, updateDoc } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { FirebaseDatabase } from '../config';

export const udpateQuoteFirebase = async (
  quote: Quote,
  selectedQuote: Quote,
  book: Book
) => {
  try {
    if (book.bookId) {
      const bookDoc = doc(FirebaseDatabase, 'books', book.bookId);

      const { quotes } = book;
      if (quotes) {
        const index = quotes?.findIndex((q) => q.text === selectedQuote.text);
        quotes[index] = quote;

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
