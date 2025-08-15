import { Book } from '../../domain/models/books';
import { Quote } from '../../domain/models/quotes';
import { udpateQuoteFirebase } from '../../infrastructure/quotes/updateQuoteFirebase';
import { editObjectFromAnArray } from '../../utils/utils';

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
      return newBooks ? newBooks : null;
    }

    udpateQuoteFirebase(quote, selectedQuote, book);
  }
  return null;
}
