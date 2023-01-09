import { View , Image, StyleSheet,SafeAreaView , Dimensions} from "react-native";

import globalStyles from "../styles/global";
import React, {useState} from 'react'

const styles = StyleSheet.create({


    imageSize:{
        width:Dimensions.get('window').width - 15,
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