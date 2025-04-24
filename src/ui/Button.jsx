import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disable, to }) {
  const className =
    "bg-yellow-500 px-4 py-3 uppercase rounded-full hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 font-semibold inline-block tracking-wide transition-colors duration-300 disabled:cursor-not-allowed sm:px-6 sm:py-3";

  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disable} className={className}>
      {children}
    </button>
  );
}
