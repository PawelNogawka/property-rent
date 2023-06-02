"use client";

import Link from "next/link";

import { GiCastle } from "@react-icons/all-files/gi/GiCastle";

import "./Logo.scss";

const Logo = () => {
  return (
    <Link href="/" className="logo" aria-label="Back to home">
      <GiCastle />
      <span className="logo__name">home</span>
    </Link>
  );
};

export default Logo;
