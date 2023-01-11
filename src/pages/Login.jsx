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


const Login = () =>{
    return(
      

        <SafeAreaView
        style = {globalStyles.container}>
            <Text style = {styles.Libre}>Libre</Text>
            <Text style = {styles.textStyle}>Username</Text>
            <TextInput
            
            style = {styles.textContainer}
            placeholder='Login Name'
            textContentType='username'
            
            />
            <Text style = {styles.textStyle}>Password</Text>
            <TextInput
            style = {styles.textContainer}
            placeholder = 'Password'
            textContentType='password'
            />

            <DropShadow style = {styles.shadowProp}>

             <Pressable 
              style = {styles.loginButton}>
                 <Text style = {{fontSize: 20, color: "white"}}> Sign In </Text>
            </Pressable>
            
            </DropShadow>


        </SafeAreaView>
        

    )

}



const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        justifyContent:'center',
        position: 'absolute',
        top : 0,
        bottom: 0,
        
        
        
        
    },
    textContainer:{
        backgroundColor: '#F9F9F9',
        borderRadius: 10,
        width: Dimensions.get('window').width - 140,
        padding: 6,
        fontSize: 20,
        alignSelf: 'center',
        alignItems:"center",
        
    },
    textStyle:{
        fontSize: 30,
        paddingTop: 5,
        paddingBottom: 5,
        left:66,
        
    },
    loginButton:{
        margin: 10,
        backgroundColor: '#669cf2',
        borderRadius:16,
        width: 100,
        padding: 5,
        alignSelf:'center',
        alignItems:"center",
    
    },
    Libre:{
        fontFamily:'NotoSerifBold',
        fontSize: 80,
        alignSelf: 'center',
        marginTop: 80
    },
    shadowProp: {
        shadowColor: '#669cf2',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },


})

export default Login