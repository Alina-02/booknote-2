import { Book } from '../models/books';

export const getCoverId = (book: Book) => {
  return (book.title + book.author).replace(/ /g, '').toLowerCase();
};

export function addObjectToAnArray<
  Type extends { id?: string; text?: string }
>({
  array,
  object,
  isBook,
}: {
  array: Type[];
  object: Type;
  isBook: boolean;
}): Type[] {
  if (array.length === 0) {
    return [object];
  }

  if (isBook) {
    if (array.every((o: Type) => o.id !== object.id)) {
      array.push(object);
      return array;
    }
  } else {
    if (array.every((o: Type) => o.text !== object.text)) {
      array.push(object);
      return array;
    }
  }

  return [];
}

export function editObjectFromAnArray<
  Type extends { id?: string; text?: string }
>({
  array,
  object,
  isBook,
}: {
  array: Type[];
  object: Type;
  isBook: boolean;
}): Type[] {
  if (array.length === 1) {
    return [object];
  }

  if (isBook) {
    const index = array.findIndex((o: Type) => o.id === object.id);
    array[index] = object;
    return array;
  } else {
    const index = array.findIndex((o: Type) => o.text === object.text);
    array[index] = object;
    return array;
  }

  return [];
}

export function deleteObjectFromAnArray<
  Type extends { id?: string; text?: string }
>({
  array,
  object,
  isBook,
}: {
  array: Type[];
  object: Type;
  isBook: boolean;
}): Type[] {
  if (array.length === 1) {
    return [object];
  }

  if (isBook) {
    return array.filter((o: Type) => o.id !== object.id);
  } else {
    return array.filter((o: Type) => o.text !== object.text);
  }

  return [];
}
