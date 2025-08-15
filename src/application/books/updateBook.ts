import { Book } from '../../domain/models/books';
import { updateBookFirebase } from '../../infrastructure/books/updateBookFirebase';

interface EditBookProps {
  setSelectedBook: (book: Book | null) => void;
  selectedBook: Book | null;
  updatedBook: Book;
}

export function editBook(props: EditBookProps) {
  const { setSelectedBook, selectedBook, updatedBook } = props;

  updateBookFirebase({ ...updatedBook, bookId: selectedBook?.bookId });
  setSelectedBook(updatedBook);

  const localStorageBooks = localStorage.getItem('books');
  if (localStorageBooks) {
    const books = JSON.parse(localStorageBooks);
    const bookIndex = books.findIndex(
      (b: Book) => b.bookId === updatedBook.bookId
    );
    const newBooks = books;
    newBooks[bookIndex] = updatedBook;

    localStorage.setItem('books', JSON.stringify(newBooks));
    return newBooks ? newBooks : null;
  }
  return null;
}
