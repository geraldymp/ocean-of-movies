// app/movieDetail.tsx
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Movie } from '../types/movie';
import { useLayoutEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { formatDate } from '@/utils/date';
import { IMovieDetail } from '@/types/movieDetail';
import Constants from 'expo-constants';

const fetchMovieDetail = async (id: string) => {
  const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey;
  const res = await axios.get<IMovieDetail>(`https://api.themoviedb.org/3/movie/${id}`, {
    params: { api_key: API_KEY, append_to_response: 'genres' },
  });
  return res.data;
};

export default function MovieDetail() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Movie Detail' });
  }, [navigation]);

  const { data: movie, isLoading, isError } = useQuery({
    queryKey: ['movieDetail', id],
    queryFn: () => fetchMovieDetail(id as string),
  });

  if (isLoading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  if (isError || !movie) return <Text style={{ color: 'white', padding: 16 }}>Failed to load movie</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111' }} contentContainerStyle={{ paddingBottom: 24 }}>
      <View>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}` }}
          style={{ width: '100%', height: 600 }}
          resizeMode="cover"
          
        />
        <LinearGradient
          colors={['transparent', '#111']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>

      <View style={{ padding: 16, marginTop: -100 }}>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold', marginBottom: 8 }}>
          {movie.title}
        </Text>

        <Text style={{ color: 'gray', fontSize: 14, marginBottom: 8 }}>
          {formatDate(movie.release_date)} • ⭐ {movie.vote_average.toFixed(1)} • {movie.original_language.toUpperCase()}
        </Text>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          {movie.genres?.map((genre) => (
            <View
              key={genre.id}
              style={{
                backgroundColor: '#222',
                borderRadius: 20,
                paddingHorizontal: 12,
                paddingVertical: 6,
                marginRight: 8,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 12 }}>{genre.name}</Text>
            </View>
          ))}
        </View>

        <Text style={{ color: 'white', fontSize: 16, lineHeight: 24 }}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}
