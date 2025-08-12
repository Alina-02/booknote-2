import { collection, doc, setDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Book } from '../../domain/models/books';

export const addNewBookFirebase = async (book: Book) => {
  try {
    const booksRef = collection(FirebaseDatabase, 'books');

    const { title, author, bookCover, quotes } = book;

    await setDoc(doc(booksRef), {
      title: title,
      author: author,
      bookCover: bookCover ? true : false,
      quotes: quotes ? quotes : [],
    });
  } catch (e) {
    console.error((e as Error).message + ' adding a book.');
  }
};
