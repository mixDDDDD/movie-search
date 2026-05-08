import styles from './Input.module.css'

type InputProps = {
  placeholder?: string
  icon?: React.ReactNode
  type?: string
  value?: string
  className?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

function Input({ placeholder, icon, type = 'text', value, onChange, onKeyDown, className }: InputProps) {
  return (
    <div className={`${styles.input} ${icon ? styles.input_withIcon : ''} ${className || ''}`}>
      {icon && <span className={styles.input__icon}>{icon}</span>}
      <input
        className={styles.input__field}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

export default Input;