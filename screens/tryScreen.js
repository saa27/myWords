/* import React, { useEffect, useState } from "react";
import { StyleSheet, Platform, FlatList, Alert } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";

import CustomHeaderButton from "../components/CustomHeaderButton";
import WordItem from "../components/WordItem";
import * as wordsActions from "../store/wordsAction";
import { getWords } from "../components/method";

const MywordsScreen = (props) => {
  //const words = useSelector((state) => state.word.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordsActions.loadWords());
  }, [dispatch]);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState([]);

  const handleSearch = (text) => {
    console.log(text);
    setQuery(text);
  };

  useEffect(() => {
    makeRequest();
  });

  const makeRequest = () => {
    setIsLoading(true);

    getWords()
      .then((words) => {
        setIsLoading(false);
        setData(words);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <View style={styles.viewStyle}>
      <SearchBar
        round
        searchIcon={{ size: 25 }}
        onChangeText={(text) => handleSearch(text)}
        placeholder="Type Here to Search..."
      />
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
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#bffff4",
    marginTop: Platform.OS == "ios" ? 29 : 0,
  },
  textStyle: { padding: 11 },
});

export default MywordsScreen;
 */