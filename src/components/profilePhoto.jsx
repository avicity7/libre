import { View , Image, StyleSheet,SafeAreaView} from "react-native";

import globalStyles from "../styles/global";
import React, {useState} from 'react'

const styles = StyleSheet.create({
    circle:{
        borderRadius:100,
        width:100,
        height:100,
        zIndex: 1,
        marginTop: -50,
        marginLeft: 15,
    }



})

const ProfilePhoto = () => {
    return(
        <View>
            <Image
                source = {{uri:'https://resources.stuff.co.nz/content/dam/images/1/e/l/h/x/4/image.related.StuffLandscapeThreeByTwo.1464x976.1elhn3.png/1475619330888.png'}}
                style = {styles.circle}
            >

            </Image>

        </View>

    )

}
export default ProfilePhoto