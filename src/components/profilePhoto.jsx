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
                source = {{uri:'https://cdn.mainichi.jp/vol1/2022/08/31/20220831p2a00m0na009000p/9.jpg?1'}}
                style = {styles.circle}
            >

            </Image>

        </View>

    )

}
export default ProfilePhoto