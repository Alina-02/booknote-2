import { doc, setDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Book } from '../../domain/models/books';

export const updateBookFirebase = async (book: Book) => {
  try {
    if (book.bookId) {
      const bookRef = doc(FirebaseDatabase, 'books', book.bookId);

      const { title, author, bookCover, tags } = book;
      await setDoc(bookRef, {
        title: title,
        author: author,
        tags: tags,
        bookCover: bookCover ? bookCover : null,
      });
    }
  } catch (e) {
    alert((e as Error).message + ' updating a book.');
  }
};
