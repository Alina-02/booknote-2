import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { addNewQuoteFirebase } from '../../infrastructure/quotes/addQuoteFirebase';
import { addObjectToAnArray, editObjectFromAnArray } from '../../utils/utils';

interface AddQuoteProps {
  book: Book | null;
  setSelectedBook: (book: Book | null) => void;
  quote: Quote | null;
  setBooks: (books: Book[]) => void;
}

export function addQuote(props: AddQuoteProps) {
  const { book, setSelectedBook, quote, setBooks } = props;
  const quotes = book?.quotes ? book?.quotes : [];

  if (book && quote) {
    const newQuotes = addObjectToAnArray({ array: quotes, object: quote });
    const newBook = { ...book };
    newBook.quotes = newQuotes;

    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const books = JSON.parse(localStorageBooks);
      const newBooks = editObjectFromAnArray({ array: books, object: newBook });

      setBooks(newBooks);
      localStorage.setItem('books', JSON.stringify(newBooks));
      setSelectedBook(newBook);
      addNewQuoteFirebase(book, newQuotes);
    }
  }
}
