import css from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../tmdbApi";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function MovieReviews() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    const movieReviews = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await fetchMovieReviews(movieId);
        setReviews(results);
        console.log(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    movieReviews();
  }, [movieId]);

  return (
    <>
      {error && <p>ERROR!</p>}
      {isLoading && <Loader />}
      {reviews && (
        <ul className={css.reviewsContainer}>
          {reviews.map((review) => (
            <li className={css.listItem} key={review.id}>
              <h3>Author: {review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && reviews.length === 0 && (
        <p>We don't have reviews for this movie</p>
      )}
    </>
  );
}
