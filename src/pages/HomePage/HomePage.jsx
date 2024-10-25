import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../tmdbApi";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      {loading && <Loader />}
      {error && <h2>Oops! Something went wrong</h2>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
}
