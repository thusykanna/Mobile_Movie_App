import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Feather } from '@expo/vector-icons'
import useFetch from '@/services/useFetch'
import { fetchMovieDetails } from '@/services/api'

const SAVED_KEY = 'savedMovies'

const MovieDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const { data: movie, loading, error } = useFetch(() => fetchMovieDetails(Number(id)))
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(SAVED_KEY).then(raw => {
      if (raw) {
        const saved: MovieDetails[] = JSON.parse(raw)
        setIsSaved(saved.some(m => m.id === Number(id)))
      }
    })
  }, [id])

  const toggleSave = async () => {
    const raw = await AsyncStorage.getItem(SAVED_KEY)
    const saved: MovieDetails[] = raw ? JSON.parse(raw) : []
    if (isSaved) {
      const updated = saved.filter(m => m.id !== Number(id))
      await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(updated))
    } else if (movie) {
      saved.push(movie)
      await AsyncStorage.setItem(SAVED_KEY, JSON.stringify(saved))
    }
    setIsSaved(prev => !prev)
  }

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator size="large" color="#AB8BFF" />
      </View>
    )
  }

  if (error || !movie) {
    return (
      <View className="flex-1 bg-primary justify-center items-center px-5">
        <Text className="text-red-500 text-center">Failed to load movie details.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-accent">Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View className="flex-1 bg-primary">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
          }}
          className="w-full h-[550px]"
          resizeMode="stretch"
        />

        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-14 left-5 p-2 rounded-full bg-dark-100"
        >
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>

        {/* Save button */}
        <TouchableOpacity
          onPress={toggleSave}
          className="absolute top-14 right-5 p-2 rounded-full bg-dark-100"
        >
          <Feather name="bookmark" size={22} color={isSaved ? '#AB8BFF' : '#A8B5DB'} />
        </TouchableOpacity>

        <View className="px-5 pt-5">
          <Text className="text-white text-2xl font-bold">{movie.title}</Text>

          <View className="flex-row items-center gap-x-3 mt-2">
            <Text className="text-light-200 text-sm">{movie.release_date?.split('-')[0]}</Text>
            {movie.runtime ? (
              <>
                <Text className="text-light-300">•</Text>
                <Text className="text-light-200 text-sm">{movie.runtime} min</Text>
              </>
            ) : null}
          </View>

          <View className="flex-row items-center mt-2">
            <Feather name="star" size={14} color="#FFD700" />
            <Text className="text-white font-bold ml-1">{(movie.vote_average / 2).toFixed(1)}/5</Text>
            <Text className="text-light-300 text-sm ml-2">({movie.vote_count.toLocaleString()} votes)</Text>
          </View>

          {movie.genres?.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-4">
              {movie.genres.map(genre => (
                <View key={genre.id} className="bg-dark-100 rounded-full px-3 py-1">
                  <Text className="text-light-100 text-xs">{genre.name}</Text>
                </View>
              ))}
            </View>
          )}

          {movie.tagline ? (
            <Text className="text-light-300 italic mt-4">"{movie.tagline}"</Text>
          ) : null}

          {movie.overview ? (
            <>
              <Text className="text-white font-bold text-lg mt-5 mb-2">Overview</Text>
              <Text className="text-light-200 leading-6">{movie.overview}</Text>
            </>
          ) : null}

          <View className="mt-5 gap-y-4">
            <View className="flex-row justify-between">
              <View className="flex-1">
                <Text className="text-light-300 text-xs uppercase mb-1">Status</Text>
                <Text className="text-white">{movie.status}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-light-300 text-xs uppercase mb-1">Language</Text>
                <Text className="text-white uppercase">{movie.original_language}</Text>
              </View>
            </View>

            {(movie.budget > 0 || movie.revenue > 0) && (
              <View className="flex-row justify-between">
                {movie.budget > 0 && (
                  <View className="flex-1">
                    <Text className="text-light-300 text-xs uppercase mb-1">Budget</Text>
                    <Text className="text-white">${movie.budget.toLocaleString()}</Text>
                  </View>
                )}
                {movie.revenue > 0 && (
                  <View className="flex-1">
                    <Text className="text-light-300 text-xs uppercase mb-1">Revenue</Text>
                    <Text className="text-white">${movie.revenue.toLocaleString()}</Text>
                  </View>
                )}
              </View>
            )}

            {movie.production_companies?.length > 0 && (
              <View>
                <Text className="text-light-300 text-xs uppercase mb-1">Production</Text>
                <Text className="text-white">
                  {movie.production_companies.map(c => c.name).join(', ')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetailsScreen
