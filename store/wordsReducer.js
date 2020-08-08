import { ADD_WORD } from "./wordsAction";
import Words from "../models/Words";

const initialState = {
  words: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_WORD:
      const newWord = new Words(
        new Date().toString(),
        action.wordData.word,
        action.wordData.description
      );
      return {
        words: state.words.concat(newWord),
      };
    default:
      return state;
  }
};
