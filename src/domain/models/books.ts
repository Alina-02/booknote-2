import { Quote } from './quotes';

export interface Book {
  title: string;
  author: string;
  bookId?: string;
  tags: string[];
  quotes?: Quote[];
}
