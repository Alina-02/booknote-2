import { Book } from '../models/books';
import { FirebaseDatabase } from './config';
import { onValue, ref, set } from 'firebase/database';

export const addNewBook = async (book: Book) => {
  const connectedRef = ref(FirebaseDatabase, '.info/connected');
  onValue(connectedRef, (snapshot) => {
    if (snapshot.val() === true) {
      console.log('¡Conectado a Realtime Database!');
    } else {
      console.log('Desconectado de Realtime Database.');
      // Si ves esto, la escritura no funcionará
    }
  });
  try {
    console.log(book);
    const promise = set(ref(FirebaseDatabase, 'books/' + book.title), {
      title: book.title,
      author: book.author,
      tags: book.tags,
      cover: book?.bookCover ? book?.bookCover : null,
    }).then(() => console.log('hola'));
    console.log(promise);
  } catch (error) {
    console.log(error);
  }
};

export const getBooksRef = ref(FirebaseDatabase, 'books/');
