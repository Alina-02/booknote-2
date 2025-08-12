import { getAllBooksFirebase } from '../../infrastructure/books/getBooksFirestore';

export const getBooks = async () => {
  return await getAllBooksFirebase();
};
