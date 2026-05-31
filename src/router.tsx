import { createBrowserRouter } from 'react-router-dom';
import { buildMovieUrl } from './lib/api';
import Layout from './Layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Movie from './pages/Movie/Movie';
import MovieError from './pages/Movie/MovieError';
import Favorites from './pages/Favorites/Favorites';
import ProtectedRoute from './guards/ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },

      {
        path: 'movie/:id',
        element: <Movie />,
        errorElement: <MovieError />,
        loader: async ({ params }) => {
          const response = await fetch(buildMovieUrl(params.id!));

          if (!response.ok) {
            throw new Response('Фильм не найден', { status: 404 });
          }

          const data = await response.json();

          if (data.Response === 'False') {
            throw new Response(data.Error || 'Фильм не найден', { status: 404 });
          }

          return data;
        },
      },

      {
        element: <ProtectedRoute />,
        children: [
          { path: 'favorites', element: <Favorites /> },
        ],
      },
    ],
  },
]);