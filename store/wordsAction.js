export const ADD_WORD = "ADD_WORD";
export const LOAD_WORDS = "LOAD_WORDS";
export const EDIT_WORD = "EDIT_WORD";

import { insertWord, fetchWords, updateWord } from "../helpers/db";

export const addWord = (word, description) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertWord(word, description);
      console.log(dbResult);
      dispatch({
        type: ADD_WORD,
        wordData: {
          id: dbResult.insertId,
          word: word,
          description: description,
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadWords = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchWords();
      console.log(dbResult);
      dispatch({ type: LOAD_WORDS, words: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};
