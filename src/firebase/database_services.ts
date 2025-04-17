import { onValue, ref, set } from 'firebase/database';
import { FirebaseDatabase } from './config';
import { Book } from '../models/books';
import { collection, doc, setDoc } from 'firebase/firestore';

export const addNewBook = async (book: Book) => {
  const booksRef = collection(FirebaseDatabase, 'books');

  const { title, author, favQuote, bookCover } = book;
  const bookId = 'id' + Math.random().toString(16).slice(2);

  await setDoc(doc(booksRef, title), {
    bookId: bookId,
    title: title,
    author: author,
  });
};

export const deleteBook = (book: Book) => {};

export const updateBook = (book: Book) => {
  //const { bookId, title, author, favQuote, bookCover } = book;
};

export const getBooks = () => {};

export const addNewQuote = () => {};

export const deleteQuote = () => {};

export const udpateQuote = () => {};

export const getQuotesFromBook = () => {};
