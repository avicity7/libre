import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global';
import { SafeAreaView } from "react-native-safe-area-context";

const Library = () => {
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Library
            </Text>
        </SafeAreaView>
    )
}

export default Library 