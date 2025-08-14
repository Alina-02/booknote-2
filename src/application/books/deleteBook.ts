import { Book } from '../../domain/models/books';
import { deleteBookFirebase } from '../../infrastructure/books/deleteBookFirebase';

interface DeleteBookProps {
  setSelectedBook: (book: Book | null) => void;
  selectedBook: Book | null;
  setBooks: (books: Book[]) => void;
}

export function deleteBook(props: DeleteBookProps) {
  const { selectedBook, setSelectedBook, setBooks } = props;
  if (selectedBook) {
    deleteBookFirebase(selectedBook?.bookId);

    const booksJSON = localStorage.getItem('books');
    if (booksJSON) {
      const books = JSON.parse(booksJSON).filter(
        (b: Book) => b.bookId !== selectedBook?.bookId
      );
      setBooks(books);
      localStorage.setItem('books', JSON.stringify(books));
    }
    setSelectedBook(null);
  }
}
