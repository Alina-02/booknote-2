import { expect, test } from 'vitest';
import { addObjectToAnArray, editObjectFromAnArray } from './utils';

test('add a book to an array with addObjectToAnArray', () => {
  expect(
    addObjectToAnArray({
      array: [],
      object: {
        bookId: '123456',
        title: 'Libro que tiene que añadirse',
        author: 'Desconocido',
        tags: ['Fantasy'],
      },
    })
  ).toStrictEqual([
    {
      bookId: '123456',
      title: 'Libro que tiene que añadirse',
      author: 'Desconocido',
      tags: ['Fantasy'],
    },
  ]);
});

test('add a book to an array that has this object already with addObjectToAnArray', () => {
  expect(
    addObjectToAnArray({
      array: [
        {
          bookId: '123456',
          title: 'Libro que tiene que añadirse',
          author: 'Desconocido',
          tags: ['Fantasy'],
        },
      ],
      object: {
        bookId: '123456',
        title: 'Libro que tiene que añadirse',
        author: 'Desconocido',
        tags: ['Fantasy'],
      },
    })
  ).toStrictEqual([
    {
      bookId: '123456',
      title: 'Libro que tiene que añadirse',
      author: 'Desconocido',
      tags: ['Fantasy'],
    },
  ]);
});

test('edit a book from an array with editObjectToAnArray', () => {
  expect(
    editObjectFromAnArray({
      array: [
        {
          bookId: '123456',
          title: 'Libro que tiene que añadirse',
          author: 'Desconocido',
          tags: ['Fantasy'],
        },
      ],
      object: {
        bookId: '123456',
        title: 'Libro que tiene que modificarse',
        author: 'Desconocido',
        tags: ['Fantasy'],
      },
    })
  ).toStrictEqual([
    {
      bookId: '123456',
      title: 'Libro que tiene que modificarse',
      author: 'Desconocido',
      tags: ['Fantasy'],
    },
  ]);
});

test('edit a book from an array where doesnt exists with editObjectToAnArray', () => {
  expect(
    editObjectFromAnArray({
      array: [],
      object: {
        bookId: '123456',
        title: 'Libro que tiene que modificarse',
        author: 'Desconocido',
        tags: ['Fantasy'],
      },
    })
  ).toStrictEqual([]);
});
