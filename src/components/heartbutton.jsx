import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react'



const LikeButton = () => {
    
    const [notLiked,setColor] = useState(notLiked);
    const changeState = () => setColor(!notLiked)
    return(

        <View style= {globalStyles.likeButton}>
        <MaterialCommunityIcons.Button
        onPress={changeState}
        name="cards-heart-outline"
        size = {25}
        backgroundColor = "#f5f5f5"
        iconStyle={{marginRight: 0}}
        borderRadius = {100}
        color={ notLiked ? 'red' : 'black'}
         >
        </MaterialCommunityIcons.Button>
        </View>

    

   

    )



}
export default LikeButton