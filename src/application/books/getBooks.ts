import { Book } from '../../domain/models/books';
import { getAllBooksFirebase } from '../../infrastructure/books/getBooksFirestore';

interface Props {
  setBooks: (books: Book[]) => void;
}

export const getBooks = async (props: Props) => {
  const { setBooks } = props;
  const books = await getAllBooksFirebase();

  localStorage.setItem('books', JSON.stringify(books));
  setBooks(books);
  return books;
};
