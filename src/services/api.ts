import axios, { AxiosError, AxiosResponse } from 'axios';
import { endpoint } from './endpoint';
import { Movie } from '../types/movie.type';
import { MovieDetail } from '../types/movie-detail.type';

const token = import.meta.env.VITE_REACT_APP_API_TOKEN;

axios.defaults.baseURL = endpoint.baseURL;

axios.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response) {
      const { data, status } = error.response;
      switch (status) {
        case 400:
          console.error(data);
          break;

        case 401:
          console.error('unauthorized');
          break;

        case 404:
          console.error('/not-found');
          break;

        case 500:
          console.error('/server-error');
          break;
        default:
          console.error('An unknown error occurred');
      }
    } else {
      console.error('No response from server');
    }
    return Promise.reject(error);
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  get: <T>(url: string, params?: object) =>
    axios.get<T>(url, { params }).then(responseBody),
};

const moviesNowPlaying = {
  list: (page: number) =>
    request.get<Movie>(endpoint.moviePlayingNow, { page }),
};

const moviesPopular = {
  list: (page: number) => request.get<Movie>(endpoint.moviePopular, { page }),
};

const moviesTopRated = {
  list: (page: number) => request.get<Movie>(endpoint.movieTopRated, { page }),
};

const moviesDetail = {
  list: (id: number) => request.get<MovieDetail>(`${endpoint.movie}/${id}`),
};

const api = {
  moviesNowPlaying,
  moviesPopular,
  moviesTopRated,
  moviesDetail,
};

export default api;
