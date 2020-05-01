import React from "react";

import { IFirestoreBook } from '../services/types';
/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ book: IFirestoreBook }> = ({ book }) => {
  return (
    <>
      <p>{book.name}</p>
      <p>{book.price}</p>
    </>
  )
};

export default Book;
