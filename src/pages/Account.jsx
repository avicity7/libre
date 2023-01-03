import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global'
import Button from '../components/button'
import LikeButton  from '../components/heartbutton';
import BackButton from '../components/backbutton';
import WriteButton from '../components/writebutton';
const Account = () => {
    return ( 
        <View style={globalStyles.container}> 
            <LikeButton/>
            <BackButton/>
            <WriteButton/>
            <Text
                style={globalStyles.header}
            >
                Account
            </Text>
        </View>
    )
}

export default Account 