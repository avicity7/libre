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
import {collection, getDocs, getDoc, doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";


const getArticles = async() => {
    var articlesArray = []
    const articles = await getDocs(collection(db,"articles"));
    articles.forEach(doc => {
      articlesArray.push(doc.data());
    });
    return articlesArray
}

import EditProfile from '../components/editProfile';
import AccountViewUser from './Home'

const AccountView = ({route,navigation}) => {
    const auth = getAuth();

    const {likedArticles, addLikedArticle} = route.params;
    const [localPublishedArticles, setLocalPublishedArticles] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [articles,setArticles] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(()=>{
        console.log("refreshing")
        let documentID = auth.currentUser.email;

        const getArticlesFunction = async () => {
            let fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        }

        
        const fetchAccount = onSnapshot(doc(db,"users",documentID),(docSnap) => {
            let firstName = docSnap.data().firstName;
            let lastName = docSnap.data().lastName;
            let username = docSnap.data().username;
            let bio = docSnap.data().bio;
            
            setFirstName(firstName);
            setLastName(lastName);
            setUsername(username);
            setBio(bio);
            getArticlesFunction();
        })

        
        return () => fetchAccount();

    },[refresh])

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
                renderItem={({ item }) => item.authorEmail == auth.currentUser.email?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
                keyExtractor={item => item.id}
                />
            <WriteButton onPress = {() => {navigation.navigate("Publish",{articles:articles,firstName:firstName,lastName:lastName,username:username,email:auth.currentUser.email, refresh: refresh, setRefresh:setRefresh})}}/>
        </SafeAreaView>
    )
}

const EditAccount = ({route,navigation}) => {
    const auth = getAuth();
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [profileImg, setProfileImg] = useState('');
    const [bannerImg, setBannerImg] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Username:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setUsername(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>First Name:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setFirstName(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Last Name:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setLastName(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Profile Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true}onChangeText={newText => setProfileImg(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Banner Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setBannerImg(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Bio:</Text>
            <TextInput style  = {globalStyles.inputBoxBodyStyle} multiline = {true} onChangeText={newText => setBio(newText)}></TextInput>
            <PublishButton text = "Update Profile" onPress={()=>{
                const docRef = doc(db,"users",auth.currentUser.email)
                const data = {
                    firstName: firstName,
                    lastName:lastName,
                    username: username,
                    bio: bio,
                    profileImg: profileImg,
                    bannerImg: bannerImg,
                }
                updateDoc(docRef,data)
                .then(()=>{
                    console.log("updated profile");
                    alert("Profile has been updated!");
                    navigation.navigate("AccountView")
                })

            }}/>
        </ScrollView>
    
    )

}

const Publish = ({route,navigation}) => {
    const {articles, firstName, lastName, username, email, refresh, setRefresh} = route.params
    const [articleName, setArticleName] = useState('');
    const [articleImage, setArticleImage] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [category, setCategory] = useState('');
    const [body, setBody] = useState('')
    return(

        <ScrollView style = {globalStyles.container}>
            <Text style = {globalStyles.publishSubHeader}>Article Name</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setArticleName(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Enter Article Image Url:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setArticleImage(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Synopsis:</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setDescriptionText(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Category</Text>
            <TextInput style  = {globalStyles.inputBoxArticleStyle} multiline = {true} onChangeText={newText => setCategory(newText)}></TextInput>
            <Text style = {globalStyles.publishSubHeader}>Article Body</Text>
            <TextInput style  = {globalStyles.inputBoxBodyStyle} multiline = {true} onChangeText={newText => setBody(newText)}></TextInput>
            <PublishButton text = "Publish Article" onPress={()=>{
                
                let id = articles.length+1
                
                const docRef = doc(db, "articles", String(id));

                const data = {
                    author: firstName + " " + lastName,
                    authorUsername: username,
                    authorEmail: email,
                    body: body, 
                    category: category,
                    descriptionText: descriptionText,
                    id: id, 
                    image: articleImage,
                    title: articleName
                };
                

                setDoc(docRef, data)
                .then(() => {
                    console.log("Document has been added successfully");
                    alert("Article Published!");
                    setRefresh(!refresh);
                    navigation.navigate("AccountView");
                })
                .catch(error => {
                    console.log(error);
                })
            }}/>
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