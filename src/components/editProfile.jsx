import { View , Text , StyleSheet, Pressable, TextInputComponent} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react';
import { Shadow } from "react-native-shadow-2";


const EditProfile = ({onPress}) =>{

   
    return(
        <View style = {globalStyles.SubscribeButtonPos}>
        <Shadow distance={4} startColor = "rgba(183, 183, 183, 0.1)">
        <Pressable
            onPress = {onPress}
            style = {{borderRadius: 30}}
        >
            <View style = {[globalStyles.SubscribeButton]} color>
                <Text style ={globalStyles.SubscribeText}>
                    Edit Profile
                </Text>
                    
            </View>
        </Pressable>
        </Shadow>
        </View>

    )

}

export default EditProfile