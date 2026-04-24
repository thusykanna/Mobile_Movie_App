import { TextInput, Pressable, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface Props {
  placeholder?: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
}

const SearchBar: React.FC<Props> = ({ placeholder, onPress, value, onChangeText, onSubmitEditing }) => {
  const inputRef = React.useRef<TextInput>(null);
  const containerStyle = "flex-row items-center bg-dark-200 rounded-full px-5 py-4";

  if (onPress) {
    return (
      <Pressable className={containerStyle} onPress={onPress}>
        <Feather name="search" size={20} color="#ab8bff" />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#a8b5db"
          className="flex-1 ml-2 text-white"
          editable={false}
          pointerEvents="none"
        />
      </Pressable>
    );
  }

  return (
    <View className={containerStyle}>
      <Feather name="search" size={20} color="#ab8bff" onPress={() => inputRef.current?.focus()} />
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        placeholderTextColor="#a8b5db"
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        className="flex-1 ml-2 text-white"
        returnKeyType="search"
        autoFocus={false}
      />
    </View>
  );
};

export default SearchBar;
