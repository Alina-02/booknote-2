import { useEffect } from 'react';

import Layout from './Layout';
import Home from './Home';
import { useStore } from '../store/useStore';
import { getBooks } from '../../application/books/getBooks';

const Main = () => {
  const { selectedBook, setSelectedBook, setBooks } = useStore();

  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
      if (selectedBook) {
        const b = books.find((b) => b.bookId === selectedBook.bookId);
        if (b) {
          setSelectedBook(b);
        } else {
          setSelectedBook(null);
        }
      }
    });
  }, []);

  return (
    <>
      <Layout>
        <Home />
      </Layout>
    </>
  );
};

export default Main;
