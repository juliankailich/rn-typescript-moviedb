import React from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { FullScreenLoader } from '../../components/loaders/FullScreenLoader';
import {HorizontalCarousel} from '../../components/movies/HorizontalCarousel';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {useMovies} from '../../hooks/useMovies';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage} =
    useMovies();

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>
        <PosterCarousel movies={nowPlaying} />
        <HorizontalCarousel
          movies={popular}
          title={'Popular'}
          loadNextPage={popularNextPage}
        />
        <HorizontalCarousel movies={upcoming} title={'Upcoming'} />
        <HorizontalCarousel movies={topRated} title={'Top Rated'} />
      </View>
    </ScrollView>
  );
};
