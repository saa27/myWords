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

import { useDispatch, useSelector } from "react-redux";

const EditWordScreen = (props) => {
  const wordId = props.navigation.getParam("wordId");
  const dispatch = useDispatch();

  const editedWord = useSelector((state) =>
    state.word.words.find((word) => word.id === wordId)
  );

  const [word, setWord] = useState(editedWord.word);
  const [description, setDescription] = useState(editedWord.description);

  const saveChangeHandler = () => {
    dispatch(wordsActions.editWord(wordId, word, description));
    props.navigation.navigate("WordDetail");
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Word</Text>
        <TextInput
          style={styles.textInput}
          value={word}
          onChangeText={(text) => {
            setWord(text);
          }}
        />
        <Text style={styles.label}>Desciption</Text>
        <TextInput
          style={styles.textInput}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          multiline
        />
        <Button
          title="SAVE CHANGES"
          color={Colors.primary}
          onPress={saveChangeHandler}
        />
      </View>
    </ScrollView>
  );
};

EditWordScreen.navigationOptions = {
  headerTitle: "Edit Word",
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
