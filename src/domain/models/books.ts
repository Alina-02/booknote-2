import { Quote } from './quotes';

export interface Book {
  title: string;
  author: string;
  bookId?: string;
  tag: string;
  quotes?: Quote[];
}
