import { View, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { formatDate } from '@/utils/date';
import { Movie } from '@/types/movie';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 48) / 2; // 16 padding + 16 gap + 16 padding

export default function MovieCardGrid({ movie }: { movie: Movie }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push({ pathname: '/movieDetail', params: { id: movie.id.toString() } })}
      style={{ width: cardWidth, marginBottom: 16 }}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w342${movie.poster_path}` }}
        style={{ width: '100%', height: 240, borderRadius: 10 }}
      />
      <Text numberOfLines={2} style={{ color: 'white', marginTop: 6 }}>
        {movie.title}
      </Text>
      <Text style={{ color: '#aaa', fontSize: 12 }}>
        {`${formatDate(movie.release_date)} • ⭐ ${movie.vote_average.toFixed(2)}`}
      </Text>
    </TouchableOpacity>
  );
}
