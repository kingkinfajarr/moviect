import { Link } from 'react-router-dom';
import api from '../services/api';
import { useEffect, useState } from 'react';
import { Movie } from '../types/movie.type';
import CardMovie from '../components/homepage/CardMovie';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function HomePage() {
  const [moviesNowPlaying, setMoviesNowPlaying] = useState<Movie>();
  const [moviesPopular, setMoviesPopular] = useState<Movie>();
  const [moviesTopRated, setMoviesTopRated] = useState<Movie>();

  const page: number = 1;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [nowPlaying, popular, topRated] = await Promise.all([
          api.moviesNowPlaying.list(page),
          api.moviesPopular.list(page),
          api.moviesTopRated.list(page),
        ]);

        setMoviesNowPlaying(nowPlaying);
        setMoviesPopular(popular);
        setMoviesTopRated(topRated);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderSlider = (movies?: Movie) =>
    movies ? (
      <Slider {...sliderSettings}>
        {movies.results.map((movie) => (
          <div key={movie.id} className="mr-2">
            <CardMovie
              id={movie.id}
              image={movie.poster_path}
              rating={movie.vote_average}
              title={movie.title}
              releaseDate={movie.release_date}
            />
          </div>
        ))}
      </Slider>
    ) : null;

  return (
    <>
      <section className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-3">Movie Now Playing</h1>
          <Link to={'/movies/now-playing'} className="underline text-sm">
            View All
          </Link>
        </div>
        {renderSlider(moviesNowPlaying)}
      </section>

      <hr className="my-6" />

      <section className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-3">Movie Popular</h1>
          <Link to={'/movies/popular'} className="underline text-sm">
            View All
          </Link>
        </div>
        {renderSlider(moviesPopular)}
      </section>

      <hr className="my-6" />

      <section className="py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-3">Movie Top Rated</h1>
          <Link to={'/movies/top-rated'} className="underline text-sm">
            View All
          </Link>
        </div>
        {renderSlider(moviesTopRated)}
      </section>
    </>
  );
}

export default HomePage;
