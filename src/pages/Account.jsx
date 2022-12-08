import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global'
import Button from '../components/button'
import LikeButton  from '../components/heartbutton';

const Account = () => {
    return ( 
        <View style={globalStyles.container}>
            <Text>Account</Text> 
            <Button />
            <LikeButton 
            />
        </View>
    )
}

export default Account 