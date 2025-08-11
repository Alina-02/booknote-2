import { Book } from '../domain/models/books';
import { Quote } from '../domain/models/quotes';

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
      return [...array, object];
    } else {
      console.warn('Attempted to add a duplicate book (by bookId).');
      return [...array];
    }
  } else if ('text' in object) {
    if (array.every((o: Type) => (o as Quote).text !== object.text)) {
      return [...array, object];
    } else {
      console.warn('Attempted to add a duplicate quote (by text).');
      return [...array];
    }
  }

  return [...array];
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
  if (!array || array.length === 0) {
    return [];
  }

  let key: 'bookId' | 'text';
  let valueToMatch: string | undefined;

  if ('bookId' in object) {
    key = 'bookId';
    valueToMatch = (object as Book).bookId;
  } else if ('text' in object) {
    key = 'text';
    valueToMatch = (object as Quote).text;
  } else {
    return array;
  }

  const newArray: Type[] = [];
  let foundAndRemoved = false;

  for (let i = 0; i < array.length; i++) {
    const currentObject = array[i];
    let matches = false;

    if (key === 'bookId' && (currentObject as Book).bookId === valueToMatch) {
      matches = true;
    } else if (
      key === 'text' &&
      (currentObject as Quote).text === valueToMatch
    ) {
      matches = true;
    }

    if (matches && !foundAndRemoved) {
      foundAndRemoved = true;
    } else {
      newArray.push(currentObject);
    }
  }

  return newArray;
}
