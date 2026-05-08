import { useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { logout } from '../store/slices/userSlice';
import { setFavorites, clearFavorites, getFavoritesKey } from '../store/slices/favoritesSlice';
import loginIcon from '/login.svg';
import styles from './Layout.module.css';

type NavData = { isActive: boolean };

const Layout = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userName = useAppSelector(
    (state) => state.user.name
  );

  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    if (userName) {
      const key = getFavoritesKey(userName);
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          const items = JSON.parse(raw);
          if (Array.isArray(items)) {
            dispatch(setFavorites(items));
          }
        }
      } catch {}
    } else {
      dispatch(clearFavorites());
    }
  }, [userName, dispatch]);

  const navClassName = ({ isActive }: NavData) =>
    `${styles['layout__link']} ${isActive ? styles['layout__link--active'] : ''}`;

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.layout}>
      <header className={styles['layout__header']}>
        <nav className={styles['layout__nav']}>
          <NavLink to="/" end className={navClassName}>
            Поиск фильмов
          </NavLink>

          {userName && (
            <NavLink to="/favorites" className={navClassName}>
              Избранное
            </NavLink>
          )}
        </nav>

        <div className={styles['layout__header-right']}>
          {userName ? (
            <>
              <span className={styles['layout__user-name']}>{userName}</span>
              <button
                className={styles['layout__logout-btn']}
                onClick={handleLogout}
              >
                Выйти
              </button>
            </>
          ) : !isLoginPage ? (
            <NavLink to="/login" className={styles['layout__login-link']}>
              Войти
              <img src={loginIcon} alt="" width="24" height="24" />
            </NavLink>
          ) : null}
        </div>
      </header>

      <main className={styles['layout__content']}>
        {isLoading ? (
          <div className={styles['layout__loading']}>
            <div className={styles['layout__spinner']}></div>
            <span>Загрузка...</span>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Layout;