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

  const { title, author, favQuote, bookCover, quotes } = book;
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
    quotes: quotes ? quotes : [],
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

export const addNewQuote = async (quote: string, book: Book) => {
  if (book.bookId) {
    const booksRef = doc(FirebaseDatabase, 'books', book.bookId);

    const { quotes } = book;
    quotes.push(quote);

    await setDoc(booksRef, {
      ...book,
      quotes: quotes,
    });
  }
};

export const deleteQuote = async (quote: string, book: Book) => {
  const booksRef = collection(FirebaseDatabase, 'books');

  const { quotes } = book;

  await setDoc(doc(booksRef), {
    ...book,
    quotes: quotes.filter((q) => quote !== q),
  });
};

export const udpateQuote = () => {};

export const getQuotesFromBook = (bookId: Book) => {};
