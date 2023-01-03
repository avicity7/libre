import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react'

const WriteButton = ({onPress}) => {
    return(
        <View style = {globalStyles.writeButtonPos}>
        <MaterialCommunityIcons.Button
            name = "pencil-box-multiple"
            color={"#202020"}
            size={30}
            backgroundColor={"#f5f5f5"}
            iconStyle={{marginRight: 0}}
            borderRadius = {100}
            padding = {20}
            onPress = {onPress}

        >
        </MaterialCommunityIcons.Button>
        
        
        </View>





    )




}
export default WriteButton