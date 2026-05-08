import { useState } from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import searchIcon from '/search.svg';
import styles from './Search.module.css';

type SearchProps = {
  onSearch: (query: string) => void
  initialValue?: string
}

function Search({ onSearch, initialValue = '' }: SearchProps) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmed = value.trim();
    if (!trimmed) {
      return;
    }

    onSearch(trimmed);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.search}>
      <Input
        placeholder="Введите название"
        icon={<img src={searchIcon} alt="Поиск" width="24" height="24" />}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <Button className={styles.search__button} onClick={handleSearch}>Искать</Button>
    </div>
  );
}

export default Search;