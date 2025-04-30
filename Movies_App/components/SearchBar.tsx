import { View, Text, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '@/constants/icons'

const SearchBar = () => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" style = {{tintColor: "#ab8bff"}} />
      <TextInput 
        placeholder='Search'
        placeholderTextColor="#a8b5db"
        onPress={() => {}}
        value=""
        onChangeText={() => {}}
        className="flex-1 ml-2 text-white"
      />
    </View>
  )
}

export default SearchBar;