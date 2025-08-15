import { getAllBooksFirebase } from '../../infrastructure/books/getBooksFirestore';

export const getBooks = async () => {
  const books = await getAllBooksFirebase();

  localStorage.setItem('books', JSON.stringify(books));
  return books;
};
