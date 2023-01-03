import { View , Text , StyleSheet} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react'

const PublishButton = () =>{
    return(
        <View style = {globalStyles.publishButton}>
            <Text style = {{
                color:"white",
                alignContent: "center",
                justifyContent: "center",
                alignSelf: 'center'
        }}> Publish Article </Text>
        </View>


    )

}

export default PublishButton