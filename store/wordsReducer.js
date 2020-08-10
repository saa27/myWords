import { ADD_WORD, LOAD_WORDS } from "./wordsAction";
import Words from "../models/Words";

const initialState = {
  words: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WORDS:
      return {
        words: action.words.map(wd =>new Words(wd.id.toString(), wd.word, wd.description))
      };
    case ADD_WORD:
      const newWord = new Words(
        action.wordData.id.toString(),
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
