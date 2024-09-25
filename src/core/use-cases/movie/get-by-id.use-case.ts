import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import { MovieResult } from '../../../infrastructure/interfaces/movie-db-responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByIdUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {

    const movie = await fetcher.get<MovieResult>(`/${movieId}`);

    const fullMovie = MovieMapper.fromMovieDBToEntity(movie)

    return fullMovie;
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
};
