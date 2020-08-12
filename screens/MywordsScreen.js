import React, { useEffect } from "react";
import { StyleSheet, Platform, FlatList, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import WordItem from "../components/WordItem";
import * as wordsActions from "../store/wordsAction";

const MywordsScreen = (props) => {
  const words = useSelector((state) => state.word.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordsActions.loadWords());
  }, [dispatch]);

  return (
    <FlatList
      data={words}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <WordItem
          word={itemData.item.word}
          description={itemData.item.description}
          onSelect={() => {
            props.navigation.navigate("WordDetail", {
              wordId: itemData.item.id,
              word: itemData.item.word,
            });
          }}
          onDelete={() => {
            {
              Alert.alert(
                "Delete Word",
                "Do you really want to delete this word?",
                [
                  { text: "No", style: "default" },
                  {
                    text: "Yes",
                    style: "destructive",
                    onPress: () => {
                      dispatch(wordsActions.deleteWord(itemData.item.id));
                      props.navigation.navigate("MyWords");
                    },
                  },
                ]
              );
            }
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
