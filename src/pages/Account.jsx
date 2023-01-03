import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global'
const Account = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Account
            </Text>
        </View>
    )
}

export default Account 