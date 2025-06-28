import { FirebaseDatabase } from './config';
import { Book } from '../models/books';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { Quote } from '../models/quotes';

export const addNewBook = async (book: Book) => {
  try {
    const booksRef = collection(FirebaseDatabase, 'books');

    const { title, author, favQuote, bookCover, quotes } = book;

    await setDoc(doc(booksRef), {
      title: title,
      author: author,
      favQuote: favQuote ? favQuote : null,
      bookCover: bookCover ? true : false,
      quotes: quotes ? quotes : [],
    });
  } catch (e) {
    alert((e as Error).message + ' adding a book.');
  }
};

export const deleteBook = async (book: Book) => {
  try {
    if (book.bookId) {
      await deleteDoc(doc(FirebaseDatabase, 'books', book.bookId));
    }
  } catch (e) {
    alert((e as Error).message + ' deleting a book.');
  }
};

export const updateBook = async (book: Book) => {
  try {
    if (book.bookId) {
      const bookRef = doc(FirebaseDatabase, 'books', book.bookId);

      const { title, author, favQuote, bookCover } = book;
      await setDoc(bookRef, {
        title: title,
        author: author,
        favQuote: favQuote ? favQuote : null,
        bookCover: bookCover ? bookCover : null,
      });
    }
  } catch (e) {
    alert((e as Error).message + ' updating a book.');
  }
};

export const getAllBooks = async () => {
  const books: Book[] = [];
  try {
    const querySnapshot = await getDocs(collection(FirebaseDatabase, 'books'));
    querySnapshot.forEach((doc) => {
      const book: Book = doc.data() as Book;
      books.push({ ...book, bookId: doc.id });
    });
  } catch (e) {
    console.log((e as Error).message + ' getting books.');
  }
  return books;
};

export const addNewQuote = async (quote: Quote, book: Book) => {
  try {
    if (book.bookId) {
      const booksRef = doc(FirebaseDatabase, 'books', book.bookId);

      const { quotes } = book;
      quotes?.push(quote);

      const newQuotes = quotes ?? [quote];
      await setDoc(booksRef, {
        ...book,
        quotes: newQuotes,
      });
    }
  } catch (e) {
    alert((e as Error).message + ' creating a quote.');
  }
};

export const deleteQuote = async (quote: Quote, book: Book) => {
  try {
    if (book.bookId) {
      const bookDoc = doc(FirebaseDatabase, 'books', book.bookId);

      const { quotes } = book;

      await updateDoc(bookDoc, {
        ...book,
        quotes: quotes?.filter((q) => quote.text !== q.text),
      });
    }
  } catch (e) {
    alert((e as Error).message + ' deleting a quote.');
  }
};

export const udpateQuote = async (
  quote: Quote,
  selectedQuote: Quote,
  book: Book
) => {
  try {
    if (book.bookId) {
      const bookDoc = doc(FirebaseDatabase, 'books', book.bookId);

      const { quotes } = book;

      const index = quotes?.findIndex((q) => q.text === selectedQuote.text);
      quotes[index] = quote;

      await updateDoc(bookDoc, {
        ...book,
        quotes: quotes,
      });
    }
  } catch (e) {
    alert((e as Error).message + ' deleting a quote.');
  }
};

export const getQuotesFromBook = (bookId: Book) => {};
