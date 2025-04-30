import { Book } from '../models/books';
import { FirebaseDatabase } from './config';
import { getDatabase, ref, set } from 'firebase/database';

export const addNewBook = async (book: Book) => {
  set(ref(FirebaseDatabase, 'books/' + book.title), {
    title: book.title,
    author: book.author,
    tags: book.tags,
    cover: book?.bookCover,
  });
};

export const getBooksRef = ref(FirebaseDatabase, 'books/');
