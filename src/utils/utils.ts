import { Book } from './models/books';
import { Quote } from './models/quotes';

export const getCoverId = (book: Book) => {
  return (book.title + book.author).replace(/ /g, '').toLowerCase();
};

export function addObjectToAnArray<Type extends Book | Quote>({
  array,
  object,
}: {
  array: Type[];
  object: Type;
}): Type[] {
  if (array.length === 0) {
    return [object];
  }

  if ('bookId' in object) {
    if (array.every((o: Type) => (o as Book).bookId !== object.bookId)) {
      array.push(object);
      return array;
    }
  } else if ('text' in object) {
    if (array.every((o: Type) => (o as Quote).text !== object.text)) {
      array.push(object);
      return array;
    }
  }

  return [];
}

export function editObjectFromAnArray<Type extends Book | Quote>({
  array,
  originalObject,
  object,
}: {
  array: Type[];
  originalObject?: Type;
  object: Type;
}): Type[] {
  if (array.length === 1) {
    return [object];
  }

  if ('bookId' in object) {
    const index = array.findIndex(
      (o: Type) => (o as Book).bookId === object.bookId
    );
    array[index] = object;
    return array;
  } else if (originalObject && 'text' in originalObject && 'text' in object) {
    const index = array.findIndex(
      (o: Type) => (o as Quote).text === originalObject.text
    );
    array[index] = object;
    return array;
  }

  return [];
}

export function deleteObjectFromAnArray<Type extends Book | Quote>({
  array,
  object,
}: {
  array: Type[];
  object: Type;
}): Type[] {
  if (array.length === 1) {
    return [object];
  }

  if ('bookId' in object) {
    return array.filter((o: Type) => (o as Book).bookId !== object.bookId);
  } else if ('text' in object) {
    return array.filter((o: Type) => (o as Quote).text !== object.text);
  }

  return [];
}
