import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { deleteQuoteFirebase } from '../../infrastructure/quotes/deleteQuoteFirebase';
import {
  deleteObjectFromAnArray,
  editObjectFromAnArray,
} from '../../utils/utils';

interface DeleteQuoteProps {
  setSelectedBook: (book: Book | null) => void;
  selectedBook: Book | null;
  quote: Quote;
  setBooks: (books: Book[]) => void;
}

export function deleteQuote(props: DeleteQuoteProps) {
  const { selectedBook, setSelectedBook, quote, setBooks } = props;
  const quotes = selectedBook?.quotes;

  if (selectedBook && quotes) {
    const newQuotes = deleteObjectFromAnArray({
      array: quotes,
      object: quote,
    });
    const newBook = { ...selectedBook };
    newBook.quotes = newQuotes;
    setSelectedBook(newBook);

    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const books = JSON.parse(localStorageBooks);
      const newBooks = editObjectFromAnArray({ array: books, object: newBook });
      setBooks(newBooks);
      localStorage.setItem('books', JSON.stringify(newBooks));
    }

    deleteQuoteFirebase(quote, selectedBook);
  }
}
