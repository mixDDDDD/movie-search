import { useNavigate } from 'react-router-dom';
import styles from './MovieCard.module.css';
import { MovieModel } from '../../types/models';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addFavorite, removeFavorite } from '../../store/slices/favoritesSlice';
import { addNotification } from '../../store/slices/notificationsSlice';
import likeIcon from '/like.svg';
import bookmarkIcon from '/bookmark.svg';

type MovieCardProps = {
  movie: MovieModel;
};

function MovieCard({ movie }: MovieCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  const userName = useAppSelector(
    (state) => state.user.name
  );

  const isFavorite = favorites.some(
    (item) => item.id === movie.id
  );

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userName) {
      dispatch(addNotification('Войдите в профиль, чтобы добавить фильм в избранное'));
      return;
    }

    if (isFavorite) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img
        src={movie.image}
        alt={movie.title}
        className={styles.poster}
        loading="lazy"
      />

      <div className={styles.info}>
        <h3 className={styles.title}>{movie.title}</h3>
        {movie.year && <span className={styles.year}>{movie.year}</span>}
      </div>

      <button
        onClick={handleToggleFavorite}
        className={`${styles.favoriteBtn} ${isFavorite ? styles['favoriteBtn--active'] : ''}`}
      >
        <img
          src={isFavorite ? bookmarkIcon : likeIcon}
          alt={isFavorite ? 'В избранном' : 'В избранное'}
          width="24"
          height="24"
        />
        <span>{isFavorite ? 'В избранном' : 'В избранное'}</span>
      </button>
    </div>
  );
}

export default MovieCard;