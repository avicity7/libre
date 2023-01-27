import { View } from "react-native";

import globalStyles from "../styles/global";
import React, {useState} from 'react'
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BackButton = ({onPress}) => {

    return(
        <View style = {{marginLeft:10,marginTop:20,maxWidth:36,}} >
            <MaterialCommunityIcons.Button
                name = "arrow-left"
                color={"#202020"}
                size={20}
                backgroundColor={"white"}
                iconStyle={{marginRight: 0,marginLeft:0}}
                borderRadius = {100}
                padding = {8}
                onPress = {onPress}
            >
            </MaterialCommunityIcons.Button>
        
        </View>




    )



}
export default BackButton;