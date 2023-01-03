import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";

const Home = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Articles
            </Text>
            
        </View>
    )
}

export default Home 