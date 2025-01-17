/**
 * Livro guardado no firestore
 */
export interface IFirestoreBook {
  /** Nome do livro */
  name: string;
  /** Preço do livro  */
  price: number;

  image_url?: string;

  author?: string;
}
