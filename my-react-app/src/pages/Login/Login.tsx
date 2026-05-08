import { useState, ChangeEvent } from 'react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login } from '../../store/slices/userSlice';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './Login.module.css';

const LS_KEY = 'profiles';

export default function Login() {
  const [name, setName] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userName = useAppSelector(
    (state) => state.user.name
  );

  const from =
    (location.state as { from?: Location })?.from?.pathname || '/';

  if (userName) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleLoginClick = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      alert('Имя должно быть не короче 2 символов');
      return;
    }

    let profiles: Array<{ name: string; isLoggedIn?: boolean }> = [];

    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) profiles = JSON.parse(raw);
    } catch {}

    profiles = profiles.map((p) =>
      p.name === trimmed
        ? { ...p, isLoggedIn: true }
        : { ...p, isLoggedIn: false }
    );

    if (!profiles.some((p) => p.name === trimmed)) {
      profiles.push({ name: trimmed, isLoggedIn: true });
    }

    localStorage.setItem(LS_KEY, JSON.stringify(profiles));

    dispatch(login(trimmed));
    navigate('/');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleLoginClick();
    }
  };

  return (
    <section className={styles['login-page']}>
      <div className={styles['login-page__card']}>
        <h1 className={styles['login-page__title']}>Вход</h1>
        <p className={styles['login-page__subtitle']}>Введите ваше имя, чтобы войти в профиль</p>
        <Input
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ваше имя"
        />
        <Button onClick={handleLoginClick}>Войти</Button>
      </div>
    </section>
  );
}