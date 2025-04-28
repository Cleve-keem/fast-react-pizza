import React from "react";
import { Link } from "react-router-dom";

export default function Button({ children, disable, to, type, onClick }) {
  const base =
    "bg-yellow-500 text-xs uppercase rounded-full hover:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2 font-semibold inline-block tracking-wide transition-colors duration-300 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-3",
    small: base + " text-xs px-3 py-2 md:px-5 md:py-2.5",
    rounded: base + " px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
    secondary:
      "bg-transparent border-2 border-stone-300 uppercase text-xs text-stone-400 rounded-full hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 font-semibold inline-block tracking-wide transition-colors duration-300 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-2.5",
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick)
    return (
      <button disabled={disable} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );

  return (
    <button disabled={disable} className={styles[type]}>
      {children}
    </button>
  );
}
