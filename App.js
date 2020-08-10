import { StatusBar } from "expo-status-bar";
import { AppLoading } from "expo";
import React, { useState } from "react";
import * as Font from "expo-font";
import { applyMiddleware, createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import WordsNavigator from "./navigation/WordsNavigator";
import wordsReducer from "./store/wordsReducer";
import { init } from "./helpers/db";

init()
  .then(() => {
    console.log("Initialized database");
  })
  .catch((err) => {
    console.log("Initializing db failed");
    console.log(err);
  });

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  word: wordsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (
    <Provider store={store}>
      <WordsNavigator />
    </Provider>
  );
}
