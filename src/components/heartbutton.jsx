import { View } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, {useState} from 'react'



const LikeButton = ({id,likedArticles,addLikedArticle,removeLikedArticle}) => {
    
    const [notLiked,setColor] = useState(likedArticles.includes(id));
    const changeState = () => {
        setColor(!notLiked)
        
        if (!notLiked){addLikedArticle(id)}
        else { 
            removeLikedArticle(id)
        }
    };
    return(

        <View style = {{marginRight:20,marginTop:20,maxWidth:35,alignSelf:"flex-end"}}>
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
        </View>

    

   

    )



}
export default LikeButton