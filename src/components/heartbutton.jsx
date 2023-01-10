import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";
import React, {useState} from 'react'
import DropShadow from "react-native-drop-shadow";



const LikeButton = ({id,likedArticles,setLikedArticles}) => {
    
    const [notLiked,setColor] = useState(likedArticles.includes(id));
    const changeState = () => {
        setColor(!notLiked)
        if (!notLiked){setLikedArticles(likedArticles.push(id))}
        else { 
            setLikedArticles(likedArticles.splice(likedArticles.indexOf(id), 1));
        }
        console.log(likedArticles)
    };
    return(

        <View style = {{marginRight:20,marginTop:20,maxWidth:35,alignSelf:"flex-end"}}>
            <DropShadow style = {globalStyles.shadowProp}>
                <MaterialCommunityIcons.Button
                    onPress={changeState}
                    name="cards-heart-outline"
                    size = {20}
                    backgroundColor = "white"
                    iconStyle={{marginRight: 0,marginLeft:0}}
                    borderRadius = {100}
                    color={ notLiked ? 'red' : 'black'}
                    >
                </MaterialCommunityIcons.Button>
            </DropShadow>
        </View>

    

   

    )



}
export default LikeButton