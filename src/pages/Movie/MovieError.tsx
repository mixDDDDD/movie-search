import { Link } from 'react-router-dom';
import styles from './MovieError.module.css';

export default function MovieError() {
  return (
    <div className={styles.error}>
      <h2 className={styles.error__title}>Ошибка загрузки</h2>
      <p className={styles.error__text}>
        Не удалось загрузить информацию о фильме. Попробуйте позже.
      </p>
      <Link to="/" className={styles.error__link}>
        ← На главную
      </Link>
    </div>
  );
}