import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { udpateQuoteFirebase } from '../../infrastructure/quotes/updateQuoteFirebase';
import { editObjectFromAnArray } from '../../utils/utils';

interface EditQuoteProps {
  newQuote: Quote;
  originalQuote: Quote;
  book: Book | null;
}

export function editQuote(props: EditQuoteProps) {
  const { newQuote, originalQuote, book } = props;
  const quotes = book?.quotes;

  if (book && quotes) {
    const newQuotes = editObjectFromAnArray({
      array: quotes,
      originalObject: originalQuote,
      object: newQuote,
    });
    const newBook = { ...book };
    newBook.quotes = newQuotes;

    udpateQuoteFirebase(book);

    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const books = JSON.parse(localStorageBooks);
      const newBooks = editObjectFromAnArray({ array: books, object: newBook });
      localStorage.setItem('books', JSON.stringify(newBooks));
      return newBooks ? { newBook, newBooks } : null;
    }
  }
  return null;
}
