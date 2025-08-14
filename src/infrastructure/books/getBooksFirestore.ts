import { collection, getDocs } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { FirebaseDatabase } from '../config';
import { getAuth } from 'firebase/auth';

export const getAllBooksFirebase = async () => {
  const books: Book[] = [];
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      console.error('User is not authenticated.');
      return books;
    }

    const { uid } = user;
    const userBooksRef = collection(FirebaseDatabase, `users/${uid}/books`);
    const querySnapshot = await getDocs(userBooksRef);

    querySnapshot.forEach((doc) => {
      const book: Book = doc.data() as Book;
      books.push({ ...book, bookId: doc.id });
    });
  } catch (e) {
    console.error((e as Error).message + ' getting books.');
  }

  return books;
};
