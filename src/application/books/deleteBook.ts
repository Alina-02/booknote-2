import { Book } from '../../domain/models/books';
import { deleteBookFirebase } from '../../infrastructure/books/deleteBookFirebase';

interface DeleteBookProps {
  selectedBook: Book | null;
}

export function deleteBook(props: DeleteBookProps) {
  const { selectedBook } = props;
  if (selectedBook) {
    deleteBookFirebase(selectedBook?.bookId);

    const booksJSON = localStorage.getItem('books');
    if (booksJSON) {
      const books = JSON.parse(booksJSON).filter(
        (b: Book) => b.bookId !== selectedBook?.bookId
      );

      localStorage.setItem('books', JSON.stringify(books));
      return books ? books : null;
    }
  }
}
