import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeNotification } from '../../store/slices/notificationsSlice';
import styles from './Toast.module.css';

export default function Toast() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notifications.items);

  return (
    <div className={styles.container}>
      {notifications.map((n) => (
        <ToastItem key={n.id} id={n.id} message={n.message} onRemove={() => dispatch(removeNotification(n.id))} />
      ))}
    </div>
  );
}

type ToastItemProps = {
  id: string;
  message: string;
  onRemove: () => void;
};

function ToastItem({ id, message, onRemove }: ToastItemProps) {
  useEffect(() => {
    const timer = setTimeout(onRemove, 3000);
    return () => clearTimeout(timer);
  }, [id, onRemove]);

  return (
    <div className={styles.toast} onClick={onRemove}>
      <span>{message}</span>
      <button className={styles.close} onClick={onRemove}>×</button>
    </div>
  );
}