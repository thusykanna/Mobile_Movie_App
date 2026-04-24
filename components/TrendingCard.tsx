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
      <TouchableOpacity className="mr-4" style={{ width: 120 }}>
        <View style={{ width: 120, height: 180 }}>
          <Image
            source={{
              uri: movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : 'https://placehold.co/300x450/1a1a1a/ffffff.png',
            }}
            style={{ width: 120, height: 180, borderRadius: 10 }}
            resizeMode="cover"
          />
          {/* Gradient overlay at bottom */}
          {/* <Image
            source={images.rankingGradient}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: 120,
              height: 80,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              opacity: 0.7,
            }}
            resizeMode="stretch"
          /> */}
          
          {/* Rank number */}
          <Text
            style={{
              position: 'absolute',
              bottom: -8,
              left: 6,
              fontSize: 56,
              fontWeight: '900',
              color: 'rgba(255, 255, 255, 0.94)',
              lineHeight: 72,
              textShadowColor: 'rgba(237, 26, 26, 0.9)',
              textShadowOffset: { width: 2, height: 2 },
              textShadowRadius: 4,
            }}
          >
            {index + 1}
          </Text>
        </View>
        <Text
          className="text-white text-xs font-semibold mt-2"
          numberOfLines={1}
          style={{ width: 120 }}
        >
          {movie.title}
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard
