import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, {useState} from 'react'



const EditButton = ({onPress}) => {
    

    return(

        <View style = {{left: 60  ,marginTop:20,maxWidth:35,alignSelf:"flex-end"}}>
            <MaterialCommunityIcons.Button
                name="pencil"
                size = {20}
                backgroundColor = "white"
                iconStyle={{marginRight: 0,marginLeft:0,}}
                borderRadius = {100}
                color = {"black"}
                onPress = {onPress}
                >
            </MaterialCommunityIcons.Button>
        </View>

    

   

    )



}
export default EditButton