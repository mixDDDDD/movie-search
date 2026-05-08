import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Title from '../../components/Title/Title';
import Paragraph from '../../components/Paragraph/Paragraph';
import Search from '../../components/Search/Search';
import MovieList from '../../components/MovieList/MovieList';
import { MovieModel } from '../../types/models';
import { buildSearchUrl } from '../../lib/api';
import styles from './Home.module.css';

function getBetterPoster(url: string): string {
  return url.replace('_SX300.', '_SX600.');
}

type OMDBItem = {
  imdbID: string;
  Title?: string;
  Poster?: string;
  Year?: string;
};

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';

  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchMovies = async (query: string, retries = 2) => {
    if (!query.trim()) {
      setMovies([]);
      setError('');
      return;
    }

    setLoading(true);
    setError('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(buildSearchUrl(query), {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data: { Response: string; Search?: OMDBItem[] } = await response.json();

      if (data.Response === 'True' && data.Search?.length) {
        const searchMovies: MovieModel[] = data.Search.map((item) => ({
          id: item.imdbID,
          title: item.Title ?? 'Без названия',
          image: item.Poster && item.Poster !== 'N/A' ? getBetterPoster(item.Poster) : '',
          year: item.Year,
        }));

        setMovies(searchMovies);
      } else {
        setMovies([]);
      }
    } catch (e: unknown) {
      clearTimeout(timeoutId);

      if (retries > 0) {
        await new Promise((r) => setTimeout(r, 1000));
        return fetchMovies(query, retries - 1);
      }

      setMovies([]);
      if (e instanceof DOMException && e.name === 'AbortError') {
        setError('Сервер долго не отвечает. Попробуйте позже.');
      } else {
        setError('Ошибка сети. Попробуйте позже.');
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (queryFromUrl) {
      fetchMovies(queryFromUrl);
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchParams(query ? { q: query } : {});
    fetchMovies(query);
  };

  return (
    <section className={styles.home}>
      <div className={styles['home__header']}>
        <Title>Поиск</Title>

        <Paragraph>
          Введите название фильма для поиска и добавления в избранное.
        </Paragraph>
      </div>

      <Search onSearch={handleSearch} initialValue={queryFromUrl} />

      {loading && (
        <div className={styles.status}>
          🔄 Загрузка результатов...
        </div>
      )}

      {error && (
        <div className={`${styles.status} ${styles['status--error']}`}>
          {error}
        </div>
      )}

      {!loading && !error && movies.length === 0 && queryFromUrl && (
        <div className={`${styles.status} ${styles['status--empty']}`}>
          <p className={styles.status__title}>
            Упс... Ничего не найдено
          </p>
          <p className={styles.status__subtitle}>
            Попробуйте изменить запрос или ввести более точное название фильма
          </p>
        </div>
      )}

      {!loading && !error && movies.length === 0 && !queryFromUrl && (
        <div className={styles.status}>
          <p className={styles.status__hint}>Начните поиск фильма!</p>
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
    </section>
  );
}