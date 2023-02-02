import { View , Text , StyleSheet} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react'
import { Shadow } from "react-native-shadow-2";

const PublishButton = () =>{
    return(
     
            <View style = {globalStyles.publishButton}>
                <Text style = {globalStyles.publishButtonText}> Publish Article </Text>
            </View>
       


    )

}

export default PublishButton