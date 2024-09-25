import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MovieHeader} from '../../components/ movie/MovieHeader';
import {useMovie} from '../../hooks/useMovie';
import {RootStackParams} from '../../navigation/Navigation';
import {MovieDetails} from '../../components/ movie/MovieDetails';
import {ScrollView} from 'react-native-gesture-handler';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {
  const {movieId} = route.params;

  const {isLoading, movie, cast} = useMovie(movieId);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <>
      {movie && cast && (
        <ScrollView>
          <MovieHeader
            originalTitle={movie!.originalTitle}
            title={movie!.title}
            poster={movie!.poster}
          />

          <MovieDetails movie={movie} cast={cast} />
        </ScrollView>
      )}
    </>
  );
};
