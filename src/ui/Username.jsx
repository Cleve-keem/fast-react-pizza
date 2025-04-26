import React from "react";
import { useSelector } from "react-redux";

export default function Username() {
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return <p className="hidden md:block">{username}</p>;
}
