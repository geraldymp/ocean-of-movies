import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Constants from 'expo-constants';

const API_KEY = Constants.expoConfig?.extra?.tmdbApiKey;
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = (type: string) =>
  axios.get(`${BASE_URL}/movie/${type}`, {
    params: { api_key: API_KEY },
  }).then(res => res.data.results);

export const useMovies = (type: 'popular' | 'top_rated' | 'now_playing' | 'upcoming') => {
  return useQuery({
    queryKey: [type],
    queryFn: () => fetchMovies(type),
  });
};