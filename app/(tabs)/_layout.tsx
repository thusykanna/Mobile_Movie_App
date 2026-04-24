import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import { images } from '@/constants/images'

const tabBarStyle = {
  backgroundColor: '#0f0D23',
  borderRadius: 50,
  marginHorizontal: 20,
  marginBottom: 36,
  height: 52,
  position: 'absolute' as const,
  borderWidth: 1,
  borderColor: '#0f0d23',
}

const tabBarItemStyle = {
  width: '100%' as const,
  height: '100%' as const,
  justifyContent: 'center' as const,
  alignItems: 'center' as const,
}

const TabIcon = ({
  focused,
  iconName,
  title,
}: {
  focused: boolean
  iconName: React.ComponentProps<typeof Feather>['name']
  title: string
}) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        style={{
          flexDirection: 'row',
          flex: 1,
          minWidth: 112,
          minHeight: 52,
          marginTop: 14,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          overflow: 'hidden',
          paddingHorizontal: 16,
        }}
      >
        <Feather name={iconName} size={20} color="#151312" />
        <Text style={{ color: '#151312', fontSize: 14, fontWeight: '600', marginLeft: 8 }}>
          {title}
        </Text>
      </ImageBackground>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 52,
        marginTop: 14,
      }}
    >
      <Feather name={iconName} size={20} color="#A8B5DB" />
    </View>
  )
}

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarItemStyle,
          tabBarStyle,
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="home" title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarShowLabel: false,
          tabBarItemStyle,
          tabBarStyle,
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="search" title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarShowLabel: false,
          tabBarItemStyle,
          tabBarStyle,
          title: 'Saved',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="bookmark" title="Saved" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarItemStyle,
          tabBarStyle,
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} iconName="user" title="Profile" />
          ),
        }}
      />
    </Tabs>
  )
}

export default _layout