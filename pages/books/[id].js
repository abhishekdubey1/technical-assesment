/* eslint-disable react/display-name */
/* eslint-disable import/no-anonymous-default-export */

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { API, endpoints } from "../../constants";
import { Context } from "../_app";

export default ({ book }) => {
  const { addBook, setMeta } = useContext(Context);
  const { back } = useRouter();

  useEffect(() => {
    setMeta({
      title: book.metaTitle,
      description: book.metaDescription,
    });
  }, [book.metaDescription, book.metaTitle, setMeta]);

  return book ? (
    <main className="main">
      <button onClick={back}>Go back</button>
      <h1>{book.title}</h1>
      <h3>{book.author}</h3>
      <div>
        <Image
          src={book.cover}
          alt={book.metaDescription}
          width="200px"
          height="400px"
          objectFit="contain"
        />
        <button onClick={addBook(book)}>Add to basket</button>
      </div>
    </main>
  ) : (
    "Loading"
  );
};

export async function getStaticProps({ params: { id } }) {
  const { BOOKS } = endpoints;
  const book = await axios(`${API}/${BOOKS}/${id}`);
  console.log(book);
  return {
    props: { book: book.data },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }],
    fallback: true,
  };
}
