import Image from "next/image";
import Link from "next/link";
import mainImg from "../public/main-img.jpg";
import { API, endpoints } from "../constants";
import axios from "axios";
import { useContext, useEffect } from "react";
import { Context } from "./_app";

export default function Home({ books, homepage }) {
  const { setMeta } = useContext(Context);
  useEffect(() => {
    setMeta({
      title: homepage.SEO.metaTitle,
      description: homepage.SEO.metaDescription,
    });
  }, [homepage.SEO.metaDescription, homepage.SEO.metaTitle, setMeta]);

  return (
    <main className="main">
      <header className="header">
        <h1>Online Book Store</h1>
        <h3>Here you can order amazing books</h3>
      </header>
      <section className="section-1">
        <p>{homepage.homepageCopy}</p>
        <div className="section-1-list">
          <div className="section-1-img">
            <Image src={mainImg} alt="A book library" />
          </div>
          <ul className="">
            {books.map(({ id, title }) => (
              <li key={id}>
                <Link href={`/books/${id}`}>
                  <a>View Book {title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const { AVAILABLE_BOOKS, HOMEPAGE } = endpoints;
  const [books, homepage] = await Promise.all([
    axios(`${API}/${AVAILABLE_BOOKS}`),
    axios(`${API}/${HOMEPAGE}`),
  ]);
  return {
    props: {
      books: books.data,
      homepage: homepage.data,
    },
  };
}
