"use client";

import React, { ChangeEvent } from "react";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Input from "../formElements/Input";

import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";

import "./Search.scss";

const Search = () => {
  const [search, setSearch] = useState("");
  

  const router = useRouter();
  const params = useSearchParams();

  const handleSearchFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    if (!search || search.trim() === "") {
      return;
    }

    router.push(`/?search=${search}`);
    setSearch("");
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearch(e.target.value);
  };

  return (
    <form onSubmit={handleSearchFormSubmit} className={`search`}>
      <Input
        onChange={handleInputChange}
        value={search}
        type="search"
        placeholder="Search..."
        name="search"
        id="search"
        ariaLabel="Search flats"
        required
      />
      <button type="submit" aria-label="Search flats">
        <AiOutlineSearch />
      </button>
    </form>
  );
};

export default Search;
