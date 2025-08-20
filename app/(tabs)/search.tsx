import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import { fetchPopularMovies } from '@/services/api'
import useFetch from '@/services/useFetch'
import { useRouter } from 'expo-router'

const search = () => {
  const router = useRouter();

  const {
    data : movies, 
    loading : moviesLoading, 
    error : moviesError} = useFetch(() =>
    fetchPopularMovies({query : ''
  }));

  return (
    <View className='flex-1 bg-primary'>
      <Image source = {images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover' />
      <FlatList
        data={Array.isArray(movies) ? movies : []}
        renderItem={({item}) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id?.toString?.() ?? item.slug ?? item.title ?? Math.random().toString()}
      />
    </View>
  )
}

export default search