// import React from 'react';
// import { View, Text, FlatList, Image, ActivityIndicator, Pressable } from 'react-native';
// import { usePopularMovies } from '../hooks/usePopularMovies';
// import { MaterialIcons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// export default function HomeScreen() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetchingNextPage,
//     isLoading,
//     isError,
//   } = usePopularMovies();

//   if (isLoading) return <Text>Loading...</Text>;
//   if (isError) return <Text>Something went wrong...</Text>;

//   const movies = data?.pages.flatMap((page) => page.results) ?? [];

//   return (
//     <FlatList
//       contentContainerStyle={{ padding: 16 }}
//       data={movies}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => (
//         <Pressable onPress={() => router.push({ pathname: '/movieDetail', params: { id: item.id.toString() } })}>
//           <View
//             style={{
//               flexDirection: 'row',
//               marginBottom: 16,
//               backgroundColor: '#fff',
//               borderRadius: 12,
//               padding: 10,
//               elevation: 2,
//               shadowColor: '#000',
//               shadowOpacity: 0.1,
//               shadowRadius: 4,
//               shadowOffset: { width: 0, height: 2 },
//             }}
//           >
//             <Image
//               source={{ uri: `https://image.tmdb.org/t/p/w185${item.poster_path}` }}
//               style={{ width: 100, height: 150, borderRadius: 8 }}
//             />

//             <View style={{ flex: 1, marginLeft: 12, justifyContent: 'space-between' }}>
//               <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
//               <Text numberOfLines={3} style={{ fontSize: 14, color: '#666', marginVertical: 4 }}>
//                 {item.overview}
//               </Text>

//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <MaterialIcons name="whatshot" size={16} color="orange" />
//                   <Text style={{ marginLeft: 4, fontSize: 13 }}>{item.popularity.toFixed(0)}</Text>
//                 </View>

//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <MaterialIcons name="star" size={16} color="gold" />
//                   <Text style={{ marginLeft: 4, fontSize: 13 }}>{item.vote_average.toFixed(1)}</Text>
//                 </View>
//               </View>
//             </View>
//           </View>

//         </Pressable>
//       )}
//       onEndReached={() => {
//         if (hasNextPage && !isFetchingNextPage) fetchNextPage();
//       }}
//       onEndReachedThreshold={0.5}
//       ListFooterComponent={
//         isFetchingNextPage ? <ActivityIndicator size="large" style={{ marginVertical: 20 }} /> : null
//       }
//     />
//   );
// }

// app/index.tsx
import { ScrollView, View, Text, FlatList } from 'react-native';
import { useMovies } from '../hooks/useMovieList';
// inside Section
import { useRouter } from 'expo-router';
import MovieCardHorizontal from '../components/MovieCardHorizontal';

interface SectionProps {
  title: string;
  movies: Array<any>;
  type: string;
}

const Section = ({ title, movies, type }: SectionProps) => {
  const router = useRouter();

  return (
    <View style={{ marginBottom: 24 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{title}</Text>
        <Text
          onPress={() => router.push({ pathname: '/movies', params: { type, title } })}
          style={{ color: '#aaa', fontSize: 14 }}>
          View All
        </Text>
      </View>
      <FlatList
        horizontal
        data={movies}
        renderItem={({ item }) => <MovieCardHorizontal movie={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};


export default function Home() {
  const { data: popular } = useMovies('popular');
  const { data: topRated } = useMovies('top_rated');
  const { data: nowPlaying } = useMovies('now_playing');
  const { data: upcoming } = useMovies('upcoming');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111', padding: 16 }}>
      {popular && <Section title="🔥 Featured" movies={popular.slice(0, 10)} type="popular" />}
      {topRated && <Section title="⭐ Top Rated" movies={topRated.slice(0, 10)} type="top_rated" />}
      {nowPlaying && <Section title="🎬 Now Playing" movies={nowPlaying.slice(0, 10)} type="now_playing" />}
      {upcoming && <Section title="⏳ Upcoming" movies={upcoming.slice(0, 10)} type="upcoming" />}
    </ScrollView>
  );
}

