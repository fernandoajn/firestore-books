import React, { useState, useEffect } from "react";

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import bookStyles from '../styles/Book';
import { IFirestoreBook } from '../services/types';
import { fbStorage } from "../services/firebase";
import { getBookAuthorApi } from "../services/api";

/**
 * Livro a obtido do firestore
 */
const Book: React.FC<{ id: string, book: IFirestoreBook }> = ({ id, book }) => {
  const classes = bookStyles();
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
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={book.image_url}
            title={book.name}
          />

          <CardContent>
            <Typography gutterBottom variant="h6" component="h3" noWrap>
              {book.name}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Autor(a): {book.author}
            </Typography>

            <Typography variant="body2" color="textSecondary" component="p">
              Preço: R$ {book.price}
            </Typography>
          </CardContent>

        </CardActionArea>
      </Card>
    </>
  )
};

export default Book;
