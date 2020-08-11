import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  TextInput,
} from "react-native";
import Colors from "../constants/Colors";
import * as wordsActions from "../store/wordsAction";

import { useDispatch } from "react-redux";

const EditWordScreen = (props) => {
  const [word, setWord] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const WordChangeHandler = (text) => {
    setWord(text);
  };

  const DescriptionChangeHandler = (text) => {
    setDescription(text);
  };

  const saveWordHandler = () => {
    dispatch(wordsActions.addWord(word, description));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Word</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={WordChangeHandler}
          value={word}
        />
        <Text style={styles.label}>Desciption</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={DescriptionChangeHandler}
          value={description}
        />
        <Button
          title="ADD WORD"
          color={Colors.primary}
          onPress={saveWordHandler}
        />
      </View>
    </ScrollView>
  );
};

EditWordScreen.navigationOptions = {
  headerTitle: "Add New Words",
};

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  form: {
    margin: 30,
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default EditWordScreen;
