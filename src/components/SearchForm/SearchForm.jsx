import css from "./SearchForm.module.css";
import { useState } from "react";

export default function SearchForm({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        value={searchQuery}
        onChange={handleChange}
        className={css.searchInput}
      />
      <button type="submit">Search</button>
    </form>
  );
}
