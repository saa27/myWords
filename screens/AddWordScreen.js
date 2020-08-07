import React from "react";
import {View, Text, Button, StyleSheet} from "react-native";

const AddWordScreen = props =>{
    return(
        <View>
            <Text>
                "AddWordScreen"
            </Text>
        </View>
    )
}

AddWordScreen.navigationOptions = {
    headerTitle: 'Add a new word'
}

const style = StyleSheet.create();

export default AddWordScreen;