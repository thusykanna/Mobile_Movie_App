import { View, Image, TextInput, Pressable } from "react-native";
import React from "react";
import { icons } from "@/constants/icons";

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const SearchBar: React.FC<Props> = ({ placeholder, onPress, value, onChangeText, onSubmitEditing }) => {
  const inputRef = React.useRef<TextInput>(null);
  return (
    <Pressable
      className="flex-row items-center bg-dark-200 rounded-full px-5 py-4"
      onPress={() => {
        if (onPress) {
          onPress();
        } else {
          inputRef.current?.focus();
        }
      }}
    >
      <Image
        source={icons.search}
        className="w-5 h-5"
        resizeMode="contain"
        style={{ tintColor: "#ab8bff" }}
      />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        className="flex-1 ml-2 text-white"
        returnKeyType="search"
        editable={!onPress}
      />
    </Pressable>
  );
};

export default SearchBar;
