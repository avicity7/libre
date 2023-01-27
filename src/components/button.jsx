import { View , Text , StyleSheet, Pressable} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react';

const Button = ({onPress}) =>{
    return(
        <Pressable
            onPress={onPress}
        >
            <View style = {globalStyles.imagePickerButton}>
                <Text style = {globalStyles.imagePickerButtonText}> Pick an image from camera roll </Text>
            </View>
        </Pressable>

    )

}

export default Button