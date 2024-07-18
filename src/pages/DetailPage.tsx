import { useEffect, useState } from 'react';
import { MovieDetail } from '../types/movie-detail.type';
import api from '../services/api';
import { useParams } from 'react-router-dom';

export const DetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movie = await api.moviesDetail.list(Number(id));

        setMovie(movie);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <div>
      {movie && (
        <div>
          <img src={movie.poster_path} alt={movie.title} />
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <p>{movie.release_date}</p>
          <p>{movie.vote_average}</p>
        </div>
      )}
    </div>
  );
};
