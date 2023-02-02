import { Pressable, StyleSheet, Text, View,TextInput, ScrollView, StatusBar, FlatList,Dimensions} from 'react-native';
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
import { Article } from './Home';
import SubscribeButton from '../components/subscribe';
import { Shadow } from 'react-native-shadow-2';
const AccountView = ({route,navigation}) => {
    const {likedArticles, addLikedArticle,removeLikedArticle} = route.params;
    return ( 
        <SafeAreaView style={globalStyles.accountContainer}>
                <FlatList
                ListHeaderComponent={<>
                    <View>
                    <CoverPhoto />
                    <ProfilePhoto />
                    </View>
                    <Text style = {[globalStyles.profileName,{fontFamily: 'NotoSerifRegular'}]}>Hiroyuki Nishimura</Text>
                    <Text style = {globalStyles.bioText}>A journalist enthusiastic about different perspectives. Looking to venture into Arts.</Text>
                </>}
                removeClippedSubviews={false} 
                data={databaseData.articles}
                renderItem={({ item }) => <ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />}
                keyExtractor={item => item.id}
                />
            <WriteButton onPress = {() => {navigation.navigate("Publish")}}/>
        </SafeAreaView>
    )
}
const AccountViewUser = ({route,navigation}) => {
    const {likedArticles, addLikedArticle,removeLikedArticle} = route.params;
    return ( 
        <SafeAreaView style={globalStyles.accountContainer}>
                <FlatList
                ListHeaderComponent={<>
                    <View>
                    <CoverPhoto />
                    <ProfilePhoto />
                    </View>
                    <Text style = {[globalStyles.profileName,{fontFamily: 'NotoSerifRegular'}]}>Hiroyuki Nishimura</Text>
                    <Text style = {globalStyles.bioText}>A journalist enthusiastic about different perspectives. Looking to venture into Arts.</Text>
                    <SubscribeButton style = {globalStyles.SubscribeButtonPos}/>
                </>}
                removeClippedSubviews={false} 
                data={databaseData.articles}
                renderItem={({ item }) => <ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />}
                keyExtractor={item => item.id}
                />
        </SafeAreaView>
    )
}

const Publish = ({route}) => {
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Article Name</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Header Picture</Text>
            <View style = {{marginLeft: 30, marginRight: 30}}>
            <Shadow style={{alignItems: 'center',justifyContent:"center",borderRadius: 15,}} distance={3}>
            <ImagePickerExample/>
            </Shadow>
            </View>
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
                    initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,onPress:"AccountView"}}
                />
                <Stack.Screen
                    name="AccountViewUser"
                    component={AccountViewUser}
                    options={{ headerShown: false }}
                    initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,onPress:"AccountView"}}
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
                    initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,onPress:"AccountView"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Account 