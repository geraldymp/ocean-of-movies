// app/movies.tsx
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useMovies } from '../hooks/useMovieList';
import MovieCardGrid from '@/components/MovieCardGrid';
import { useLayoutEffect } from 'react';
import { TYPE_TITLES } from '@/types/movies';

export default function MoviesScreen() {
  const { type } = useLocalSearchParams();
  const { data: movies, isLoading } = useMovies(type as any);
  const navigation = useNavigation();


  useLayoutEffect(() => {
    const titleText = TYPE_TITLES[type as string] || 'Movies';
    navigation.setOptions({ title: titleText });
  }, [type]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#111', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111', paddingTop: 16 }}>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCardGrid movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListEmptyComponent={() => (<Text style={{ color: 'white', textAlign: 'center' }}>No movies found</Text>)}    
      />
    </View>
  );
}
