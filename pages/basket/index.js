/* eslint-disable import/no-anonymous-default-export */

import { useContext } from "react";
import { Context } from "../_app";
import Link from "next/link";
import { useRouter } from "next/router";
// eslint-disable-next-line react/display-name
export default () => {
  const { decrementBookCount, incrementBookCount, books, bookCount } =
    useContext(Context);
  const { push } = useRouter();

  return (
    <main className="main">
      <button className="btn btn-link flex-center" onClick={() => push("/")}>
        <span className="left-arrow">{"<"}</span>Go to homepage
      </button>
      <div>
        <h1>Basket summary</h1>
        <ul>
          {books.map(({ title, id }) => (
            <li key={id} className="basket-list-item">
              <h3>
                {title} <span style={{ color: "red" }}>x {bookCount[id]}</span>
              </h3>
              <div>
                <button onClick={decrementBookCount(id)}>Remove</button>
              </div>
              <div>
                <button onClick={incrementBookCount(id)}>+</button>
              </div>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={() => console.log(books)}>Pay</button>
        </div>
      </div>
    </main>
  );
};
