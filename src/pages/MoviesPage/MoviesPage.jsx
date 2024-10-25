import SearchForm from "../../components/SearchForm/SearchForm";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader/Loader";
import { searchMovies } from "../../tmdbApi";
import MovieList from "../../components/MovieList/MovieList";

export default function MoviesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchValue = searchParams.get("q") ?? "";

  useEffect(() => {
    const movieSearch = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchMovies(searchValue);
        setResult(results);
        console.log(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (searchValue !== "") {
      movieSearch();
    } else {
      setResult(null);
    }
  }, [searchValue]);

  return (
    <>
      <SearchForm onSubmit={(input) => setSearchParams({ q: input })} />
      {error && <p>ERROR!</p>}
      {isLoading && <Loader />}
      {result && <MovieList movies={result} />}
      {result && result.length === 0 && <p>No results found</p>}
    </>
  );
}
