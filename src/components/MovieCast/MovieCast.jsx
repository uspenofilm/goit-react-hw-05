import css from "./MovieCast.module.css";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../tmdbApi";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";

export default function MovieCast() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [cast, setCast] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const movieCast = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMovieCast(movieId);
        setCast(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    movieCast();
  }, [movieId]);

  return (
    <>
      {error && <p>ERROR!</p>}
      {isLoading && <Loader />}
      {cast && (
        <ul className={css.castContainer}>
          {cast.map((castItem) => (
            <li className={css.listItem} key={castItem.cast_id}>
              {castItem.profile_path !== null && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${castItem.profile_path}`}
                  alt={castItem.name}
                  className={css.castImg}
                />
              )}
              <h3>{castItem.name}</h3>
              <p>{castItem.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
