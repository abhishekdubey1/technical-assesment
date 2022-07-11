import "../styles/normalize.css";
import "../styles/common.css";
import "../styles/styles.css";
import Layout from "../components/Layout";
import { createContext, useState } from "react";

export const Context = createContext();
const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [meta, setMeta] = useState({ title: "", description: "" });
  const [bookCount, setBookCount] = useState({});
  const addBook = (book) => () => {
    const setOfIds = new Set();
    const newBooks = books.map((b) => {
      setOfIds.add(b.id);
      return { ...b };
    });
    if (!setOfIds.has(book.id)) {
      newBooks.push(book);
      const newBookCount = { ...bookCount };
      newBookCount[book.id] = 1;
      setBookCount(newBookCount);
      setBooks(newBooks);
    }
  };
  const removeBook = (id) => () => {
    const filteredBooks = books.filter((b) => b.id !== id);
    setBooks(filteredBooks);
  };
  const incrementBookCount = (id) => () => {
    const newBookCount = { ...bookCount };
    newBookCount[id] = newBookCount[id] + 1;
    setBookCount(newBookCount);
  };
  const decrementBookCount = (id) => () => {
    const newBookCount = { ...bookCount };
    if (newBookCount[id] === 1) {
      delete newBookCount[id];
      console.log({ newBookCount });
      removeBook(id)();
    } else {
      newBookCount[id] = newBookCount[id] - 1;
    }
    setBookCount(newBookCount);
  };
  const value = {
    books,
    setBooks,
    addBook,
    removeBook,
    meta,
    setMeta,
    incrementBookCount,
    decrementBookCount,
    bookCount,
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </Provider>
  );
}

export default MyApp;
