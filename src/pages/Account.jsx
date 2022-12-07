import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global'
import Button from '../components/button'
const Account = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text>Account</Text> 
            <Button />
        </View>
    )
}

export default Account 