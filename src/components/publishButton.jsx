import { View , Text , StyleSheet} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react'
import { Shadow } from "react-native-shadow-2";

const PublishButton = ({text}) =>{
    return(
     
            <View style = {globalStyles.publishButton}>
                <Text style = {globalStyles.publishButtonText}>  {text} </Text>
            </View>
       


    )

}

export default PublishButton