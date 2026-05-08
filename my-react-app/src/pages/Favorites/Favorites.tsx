import MovieList from '../../components/MovieList/MovieList';
import { useAppSelector } from '../../store/hooks';
import styles from './Favorites.module.css';

export default function Favorites() {
  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  if (!favorites.length) {
    return (
      <div className={styles.empty}>
        <p className={styles.empty__title}>
          Избранных фильмов нет
        </p>
        <p className={styles.empty__subtitle}>
          Добавьте фильмы в избранное со страницы поиска
        </p>
      </div>
    );
  }

  return <MovieList movies={favorites} />;
}