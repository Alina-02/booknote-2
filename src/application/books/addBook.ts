import { ref, uploadBytes } from 'firebase/storage';
import { Book } from '../../domain/models/books';
import { getCoverId } from '../../utils/utils';
import { FirebaseStorage } from '../../infrastructure/config';
import { addNewBookFirebase } from '../../infrastructure/books/addBookFirebase';

interface AddBookProps {
  cover: File | null;
  book: Book;
  setBooks: (books: Book[]) => void;
}

export function addBook(props: AddBookProps) {
  const { cover, book, setBooks } = props;
  if (cover) {
    const coverId = getCoverId(book);
    const imageRef = ref(FirebaseStorage, `images/${coverId}`);
    uploadBytes(imageRef, cover);
  }

  addNewBookFirebase(book);

  const localStorageBooks = localStorage.getItem('books');
  if (localStorageBooks) {
    const books = JSON.parse(localStorageBooks);
    const newBooks = [...books, book];
    setBooks(books);
    localStorage.setItem('books', JSON.stringify(newBooks));
  }
}
