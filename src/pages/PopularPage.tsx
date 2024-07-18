import { useEffect, useState } from 'react';
import { Movie } from '../types/movie.type';
import api from '../services/api';
import CardMovie from '../components/homepage/CardMovie';

const PopularPage = () => {
  const [popular, setPopular] = useState<Movie>({
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
    dates: {
      maximum: '',
      minimum: '',
    },
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const newPopular = await api.moviesPopular.list(page);
        setPopular((prevPopular) => ({
          ...newPopular,
          results: [...prevPopular.results, ...newPopular.results],
        }));
      } catch (err) {
        console.error(err);
      }
    };

    const timeoutId = setTimeout(fetchPopular, 300);

    return () => clearTimeout(timeoutId);
  }, [page]);

  const handleLoadMore = () => {
    if (popular.page >= popular.total_pages) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold my-10">Popular Movies</h1>
      <div className="grid grid-cols-7 gap-3">
        {popular.results.map((movie) => (
          <CardMovie
            id={movie.id}
            image={movie.poster_path}
            rating={movie.vote_average}
            title={movie.title}
            releaseDate={movie.release_date}
            key={movie.id}
          />
        ))}
      </div>
      <button
        onClick={handleLoadMore}
        className="bg-blue-500 block mt-5 px-4 py-2 text-white rounded-md mb-10"
      >
        Load More
      </button>
    </div>
  );
};

export default PopularPage;
