import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
};

function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button className={`${styles.button} ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;