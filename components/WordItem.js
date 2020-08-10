import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';

const WordItem = props => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.word}</Text>
        <Text style={styles.address} numberOfLines={1}>{props.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  infoContainer: {
    marginHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  title: {
    color: 'black',
    fontSize: 20,
    marginBottom: 5
  },
  address: {
    color: '#666',
    fontSize: 16
  }
});

export default WordItem;
