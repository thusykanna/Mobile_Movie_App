import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'

const TabIcon = ({focused, icon, title}: any) => {
  if (focused) {
  return (
      <ImageBackground
            source={images.highlight}
            className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden'
        >
            <Image 
              source={icon} 
              tintColor="#151312" 
              className="size-5"/>
            <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
    )
  } else {
    return (
        <View className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 px-14 justify-center items-center rounded-full overflow-hidden'
        >
            <Image 
              source={icon} 
              tintColor="#A8B5Db" 
              className="size-5"/>
            <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
        </View>
    )
  }
}

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen
            name="index"
            options={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: '100%', 
              height: "100%", 
              justifyContent: 'center',
              alignItems: 'center'
            },
            tabBarStyle:{
              backgroundColor: '#0f0D23', 
              borderRadius: 50, 
              marginHorizontal: 20, 
              marginBottom: 36, 
              height: 52, 
              position: 'absolute', 
              overflow: 'hidden', 
              borderWidth: 1,
              borderColor: '0f0d23'
            },
            title: "Home",
            headerShown: false,
              tabBarIcon: ({ focused }) => (
                <>
                  <TabIcon
                  focused={focused}
                  icon = {icons.home}
                  title = "Home" />
                </>
              )
            }}
        />
        <Tabs.Screen
            name="search"
            options={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: '100%', 
              height: "100%", 
              justifyContent: 'center',
              alignItems: 'center'
            },
            tabBarStyle:{
              backgroundColor: '#0f0D23', 
              borderRadius: 50, 
              marginHorizontal: 20, 
              marginBottom: 36, 
              height: 52, 
              position: 'absolute', 
              overflow: 'hidden', 
              borderWidth: 1,
              borderColor: '0f0d23'
            },
            title: "Search",
            headerShown: false,
              tabBarIcon: ({ focused }) => (
                <>
                  <TabIcon
                  focused={focused}
                  icon = {icons.search}
                  title = "Search" />
                </>
              )
            }}
        />
        <Tabs.Screen
            name="saved"
            options={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: '100%', 
              height: "100%", 
              justifyContent: 'center',
              alignItems: 'center'
            },
            tabBarStyle:{
              backgroundColor: '#0f0D23', 
              borderRadius: 50, 
              marginHorizontal: 20, 
              marginBottom: 36, 
              height: 52, 
              position: 'absolute', 
              overflow: 'hidden', 
              borderWidth: 1,
              borderColor: '0f0d23'
            },
            title: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <>
                <TabIcon
                focused={focused}
                icon = {icons.save}
                title = "Saved" />
              </>
            )
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
            tabBarShowLabel: false,
            tabBarItemStyle: {
              width: '100%', 
              height: "100%", 
              justifyContent: 'center',
              alignItems: 'center'
            },
            tabBarStyle:{
              backgroundColor: '#0f0D23', 
              borderRadius: 50, 
              marginHorizontal: 20, 
              marginBottom: 36, 
              height: 52, 
              position: 'absolute', 
              overflow: 'hidden', 
              borderWidth: 1,
              borderColor: '0f0d23'
            },
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <>
                <TabIcon
                focused={focused}
                icon = {icons.person}
                title = "Profile" />
              </>
            )
            }}
        />
    </Tabs>
  )
}

export default _layout