import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import WriteButton from '../components/writebutton';
const Home = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text>Home</Text> 
            <WriteButton/>
        </View>
    )
}

export default Home 