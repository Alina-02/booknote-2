import { Book } from '../domain/models/books';
import { Quote } from '../domain/models/quotes';
import {
  addNewQuoteFirebase,
  deleteQuoteFirebase,
  udpateQuoteFirebase,
} from '../infrastructure/database_services';
import {
  addObjectToAnArray,
  deleteObjectFromAnArray,
  editObjectFromAnArray,
} from '../utils/utils';

interface AddQuoteProps {
  book: Book | null;
  setSelectedBook: (book: Book | null) => void;
  quote: Quote | null;
}

export function addQuote(props: AddQuoteProps) {
  console.count('addQuote called'); // Add this line

  const { book, setSelectedBook, quote } = props;
  const quotes = book?.quotes ? book?.quotes : [];

  if (book && quote) {
    const newQuotes = addObjectToAnArray({ array: quotes, object: quote });
    const newBook = { ...book };
    newBook.quotes = newQuotes;

    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const books = JSON.parse(localStorageBooks);
      const newBooks = editObjectFromAnArray({ array: books, object: newBook });

      localStorage.setItem('books', JSON.stringify(newBooks));
      setSelectedBook(newBook);
      addNewQuoteFirebase(quote, book, newQuotes);
    }
  }
}

interface EditQuoteProps {
  quote: Quote;
  selectedQuote: Quote;
  setSelectedBook: (book: Book | null) => void;
  book: Book | null;
}

export function editQuote(props: EditQuoteProps) {
  const { quote, selectedQuote, setSelectedBook, book } = props;
  const quotes = book?.quotes;

  if (book && quotes) {
    const newQuotes = editObjectFromAnArray({
      array: quotes,
      originalObject: selectedQuote,
      object: quote,
    });
    const newBook = { ...book };
    newBook.quotes = newQuotes;

    setSelectedBook(newBook);
    const localStorageBooks = localStorage.getItem('books');
    if (localStorageBooks) {
      const books = JSON.parse(localStorageBooks);
      const newBooks = editObjectFromAnArray({ array: books, object: newBook });
      localStorage.setItem('books', JSON.stringify(newBooks));
    }

    udpateQuoteFirebase(quote, selectedQuote, book);
  }
}

interface DeleteQuoteProps {
  setSelectedBook: (book: Book | null) => void;
  selectedBook: Book | null;
  quote: Quote;
}

export function deleteQuote(props: DeleteQuoteProps) {
  const { selectedBook, setSelectedBook, quote } = props;
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
      localStorage.setItem('books', JSON.stringify(newBooks));
    }

    deleteQuoteFirebase(quote, selectedBook);
  }
}
