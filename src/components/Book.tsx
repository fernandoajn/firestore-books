import React, { useState, useEffect } from "react";

import { IFirestoreBook } from '../services/types';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ id: string, book: IFirestoreBook }> = ({ id, book }) => {
  const [bookInfo, setBookInfo] = useState<IFirestoreBook>(book);

  const handleLoadCover = async (bookId: string) => {
    const newBook = { ...bookInfo };

    const coverReference = fbStorage.ref('books').child(`${bookId}.jpg`);
    const url = await coverReference.getDownloadURL();

    Object.assign(bookInfo, { image_url: url });
    setBookInfo(newBook);
  }

  const handleLoadAuthor = async (bookId: string) => {
    const newBook = { ...bookInfo };

    const author = await getBookAuthorApi(bookId);

    Object.assign(bookInfo, { author: author });
    setBookInfo(newBook);
  }

  useEffect(() => {
    handleLoadAuthor(id);
    handleLoadCover(id);
  }, []);

  return (
    <>
      <strong>{book.name}</strong>
      <p>{book.price}</p>
      <p>{book.author}</p>
      <img src={book.image_url} alt={book.name} width="200"/>
    </>
  )
};

export default Book;
