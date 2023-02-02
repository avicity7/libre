import { Pressable, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react';
import { Shadow } from "react-native-shadow-2";
const WriteButton = ({onPress}) => {
    return(
       
            <View style = {globalStyles.writeButtonPos}>
                <Shadow distance={5} startColor="rgba(159, 159, 159, 0.1)"  style = {{borderRadius: 100}} >
                    <MaterialCommunityIcons.Button
                        name = "pencil-box-multiple"
                        color={"#202020"}
                        size={30}
                        backgroundColor={"white"}
                        iconStyle={{marginRight: 0,marginLeft:0}}
                        borderRadius = {100}
                        padding = {16}
                        onPress = {onPress}
                    >
                </MaterialCommunityIcons.Button>
                </Shadow>
            </View>
     
    )




}
export default WriteButton