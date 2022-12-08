import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react'



const LikeButton = () => {
    
    
    const [notLiked,setColor] = useState(notLiked);
    const changeState = () => setColor(!notLiked)
    return(

     <TouchableOpacity onPress={changeState}>
     <MaterialCommunityIcons
     name={"cards-heart-outline"}
     size={30}
     color={ notLiked ? 'red' : 'black'
    }

     style={ globalStyles.likeButton }/>
    
     </TouchableOpacity>
   

    )



}
export default LikeButton