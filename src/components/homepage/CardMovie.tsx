import React from 'react';
import { BASE_URL_IMAGE } from '../../lib/constants';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

type CardMovieProps = {
  image: string;
  title: string;
  releaseDate: string;
  rating: number;
  id: number;
};

const CardMovie: React.FC<CardMovieProps> = ({
  image,
  title,
  releaseDate,
  rating,
  id,
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <div className="flex flex-col mb-2 bg-slate-100 md:max-w-52 w-full rounded-lg p-3">
        <img src={BASE_URL_IMAGE + image} alt={title} className="rounded-md" />
        <div className="font-bold line-clamp-1 mt-2">{title}</div>
        <p className="text-xs">{format(releaseDate, 'dd MMM yyyy')}</p>
        <p className="text-xs">{rating}</p>
      </div>
    </Link>
  );
};

export default CardMovie;
