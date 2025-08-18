import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseDatabase } from '../config';
import { Quote } from '../../domain/models/quotes';
import { Book } from '../../domain/models/books';
import { getAuth } from 'firebase/auth';

interface Props {
  newQuotes: Quote[];
  book: Book;
}

export const deleteQuoteFirebase = async (props: Props) => {
  const { newQuotes, book } = props;

  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error('User is not authenticated.');
      return;
    }

    if (book.bookId) {
      const { uid } = user;
      const bookDoc = doc(FirebaseDatabase, `users/${uid}/books`, book.bookId);

      await updateDoc(bookDoc, {
        ...book,
        quotes: newQuotes,
      });
    }
  } catch (e) {
    console.error((e as Error).message + ' deleting a quote.');
  }
};
