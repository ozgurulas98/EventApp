import React from "react";
import styles from "./SearchBar.style";
import { TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SearchBar = ({ onSearch }) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.title}
          placeholder="Etkinlik veya sanatçı arayın"
          placeholderTextColor={"#bfbfbf"}
          onChangeText={onSearch}
        />
        <Ionicons style={styles.icon} name="search" size={24} />
      </View>
      <View style={styles.separator} />
    </View>
  );
};

export default SearchBar;
