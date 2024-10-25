import axios from "axios";

const url = "https://api.themoviedb.org/3";
const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTAwOWRiNjQwMjk5YjUxYzAzZGE2ODZiZjZhMTkwOCIsIm5iZiI6MTcyNjU3MzkzOS40NzYzMTQsInN1YiI6IjY2ZTJkMDc3YzgxYjI0YjNmZTIzOGNlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.teT-KNGqvBXCurFS9JsHdTqWFHetA4UFuIpDU6EqrwY",
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${url}/trending/movie/day`, options);
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}`, options);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}/credits`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${url}/movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${url}/search/movie?query=${query}`,
    options
  );
  return response.data.results;
};
