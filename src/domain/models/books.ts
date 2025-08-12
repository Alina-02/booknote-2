import { Quote } from './quotes';

export interface Book {
  title: string;
  author: string;
  bookId?: string;
  bookCover?: boolean;
  tags: string[];
  quotes?: Quote[];
}
