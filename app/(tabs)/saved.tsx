import { View, Text, Image, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
import MovieCard from '@/components/MovieCard'

const SAVED_KEY = 'savedMovies'

const Saved = () => {
  const [savedMovies, setSavedMovies] = useState<MovieDetails[]>([])

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(SAVED_KEY).then(raw => {
        setSavedMovies(raw ? JSON.parse(raw) : [])
      })
    }, [])
  )

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <FlatList
        data={savedMovies}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'flex-start', gap: 20, paddingHorizontal: 20, paddingBottom: 10 }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <View className="w-full px-5 mt-20 mb-5">
            <Image source={icons.logo} className="w-20 h-20 mx-auto mb-5" />
            <Text className="text-white text-xl font-bold">Saved Movies</Text>
          </View>
        }
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20 px-5">
            <Feather name="bookmark" size={48} color="#A8B5DB" style={{ opacity: 0.4 }} />
            <Text className="text-light-200 text-center text-base mt-4">No saved movies yet.</Text>
            <Text className="text-light-300 text-center text-sm mt-1">Tap the bookmark icon on any movie to add it here.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <MovieCard
            id={item.id}
            title={item.title}
            poster_path={item.poster_path ?? ''}
            vote_average={item.vote_average}
            release_date={item.release_date}
            adult={item.adult}
            backdrop_path={item.backdrop_path ?? ''}
            genre_ids={[]}
            original_language={item.original_language}
            original_title={item.original_title}
            overview={item.overview ?? ''}
            popularity={item.popularity}
            video={item.video}
            vote_count={item.vote_count}
          />
        )}
      />
    </View>
  )
}

export default Saved
