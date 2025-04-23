import { Book } from '../models/books';

export const getCoverId = (book: Book) => {
  return (book.title + book.author).replace(/ /g, '').toLowerCase();
};
