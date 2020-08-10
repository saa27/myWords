import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("words.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS words (id INTEGER PRIMARY KEY NOT NULL, word TEXT NOT NULL, description TEXT NOT NULL);",
        [],
        () => {
          resolve;
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertWord = (word, description) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO words (word, description) VALUES (?,?);",
        [word, description],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchWords = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM words;",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
}
