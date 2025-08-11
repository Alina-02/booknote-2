import { ref, uploadBytes } from 'firebase/storage';
import { FirebaseStorage } from '../infrastructure/config';
import { Book } from '../domain/models/books';
import { getCoverId } from '../utils/utils';
import {
  addNewBookFirebase,
  deleteBookFirebase,
  updateBookFirebase,
} from '../infrastructure/database_services';

interface AddBookProps {
  cover: File | null;
  book: Book;
}

export function addBook(props: AddBookProps) {
  const { cover, book } = props;
  if (cover) {
    const coverId = getCoverId(book);
    const imageRef = ref(FirebaseStorage, `images/${coverId}`);
    uploadBytes(imageRef, cover);
  }

  addNewBookFirebase(book);
  console.log(book);
  const localStorageBooks = localStorage.getItem('books');
  if (localStorageBooks) {
    const books = JSON.parse(localStorageBooks);
    const newBooks = [...books, book];
    localStorage.setItem('books', JSON.stringify(newBooks));
  }
}

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
  }
}

interface DeleteBookProps {
  setSelectedBook: (book: Book | null) => void;
  selectedBook: Book | null;
}

export function deleteBook(props: DeleteBookProps) {
  const { selectedBook, setSelectedBook } = props;
  if (selectedBook) {
    deleteBookFirebase(selectedBook);

    const booksJSON = localStorage.getItem('books');
    if (booksJSON) {
      const books = JSON.parse(booksJSON).filter(
        (b: Book) => b.bookId !== selectedBook?.bookId
      );
      localStorage.setItem('books', JSON.stringify(books));
    }
    setSelectedBook(null);
  }
}
