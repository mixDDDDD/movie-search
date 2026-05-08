import MovieCard from '../MovieCard/MovieCard';
import { MovieModel } from '../../types/models';
import styles from './MovieList.module.css';

type Props = {
  movies: MovieModel[];
};

function MovieList({ movies }: Props) {
  return (
    <section className={styles['movies-list']}>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
}

export default MovieList;