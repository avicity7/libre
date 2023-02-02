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
import ArticleCard from '../components/articleCard';
import { Article } from './Home';
import SubscribeButton from '../components/subscribe';
import { Shadow } from 'react-native-shadow-2';
const db = require('../../api/firebaseConfig.js');
import {collection, getDocs, getDoc, doc, onSnapshot} from "firebase/firestore";
import { getAuth } from "firebase/auth";


const getLikes = async() => {
    var likedArray = []
    const docRef = doc(db, "users", "hiroyuki");
    const docSnap = await getDoc(docRef);
    likedArray = docSnap.data().likes
    // const user = await getDocs(query(collection(db, "users"), where("username", "==", "hiroyuki")))
    // user.forEach(doc => {
    //   likedArray = doc.data().likes
    // });
    return likedArray
}

const getArticles = async() => {
    var articlesArray = []
    const articles = await getDocs(collection(db,"articles"));
    articles.forEach(doc => {
      articlesArray.push(doc.data());
    });
    return articlesArray
}

import EditProfile from '../components/editProfile';
const AccountView = ({route,navigation}) => {
    const auth = getAuth();

    const {likedArticles, addLikedArticle} = route.params;
    const [localPublishedArticles, setLocalPublishedArticles] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [articles,setArticles] = useState();

    useEffect(()=>{
        let documentID = auth.currentUser.email;

        const getArticlesFunction = async () => {
            let fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        }

        getArticlesFunction();
        
        const fetchAccount = onSnapshot(doc(db,"users",documentID),(docSnap) => {
            let likes = [];
            for (let i = 0; i < docSnap.data().likes.length; i++){
                likes.push(docSnap.data().published[i])
            }
            let firstName = docSnap.data().firstName;
            let lastName = docSnap.data().lastName;
            let bio = docSnap.data().bio;
            setLocalPublishedArticles(likes);
            setFirstName(firstName);
            setLastName(lastName);
            setBio(bio);
        })

        
        return () => fetchAccount();

    },[localPublishedArticles])

    return ( 
        <SafeAreaView style={globalStyles.accountContainer}>
                <FlatList
                ListHeaderComponent={<>
                    <View>
                    <CoverPhoto />
                    <ProfilePhoto />
                    </View>
                    <Text style = {[globalStyles.profileName,{fontFamily: 'NotoSerifRegular'}]}>{firstName} {lastName}</Text>
                    <Text style = {globalStyles.bioText}>{bio}</Text>
                    <EditProfile onPress={()=>navigation.navigate("Edit Account")}/>
                </>}
                extraData={articles}
                removeClippedSubviews={false} 
                data={articles}
                renderItem={({ item }) => localPublishedArticles.includes(item.id)?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
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

const EditAccount = ({route}) => {
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Username:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Profile Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Banner Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Bio:</Text>
            <TextInput style  = {globalStyles.inputBoxBodyStyle} multiline = {true}></TextInput>
            <PublishButton text = "Update Profile"/>
        </ScrollView>
    
    )

}

const Publish = ({route}) => {
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Article Name</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Article Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Synopsis:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Article Body</Text>
            <TextInput style  = {globalStyles.inputBoxBodyStyle} multiline = {true}></TextInput>
            <PublishButton text = "Publish Article"/>
        </ScrollView>
    
    )

}

const Stack = createNativeStackNavigator();

const Account = (props) => { 
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="AccountView">
                <Stack.Screen
                name = "Edit Account"
                component={EditAccount}
                options={{
                    headerBackTitle: "",
                    headerTintColor: "black",
                    headerTitleStyle: {
                        color: "black",
                    }
                    }}
                />
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