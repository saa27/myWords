export const ADD_WORD = "ADD_WORD";

export const AddPlace = (word, description) => {
  return {
    type: ADD_WORD,
    wordData: {
      word: word,
      description: description,
    },
  };
};
