import { Pressable, StyleSheet, Text, View,TextInput, ScrollView, StatusBar, FlatList } from 'react-native';
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
const databaseData = require('../../api/database.json');
import ArticleCard from '../components/articleCard';
import ArticleCard1 from '../components/articlecard1';
import ArticleCard2 from '../components/articlecard2';

import { Article } from './Home';

const AccountView = ({navigation}) => {
    return ( 
        <SafeAreaView style={globalStyles.accountContainer}>
            <View>
                <CoverPhoto />
                <ProfilePhoto />
            </View>
            <Text style = {[globalStyles.profileName,{fontFamily: 'NotoSerifRegular'}]}>Hiroyuki Nishimura</Text>
            <Text style = {globalStyles.bioText}>A journalist enthusiastic about different perspectives. Looking to venture into Arts.</Text>
                <ArticleCard/>
                <ArticleCard1/>
                <ArticleCard2/>
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

const Account = (props) => { 
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
                <Stack.Screen
                name="Article"
                component={Article}
                options={{ headerShown: false }}
                initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles,onPress:"AccountView"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Account 