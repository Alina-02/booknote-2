import { collection, getDocs } from 'firebase/firestore';
import { Book } from '../../domain/models/books';
import { FirebaseDatabase } from '../config';

export const getAllBooksFirebase = async () => {
  const books: Book[] = [];
  try {
    const querySnapshot = await getDocs(collection(FirebaseDatabase, 'books'));
    querySnapshot.forEach((doc) => {
      const book: Book = doc.data() as Book;
      books.push({ ...book, bookId: doc.id });
    });
  } catch (e) {
    console.error((e as Error).message + ' getting books.');
  }

  return books;
};
