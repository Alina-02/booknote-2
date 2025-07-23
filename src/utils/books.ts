import {
  addNewBookFirebase,
  deleteBookFirebase,
  updateBookFirebase,
} from '../firebase/database_services';
import { Book } from '../models/books';
import { getCoverId } from './utils';

interface AddBookProps {
  cover: File | null;
  book: Book;
}

export function addBook(props: AddBookProps) {
  const { cover, book } = props;
  if (cover) {
    const coverId = getCoverId(book);
    //const imageRef = ref(FirebaseStorage, `images/${coverId}`);
    //uploadBytes(imageRef, cover);
  }

  addNewBookFirebase(book);

  const books = JSON.parse(localStorage.getItem('books'));

  const newBooks = [...books, book];
  localStorage.setItem('books', JSON.stringify(newBooks));
}

interface EditBookProps {
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;
  selectedBook: Book | undefined;
  updatedBook: Book;
}

export function editBook(props: EditBookProps) {
  const { setSelectedBook, selectedBook, updatedBook } = props;

  updateBookFirebase({ ...updatedBook, bookId: selectedBook?.bookId });
  setSelectedBook(updatedBook);
  const books = JSON.parse(localStorage.getItem('books'));
  const bookIndex = books.findIndex((b) => b.bookId === updatedBook.bookId);
  const newBooks = books;
  newBooks[bookIndex] = updatedBook;
  localStorage.setItem('books', JSON.stringify(newBooks));
}

interface DeleteBookProps {
  setSelectedBook: (value: React.SetStateAction<Book | undefined>) => void;
  selectedBook: Book | undefined;
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
    setSelectedBook(undefined);
  }
}
