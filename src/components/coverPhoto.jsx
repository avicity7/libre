import { View , Image, StyleSheet,SafeAreaView} from "react-native";

import globalStyles from "../styles/global";
import React, {useState} from 'react'

const styles = StyleSheet.create({


    imageSize:{
        width:375,
        height:120,
        zIndex:0

        
    }



})

const CoverPhoto = () => {
    return(
 
            <View>
            <Image source={{
          uri: 'https://image.itmedia.co.jp/business/articles/2201/22/dk_3hiroyuki0.jpg'
        }} style = {styles.imageSize}
        />

            </View>
    
    )




}
export default CoverPhoto