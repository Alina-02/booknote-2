import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { deleteQuoteFirebase } from '../../infrastructure/quotes/deleteQuoteFirebase';
import {
  deleteObjectFromAnArray,
  editObjectFromAnArray,
} from '../../utils/utils';

interface DeleteQuoteProps {
  selectedBook: Book | null;
  quote: Quote;
}

export function deleteQuote(props: DeleteQuoteProps) {
  const { selectedBook, quote } = props;
  const quotes = selectedBook?.quotes;

  if (selectedBook && quotes) {
    const newQuotes = deleteObjectFromAnArray({
      array: quotes,
      object: quote,
    });
    const newBook = { ...selectedBook };
    newBook.quotes = newQuotes;

    deleteQuoteFirebase({ newQuotes, book: selectedBook });

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
