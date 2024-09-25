import React, {useEffect, useState} from 'react';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';

let popularPage = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const [nowPlayingMovies, topRatedMovies, popularMovies, upcomingMovies] =
      await Promise.all([
        UseCases.moviesNowPlayingUseCase(movieDBFetcher),
        UseCases.moviesTopRatedUseCase(movieDBFetcher),
        UseCases.moviesPopularUseCase(movieDBFetcher),
        UseCases.moviesUpcomingUseCase(movieDBFetcher),
      ]);

    setNowPlaying(nowPlayingMovies);
    setTopRated(topRatedMovies);
    setPopular(popularMovies);
    setUpcoming(upcomingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    topRated,
    popular,
    upcoming,

    popularNextPage: async() => {
      popularPage++;
      const popularMovies =  await UseCases.moviesPopularUseCase(movieDBFetcher, {
        page: popularPage
      });

      setPopular(prev => [...prev, ...popularMovies])
    }
  };
};
