import { Book } from '../../domain/models/books';
import { addNewBookFirebase } from '../../infrastructure/books/addBookFirebase';

interface AddBookProps {
  book: Book;
}

export function addBook(props: AddBookProps) {
  const { book } = props;

  addNewBookFirebase(book);

  const localStorageBooks = localStorage.getItem('books');
  if (localStorageBooks) {
    const books = JSON.parse(localStorageBooks);
    const newBooks: Book[] = [...books, book];

    localStorage.setItem('books', JSON.stringify(newBooks));
    return newBooks ? newBooks : null;
  }
  return null;
}
