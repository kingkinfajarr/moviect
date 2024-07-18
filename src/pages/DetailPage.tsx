import { useEffect, useState } from 'react';
import { MovieDetail } from '../types/movie-detail.type';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

const DetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await api.moviesDetail.list(Number(id));
        setMovie(movieData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 text-sm mb-4">
            {format(new Date(movie.release_date || ''), 'dd MMM yyyy')}
          </p>
          <p className="text-gray-900">{movie.overview}</p>
          <div className="flex items-center mt-4">
            <p className="text-gray-700 mr-2">Rating:</p>
            <div className="flex items-center">
              <p className="text-gray-700">{movie.vote_average}</p>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex flex-wrap">
              {movie.genres &&
                movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-lg text-sm mr-2 mb-2"
                  >
                    {genre.name}
                  </span>
                ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">Status: {movie.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
