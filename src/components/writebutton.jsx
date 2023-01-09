import { Pressable, View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react';
import DropShadow from "react-native-drop-shadow";

const WriteButton = ({onPress}) => {
    return(
        <View style = {globalStyles.writeButtonPos}>
            <DropShadow style = {globalStyles.shadowProp}>
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
            </DropShadow>
        
        </View>
    )




}
export default WriteButton