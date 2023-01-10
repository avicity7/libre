import { View , Text , StyleSheet, Pressable} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react';
import DropShadow from "react-native-drop-shadow";

const Button = ({onPress}) =>{
    return(
        <DropShadow style = {globalStyles.shadowProp}>
            <Pressable
                onPress={onPress}
            >
                <View style = {globalStyles.imagePickerButton}>
                    <Text style = {globalStyles.imagePickerButtonText}> Pick an image from camera roll </Text>
                </View>
            </Pressable>
        </DropShadow>

    )

}

export default Button