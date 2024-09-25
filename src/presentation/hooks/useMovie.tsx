import React, {useEffect, useState} from 'react';
import {getMovieByIdUseCase} from '../../core/use-cases/movie/get-by-id.use-case';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import * as UseCases from '../../core/use-cases';
import {FullMovie} from '../../core/entities/movie.entity';
import {Cast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    const fullMoviePromise = await UseCases.getMovieByIdUseCase(
      movieDBFetcher,
      movieId,
    );

    const castPromise = await UseCases.getMovieCastUseCase(
      movieDBFetcher,
      movieId,
    );

    const [fullMovie, cast] = await Promise.all([
      fullMoviePromise,
      castPromise,
    ]);

    setMovie(fullMovie);
    setCast(cast);
    setIsLoading(false);
  };

  return {movie, cast, isLoading};
};
