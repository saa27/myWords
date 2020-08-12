import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import * as wordsActions from "../store/wordsAction";

import Card from "../components/Card";
import CustomHeaderButton from "../components/CustomHeaderButton";

const WordDetailScreen = (props) => {
  const wordId = props.navigation.getParam("wordId");
  const dispatch = useDispatch();

  const selectedWord = useSelector((state) =>
    state.word.words.find((word) => word.id === wordId)
  );

  useEffect(() => {
    props.navigation.setParams({ wId: wordId });
  }, [wordId]);

  return (
    <View style={styles.screen}>
      <Text style={styles.word}>{selectedWord.word}</Text>
      <Card style={styles.card}>
        <ScrollView>
          <Text style={styles.description}>{selectedWord.description}</Text>
        </ScrollView>
      </Card>
    </View>
  );
};

WordDetailScreen.navigationOptions = (navData) => {
  const deleteWord = navData.navigation.getParam("delete");
  const wId = navData.navigation.getParam("wId");
  return {
    headerTitle: "Detail",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Edit Word"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate("EditWord", { wordId: wId });
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    //alignItems: "center",
    padding: 40,
  },
  word: {
    fontSize: 35,
    paddingBottom: 20,
    fontStyle: "italic",
    textDecorationLine: "underline",
  },
  card: {
    height: 250,
  },
  description: {
    padding: 20,
    fontSize: 20,
  },
});

export default WordDetailScreen;
