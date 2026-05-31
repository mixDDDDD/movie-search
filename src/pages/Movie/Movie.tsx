import { useLoaderData } from 'react-router-dom';
import styles from './Movie.module.css';

type OMDBMovieData = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{ Source: string; Value: string }>;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
};

export default function Movie() {
  const movie = useLoaderData() as OMDBMovieData;

  return (
    <section className={styles.page}>
      <div className={styles.header}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : ''}
          alt={movie.Title}
          className={styles.poster}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.Title}</h1>

          <p className={styles.meta}>
            {movie.Year}
            {movie.Runtime && ` · ${movie.Runtime}`}
            {movie.Genre && ` · ${movie.Genre}`}
          </p>

          {movie.imdbRating && movie.imdbRating !== 'N/A' && (
            <p className={styles.rating}>
              ⭐ {movie.imdbRating}
            </p>
          )}

          {movie.Plot && movie.Plot !== 'N/A' && (
            <p className={styles.plot}>{movie.Plot}</p>
          )}

          {movie.Director && movie.Director !== 'N/A' && (
            <p className={styles.detail}><strong>Режиссёр:</strong> {movie.Director}</p>
          )}

          {movie.Actors && movie.Actors !== 'N/A' && (
            <p className={styles.detail}><strong>В ролях:</strong> {movie.Actors}</p>
          )}
        </div>
      </div>
    </section>
  );
}