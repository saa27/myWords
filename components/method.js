/* import React, { useEffect, useState } from "react";
import _ from "lodash";
import * as wordsActions from "../store/wordsAction";
import { useSelector, useDispatch } from "react-redux";



export const contains = (word, query) => {
  if (word.includes(query)) {
    return true;
  }
  return false;
};

getWords = (limit = 20, query = "") => {
  const words = useSelector((state) => state.word.words);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wordsActions.loadWords());
  }, [dispatch]);
  return new Promise((resolve, reject) => {
    if (query.length === 0) {
      resolve(_.take(words, limit));
    } else {
      const formattedQuery = query.toLowerCase();
      const results = _.filter(words, (word) => {
        return contains(word, formattedQuery);
      });
      resolve(_.take(results, limit));
    }
  });
};

export const getWords;
 */