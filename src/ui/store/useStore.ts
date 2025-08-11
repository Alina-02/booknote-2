import { create } from 'zustand';
import { Book } from '../../domain/models/books';

interface StoreState {
  books: Book[];
  selectedBook: Book | null;
  setSelectedBook: (book: Book | null) => void;
  addBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
  updateBook: (book: Book) => void;
}

export const useStore = create<StoreState>((set) => ({
  books: [],
  selectedBook: null,
  setSelectedBook: (book) => set(() => ({ selectedBook: book })),
  addBook: (book) => set((state) => ({ books: [...state.books, book] })),
  removeBook: (bookId) =>
    set((state) => ({
      books: state.books.filter((book) => book.bookId !== bookId),
    })),
  updateBook: (updatedBook) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.bookId === updatedBook.bookId ? updatedBook : book
      ),
    })),
}));
