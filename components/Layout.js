import Head from "next/head";
import { useContext } from "react";
import { Context } from "../pages/_app";
import Navbar from "./Navbar";
export default function Layout({ children }) {
  const { meta } = useContext(Context);
  return (
    <div>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      {children}
    </div>
  );
}
