import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import AddWordScreen from "../screens/AddWordScreen";
import WordDetailScreen from "../screens/WordDetailScreen";
import EditWordScreen from "../screens/EditWordScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import MywordsScreen from "../screens/MywordsScreen";
import Colors from "../constants/Colors";

const WordsNavigator = createStackNavigator(
  {
    MyWords: MywordsScreen,
    AddWord: AddWordScreen,
    WordDetail: WordDetailScreen,
    EditWord: EditWordScreen,
    Favorites: FavoritesScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTitleStyle: {
        fontFamily: "open-sans-bold",
      },
      headerBackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

export default createAppContainer(WordsNavigator);
