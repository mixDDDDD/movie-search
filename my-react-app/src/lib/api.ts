const API_KEY = '3612cee0';
const BASE_URL = 'https://www.omdbapi.com';

export function buildSearchUrl(query: string): string {
  return `${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
}

export function buildMovieUrl(id: string): string {
  return `${BASE_URL}/?apikey=${API_KEY}&i=${id}&plot=full`;
}