import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import useFetch from "@/services/useFetch";
import { fetchPopularMovies, fetchTrendingMovies } from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchPopularMovies({ query: '' }));

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(fetchTrendingMovies);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        <SearchBar
          placeholder="Search movies..."
          onPress={() => router.push("/search")}
        />

        {/* Trending Section */}
        {!trendingError && (
          <View className="mt-8">
            <Text className="text-lg text-white font-bold mb-3">Trending This Week</Text>
            {trendingLoading ? (
              <ActivityIndicator size="small" color="#AB8BFF" />
            ) : (
              <FlatList
                data={trendingMovies?.slice(0, 10)}
                renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                keyExtractor={item => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled
              />
            )}
          </View>
        )}

        {/* Popular Movies Section */}
        <View className="flex-1 mt-8">
          <Text className="text-lg text-white font-bold mb-3">Popular Movies</Text>
          {moviesLoading ? (
            <ActivityIndicator size="large" color="#AB8BFF" className="mt-10 self-center" />
          ) : moviesError ? (
            <Text className="text-red-500">Error: {moviesError?.message}</Text>
          ) : (
            <FlatList
              data={movies}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={item => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: 'flex-start',
                gap: 20,
                paddingRight: 5,
                paddingBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
}
