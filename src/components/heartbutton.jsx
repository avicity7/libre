import { Pressable, StyleSheet, TouchableOpacity } from "react-native";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import globalStyles from "../styles/global";

const LikeButton = () => {

    return(
     
        <TouchableOpacity>
        <MaterialCommunityIcons  
        name={"cards-heart-outline"}
        size={30}
        color={'black'}
        style={ globalStyles.likeButton }/>
        </TouchableOpacity>

    )



}
export default LikeButton