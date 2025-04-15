import { View, Image, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Movie } from '@/types/movie';
// card component for home
export default function MovieCardHorizontal({ movie} : { movie: Movie }) {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push({ pathname: '/movieDetail', params: { id: movie.id.toString() } })} style={{ marginRight: 12 }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w185${movie.poster_path}` }}
        style={{ width: 120, height: 180, borderRadius: 10 }}
      />
      <Text numberOfLines={1} style={{ color: 'white', width: 120 }}>
        {movie.title}
      </Text>
    </TouchableOpacity>
  );
}
