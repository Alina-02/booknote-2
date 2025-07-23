import {
  addNewQuoteFirebase,
  deleteQuoteFirebase,
  udpateQuoteFirebase,
} from '../firebase/database_services';
import { Book } from '../models/books';
import { Quote } from '../models/quotes';

interface AddQuoteProps {
  book: Book | null;
  quote: Quote | null;
}

export function addQuote(props: AddQuoteProps) {
  const { book, quote } = props;
  if (book && quote) {
    addNewQuoteFirebase(quote, book);
  }
}

interface EditQuoteProps {
  quote: Quote;
  selectedQuote: Quote;
  book: Book | null;
}

export function editQuote(props: EditQuoteProps) {
  const { quote, selectedQuote, book } = props;
  if (book) {
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

  if (selectedBook) {
    deleteQuoteFirebase(quote, selectedBook);

    const booksJSON = localStorage.getItem('books');
    if (booksJSON) {
      const books = JSON.parse(booksJSON).filter(
        (b: Book) => b.bookId !== selectedBook?.bookId
      );
      const newQuotes = selectedBook?.quotes?.filter(
        (quote) => quote.text !== quote.text
      );
      const newBook = selectedBook;
      newBook.quotes = newQuotes;
      localStorage.setItem('books', JSON.stringify(books.quotes.push(newBook)));
    }
    setSelectedBook(undefined);
  }
}
