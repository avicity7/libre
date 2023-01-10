import { Pressable, StyleSheet, Text, View,TextInput, ScrollView, StatusBar } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global'
import WriteButton from '../components/writebutton';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PublishButton from '../components/publishButton';
import ImagePickerExample from '../components/imagePicker';
import { SafeAreaView } from "react-native-safe-area-context";
import CoverPhoto from '../components/coverPhoto';
import ProfilePhoto from '../components/profilePhoto';

const AccountView = ({navigation}) => {
    return ( 
        <SafeAreaView style={globalStyles.accountContainer}> 
            <ScrollView>
                <View>
                <CoverPhoto />
                <ProfilePhoto />
                </View>
                <Text style = {[globalStyles.profileName,{fontFamily: 'NotoSerifRegular'}]}>Hiroyuki Nishimura</Text>
            </ScrollView>
            <WriteButton onPress = {() => {navigation.navigate("Publish")}}/>
        </SafeAreaView>
    )
}

const Publish = ({route}) => {
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Article Name</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Header Picture</Text>
            <ImagePickerExample></ImagePickerExample>
            <Text style = {globalStyles.publishSubHeader}>Article Body</Text>
            <TextInput style  = {globalStyles.inputBoxBodyStyle} multiline = {true}></TextInput>
            <PublishButton />
        </ScrollView>
    
    )

}

const Stack = createNativeStackNavigator();

const Account = () => { 
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="AccountView">
            <Stack.Screen
                name="AccountView"
                component={AccountView}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Publish"
                component={Publish}
                options={{
                headerBackTitle: "",
                headerTintColor: "black",
                headerTitleStyle: {
                    color: "black",
                }
                }}
            />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Account 