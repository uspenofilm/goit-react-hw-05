import {
  useParams,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { fetchMovieDetails } from "../../tmdbApi";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import css from "../MovieDetailsPage/MovieDetailsPage.module.css";
import { FaArrowLeftLong } from "react-icons/fa6";

export default function MovieDetailsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const movieDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMovieDetails(movieId);
        setMovie(results);
        console.log(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    movieDetails();
  }, [movieId]);

  const goBack = () => navigate(location.state?.from || "/movies");

  return (
    <>
      {error && <p>ERROR!</p>}
      {isLoading && <Loader />}
      {movie && (
        <div className={css.detailsContainer}>
          <button onClick={goBack} className={css.backBtn}>
            <FaArrowLeftLong />
            Go back
          </button>
          <div className={css.posterInfo}>
            {movie.poster_path !== null && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={css.poster}
              />
            )}
            <div className={css.infoContainer}>
              <h2>{movie.title}</h2>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
              <h3>Genres</h3>
              <p>
                {movie.genres.map((genre) => {
                  return `${genre.name}  `;
                })}
              </p>
            </div>
          </div>
          <ul className={css.addInfo}>
            Additional Information
            <div className={css.castReviews}>
              <li className={css.listItem}>
                <Link
                  state={{ from: location }}
                  to={`/movies/${movie.id}/cast`}
                  key={movie.id}
                >
                  <p>Cast</p>
                </Link>
              </li>
              <li className={css.listItem}>
                <Link
                  state={{ from: location }}
                  to={`/movies/${movie.id}/reviews`}
                  key={movie.id}
                >
                  <p>Reviews</p>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      )}
      <Outlet />
    </>
  );
}
