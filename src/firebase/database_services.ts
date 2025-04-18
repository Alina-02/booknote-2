import { FirebaseDatabase } from './config';
import { Book } from '../models/books';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export const addNewBook = async (book: Book) => {
  const booksRef = collection(FirebaseDatabase, 'books');

  const { title, author, favQuote, bookCover } = book;
  const bookId =
    'id' +
    title.trim().toLowerCase() +
    author.trim().toLowerCase() +
    Math.random().toString(4).slice(2);

  await setDoc(doc(booksRef), {
    bookId: bookId,
    title: title,
    author: author,
    favQuote: favQuote ? favQuote : null,
    bookCover: bookCover ? bookCover : null,
  });
};

export const deleteBook = async (book: Book) => {
  if (book.bookId) {
    await deleteDoc(doc(FirebaseDatabase, 'books', book.bookId));
  }
};

export const updateBook = async (book: Book) => {
  if (book.bookId) {
    const bookRef = doc(FirebaseDatabase, 'books', book.bookId);

    const { bookId, title, author, favQuote, bookCover } = book;

    await setDoc(bookRef, {
      bookId: bookId,
      title: title,
      author: author,
      favQuote: favQuote ? favQuote : null,
      bookCover: bookCover ? bookCover : null,
    });
  }
};

export const getAllBooks = async () => {
  const querySnapshot = await getDocs(collection(FirebaseDatabase, 'books'));
  const books: Book[] = [];
  querySnapshot.forEach((doc) => {
    const book: Book = doc.data() as Book;
    books.push({ ...book, bookId: doc.id });
  });

  return books;
};

export const addNewQuote = () => {};

export const deleteQuote = () => {};

export const udpateQuote = () => {};

export const getQuotesFromBook = () => {};
