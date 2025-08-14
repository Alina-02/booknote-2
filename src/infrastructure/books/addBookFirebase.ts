import { collection, doc, setDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Book } from '../../domain/models/books';
import { getAuth } from 'firebase/auth';

export const addNewBookFirebase = async (book: Book) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    const { uid } = user;
    const { title, author, bookCover, quotes } = book;

    const userBooksRef = collection(FirebaseDatabase, `users/${uid}/books`);

    await setDoc(doc(userBooksRef), {
      title: title,
      author: author,
      bookCover: bookCover ? true : false,
      quotes: quotes ? quotes : [],
    });
  } catch (e) {
    console.error((e as Error).message + ' adding a book.');
  }
};
