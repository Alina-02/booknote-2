import {
  addNewQuoteFirebase,
  deleteQuoteFirebase,
  udpateQuoteFirebase,
} from '../services/firebase/database_services';
import { Book } from './models/books';
import { Quote } from './models/quotes';
import {
  addObjectToAnArray,
  deleteObjectFromAnArray,
  editObjectFromAnArray,
} from './utils';

interface AddQuoteProps {
  book: Book | null;
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;
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
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;
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
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;
  selectedBook: Book | undefined;
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
