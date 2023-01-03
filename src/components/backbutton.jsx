import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react'

const BackButton = () => {

    return(
        <View style = {globalStyles.backButton} >
        <MaterialCommunityIcons.Button
        name = "arrow-left"
        size = {25}
        backgroundColor = "#f5f5f5"
        color = {"black"}
        iconStyle={{marginRight: 0}}
        borderRadius = {100}
        >

        </MaterialCommunityIcons.Button>
        
        
        
        
        </View>




    )



}
export default BackButton;