import { ADD_WORD, LOAD_WORDS, EDIT_WORD } from "./wordsAction";
import Words from "../models/Words";

const initialState = {
  words: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EDIT_WORD:
      const editProductIndex = state.words.findIndex(
        (word) => word.id === action.wid
      );
      const editedWord = new Words(
        action.wid,
        action.wordData.word,
        action.wordData.description
      );
      const updatedWord = [...state.words];
      updatedWord[editProductIndex] = editedWord;
      return {
        ...state,
        words: updatedWord,
      };
    case LOAD_WORDS:
      return {
        words: action.words.map(
          (wd) => new Words(wd.id.toString(), wd.word, wd.description)
        ),
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
