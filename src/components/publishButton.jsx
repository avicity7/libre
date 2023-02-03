import { View , Text , StyleSheet, Pressable} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react'
import { Shadow } from "react-native-shadow-2";

const PublishButton = ({text,onPress}) =>{
    return(
        <Pressable style = {globalStyles.publishButton} onPress={onPress}>
            <Text style = {globalStyles.publishButtonText}>  {text} </Text>
        </Pressable>
    )

}

export default PublishButton