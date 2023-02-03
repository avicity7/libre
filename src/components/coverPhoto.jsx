import { View , Image, StyleSheet,SafeAreaView,Dimensions} from "react-native";
import {collection, getDocs, getDoc, doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import globalStyles from "../styles/global";
import React, {useState,useEffect} from 'react'
const db = require('../../api/firebaseConfig.js');

const styles = StyleSheet.create({
    imageSize:{
        width:Dimensions.get('window').width+15,
        height:150,
        zIndex:0,
        marginLeft: -15
    }
})

const CoverPhoto = ({}) => {
    
    
    return(
        
        <View>
            <Image source={{
                uri: `}`
            }} style = {styles.imageSize}
            />

        </View>
    )

}
export default CoverPhoto