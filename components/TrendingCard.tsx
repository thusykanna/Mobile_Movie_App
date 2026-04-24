import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { images } from '@/constants/images'

interface TrendingCardProps {
  movie: Movie
  index: number
}

const TrendingCard = ({ movie, index }: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-32 relative mr-4">
        <Image
          source={{
            uri: movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : 'https://placehold.co/300x450/1a1a1a/ffffff.png',
          }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 px-2 pb-1">
          <Image
            source={images.rankingGradient}
            className="absolute bottom-0 left-0 right-0 h-20"
            resizeMode="stretch"
            style={{ opacity: 0.85 }}
          />
          <Text
            className="text-white font-bold text-5xl"
            style={{
              position: 'absolute',
              bottom: -4,
              left: 4,
              color: 'white',
              opacity: 0.9,
              fontSize: 64,
              lineHeight: 64,
              fontWeight: '900',
            }}
          >
            {index + 1}
          </Text>
        </View>
        <Text className="text-white text-xs font-semibold mt-2" numberOfLines={1}>
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard
