import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global';
import { SafeAreaView } from "react-native-safe-area-context";

const Library = () => {
    const [displayCategory, setDisplayCategory] = useState("subscriptions")
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Library
            </Text>

            <View style={globalStyles.tabHeader}>
                <Pressable onPress = {() => {setDisplayCategory("subscriptions")}}>
                    <Text style={[globalStyles.tabHeaderText,displayCategory == "subscriptions"?{color:"black"}:{color:'#999999'}]}>
                        Subscriptions
                    </Text>
                </Pressable>
                <Pressable onPress = {() => {setDisplayCategory("library")}}>
                    <Text style={[globalStyles.tabHeaderText,displayCategory == "library"?{color:"black"}:{color:'#999999'}]}>
                        Library
                    </Text>
                </Pressable>
            </View>

            <ScrollView>
                <Text>
                    {displayCategory}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Library 