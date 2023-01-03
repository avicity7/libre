import { View , Text , StyleSheet} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react'

const PublishButton = () =>{
    return(
        <View style = {globalStyles.publishButton}>
            <Text style = {globalStyles.publishButtonText}> Publish Article </Text>
        </View>


    )

}

export default PublishButton