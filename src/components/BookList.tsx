import React, { useState, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Book from "./Book";
import { IFirestoreBook } from "../services/types";
import { fbFirestore, fbStorage } from '../services/firebase'

/**
 * Renderiza a lista de livros do firestore
 */
const BookList: React.FC<{}> = () => {
  const [books, setBooks] = useState<Record<string, IFirestoreBook>>({});

  const handleLoadBooks = async () => {
    const newBooks = { ...books };

    // Retorna todos os documents da collection de livros
    const { docs } = await fbFirestore.collection('books').get();

    docs.forEach(doc => {
      const { id } = doc;

      const book: IFirestoreBook = {
        name: doc.data().name,
        price: doc.data().price
      }

      Object.assign(newBooks, { [id]: book });
    });

    setBooks(newBooks);
  }

  useEffect(() => {
    handleLoadBooks();
  }, []);

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {Object.entries(books).map(([key, value]) => (
          <Grid sm={6} xs={6} md={2} lg={3} item key={key}>
            <Book book={value} id={key}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default BookList;
