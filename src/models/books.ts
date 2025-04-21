import { Quote } from './quotes';

export interface Book {
  title: string;
  author: string;
  favQuote?: string;
  bookId?: string;
  bookCover?: string;
  tags: string[];
  quotes: Quote[];
}
