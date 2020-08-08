import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import WordItem from "../components/WordItem";

const MywordsScreen = (props) => {
  const words = useSelector((state) => state.word.words);

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <WordItem
          word={itemData.item.word}
          description={itemData.item.description}
          onSelect={() => {
            props.navigation.navigate("WordDetail");
          }}
        />
      )}
    />
  );
};

MywordsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "All Words",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add Word"
          iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddWord");
          }}
        />
      </HeaderButtons>
    ),
  };
};

const style = StyleSheet.create();

export default MywordsScreen;
