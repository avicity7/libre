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
import ArticleCard from '../components/articleCard';
import { Article } from './Home';
const db = require('../../api/firebaseConfig.js');
import {collection, getDocs, getDoc, doc} from "firebase/firestore";


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

const AccountView = ({route,navigation}) => {
    const {likedArticles, addLikedArticle,removeLikedArticle} = route.params;

    const [articles,setArticles] = useState();

    useEffect(()=>{
        const getArticlesFunction = async () => {
            let fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        }

        getArticlesFunction();
        
        const fetchLikedArticles = async () => { 
            let fetchedLikedArticles = await getLikes();
            for (let i = 0; i < fetchedLikedArticles.length; i++){
                !likedArticles.includes(fetchedLikedArticles[i])? addLikedArticle(fetchedLikedArticles[i]): null
            } 
        }
        fetchLikedArticles();

    },[])

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
                extraData={articles}
                removeClippedSubviews={false} 
                data={articles}
                renderItem={({ item }) => item.authorUsername == "hiroyuki"?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
                keyExtractor={item => item.id}
                />
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