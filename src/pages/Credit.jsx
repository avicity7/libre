import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, FlatList ,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import { NavigationContainer, NavigationHelpersContext } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import DropShadow from 'react-native-drop-shadow';
import Svg, { Circle, Rect, Path } from 'react-native-svg';
const databaseData = require('../../api/database.json')
import ArticleCard from "../components/articleCard"
import AuthorCard from '../components/authorCard';

const Credit = () => {
    return(
        <SafeAreaView style = {globalStyles.container}>
            <ScrollView>

            <Text style = {styles.creditNumber}>1234</Text>
            <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style = {styles.coin}>
                <Circle cx="20" cy="20" r="20" fill="#202020"/>
                <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
            </Svg>
            

            <DropShadow style = {styles.shadowProp}>
                 <Pressable style = {styles.button}>
                    <Text style = {{fontFamily:"NotoSerifRegular", fontSize: 13}}>Purchase Credits</Text>
                 </Pressable>
            </DropShadow>

            <Text style = {styles.subscriptionSubHeader}>My Subscriptions</Text>
           
            <AuthorCard/>


            </ScrollView>

        </SafeAreaView>






    )



}

const styles = StyleSheet.create({
    creditNumber: {
        alignSelf:'center',
        fontSize: 62,
        fontFamily: "NotoSerifRegular",
        marginTop: 40


    },
    coin:{
        alignSelf:"center",
        margin: 10
    },
    button:{
        alignSelf:'center',
        borderRadius: 15,
        padding: 5,
        backgroundColor:'white',
        margin: 10,
    
    },
    shadowProp:{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    subscriptionSubHeader:{
        alignSelf:"center",
        fontFamily:"NotoSerifRegular",
        fontSize: 20,
        margin: 15,
        color:"#909090",
        

    }




})
export default Credit;