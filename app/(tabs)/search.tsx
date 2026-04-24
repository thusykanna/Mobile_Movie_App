import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { images } from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import { fetchPopularMovies } from "@/services/api";
import { icons } from "@/constants/icons";
import SearchBar from "@/components/SearchBar";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) {
      setMovies([]);
      setHasSearched(false);
      return;
    }
    const timer = setTimeout(async () => {
      setHasSearched(true);
      setLoading(true);
      setError(null);
      try {
        const results = await fetchPopularMovies({ query: trimmed });
        setMovies(Array.isArray(results) ? results : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load movies");
      } finally {
        setLoading(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover" />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "flex-start", gap: 16, marginVertical: 16 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.logo} className="w-20 h-20" />
            </View>

            <View className="my-5">
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {loading && (
              <ActivityIndicator size="large" color="#AB8BFF" className="my-3" />
            )}

            {error && (
              <Text className="text-red-500 px-5 my-3">Error: {error}</Text>
            )}

            {!loading && !error && searchQuery.trim() !== "" && movies.length > 0 && (
              <Text className="text-xl text-white font-bold mb-2">
                Results for <Text className="text-accent">{searchQuery}</Text>
              </Text>
            )}

            {!loading && !error && hasSearched && movies.length === 0 && (
              <Text className="text-light-200 text-center mt-10">
                No results found for "{searchQuery}"
              </Text>
            )}
          </>
        }
      />
    </View>
  );
};

export default Search;
