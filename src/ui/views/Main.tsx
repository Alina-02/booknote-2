import { useEffect } from 'react';

import { getAllBooksFirebase } from '../../infrastructure/database_services';
import Layout from './Layout';
import Home from './Home';
import { useStore } from '../store/useStore';

const Main = () => {
  const { selectedBook, setSelectedBook } = useStore();

  useEffect(() => {
    getAllBooksFirebase().then((books) => {
      localStorage.setItem('books', JSON.stringify(books));

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
