import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import { SearchBar } from "react-native-elements";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "", isLoading: true };
    this.arrayholder = [];
  }
  componentDidMount() {
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function () {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }
  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({ dataSource: newData, search: text });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{ height: 0.4, width: "89%", backgroundColor: "#141313" }} />
    );
  };
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 21 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.viewStyle}>
        <SearchBar
          round
          searchIcon={{ size: 25 }}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction("")}
          placeholder="Type Here to Search..."
          value={this.state.search}
        />
        <FlatList
          data={this.state.dataSource}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          renderItem={({ item }) => (
            <Text style={styles.textStyle}>{item.title}</Text>
          )}
          enableEmptySections={true}
          style={{ marginTop: 11 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#bffff4",
    marginTop: Platform.OS == "ios" ? 29 : 0,
  },
  textStyle: { padding: 11 },
});

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

  const x = useCallback(
    (query) => {
      dispatch(wordsActions.searchWords(query));
      setSearch(query);
    },
    [dispatch]
  );

  return (
    <LinearGradient colors={["#f58ecc", "#43bcf0"]} style={styles.gradient}>
      <View style={styles.viewStyle}>
        <SearchBar
          round
          searchIcon={{ size: 25 }}
          onChangeText={(query) => {
            x(query);
          }}
          onClear={() => {}}
          placeholder="Type Here to Search..."
          value={search}
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
