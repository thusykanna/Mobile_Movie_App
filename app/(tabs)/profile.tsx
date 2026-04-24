import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const SAVED_KEY = 'savedMovies'

const Profile = () => {
  const [savedCount, setSavedCount] = useState(0)

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem(SAVED_KEY).then(raw => {
        setSavedCount(raw ? JSON.parse(raw).length : 0)
      })
    }, [])
  )

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" resizeMode="cover" />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 px-5">
        <Image source={icons.logo} className="w-20 h-20 mt-20 mb-8 mx-auto" />

        {/* Avatar */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full bg-dark-100 items-center justify-center mb-3">
            <Feather name="user" size={48} color="#AB8BFF" />
          </View>
          <Text className="text-white text-xl font-bold">Movie Fan</Text>
          <Text className="text-light-300 text-sm mt-1">Welcome back!</Text>
        </View>

        {/* Stats */}
        <View className="flex-row justify-center gap-x-6 mb-8">
          <View className="bg-dark-100 rounded-2xl px-8 py-5 items-center">
            <Text className="text-accent text-3xl font-bold">{savedCount}</Text>
            <Text className="text-light-200 text-sm mt-1">Saved</Text>
          </View>
        </View>

        {/* Info rows */}
        <View className="bg-dark-100 rounded-2xl px-5 py-4 gap-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-light-200">Watchlist</Text>
            <Text className="text-white font-semibold">{savedCount} movies</Text>
          </View>
          <View className="h-px bg-dark-200" />
          <View className="flex-row items-center justify-between">
            <Text className="text-light-200">Powered by</Text>
            <Text className="text-white font-semibold">TMDB</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Profile
