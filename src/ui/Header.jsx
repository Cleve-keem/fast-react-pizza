import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "./Username";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-yellow-500 uppercase px-4 py-4 sm:px-6">
      <Link to="/" className="tracking-widest font-semibold">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
