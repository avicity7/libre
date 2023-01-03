import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import WriteButton from '../components/writebutton';
const Home = () => {
    return ( 
        <View style={globalStyles.container}>
        
            <WriteButton/>

            <Text
                style={globalStyles.header}
            >
                Articles
            </Text>
            
        </View>
    )
}

export default Home 