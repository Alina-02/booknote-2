import { doc, setDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Book } from '../../domain/models/books';
import { getAuth } from 'firebase/auth';

export const updateBookFirebase = async (book: Book) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('User is not authenticated.');
      return;
    }

    if (book.bookId) {
      const { uid } = user;
      const { title, author, tag } = book;

      const bookRef = doc(FirebaseDatabase, `users/${uid}/books`, book.bookId);

      await setDoc(bookRef, {
        title: title,
        author: author,
        tag: tag,
      });
    }
  } catch (e) {
    alert((e as Error).message + ' updating a book.');
  }
};
