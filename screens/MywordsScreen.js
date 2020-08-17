import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, Platform, FlatList, Alert, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { SearchBar } from "react-native-elements";

import CustomHeaderButton from "../components/CustomHeaderButton";
import WordItem from "../components/WordItem";
import * as wordsActions from "../store/wordsAction";

const MywordsScreen = (props) => {
  const words = useSelector((state) => state.word.words);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(wordsActions.loadWords());
  }, [dispatch]);

  return (
    <LinearGradient
      colors={["#ffffff", "#0f8794", "#221a8f"]}
      style={styles.gradient}
    >
      <View style={styles.viewStyle}>
        {/* <SearchBar
          round
          searchIcon={{ size: 25 }}
          onChangeText={(query) => {
            dispatch(wordsActions.searchWords(query));
            setSearch(query);
          }}
          onClear={() => {}}
          placeholder="Type Here to Search..."
          value={search}
        /> */}
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
      </View>
    </LinearGradient>
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

const styles = StyleSheet.create({
  gradient: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    marginTop: Platform.OS == "ios" ? 29 : 0,
  },
});

export default MywordsScreen;
