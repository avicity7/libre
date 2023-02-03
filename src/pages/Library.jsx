import { Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useState, useEffect, useReducer} from 'react';
import globalStyles from '../styles/global';
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ArticleCard from '../components/articleCard'
import { Article } from './Home';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const db = require('../../api/firebaseConfig.js');
import {collection, getDocs, getDoc, doc, onSnapshot, query} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const getArticles = async() => {
    var articlesArray = []
    const articles = await getDocs(collection(db,"articles"));
    articles.forEach(doc => {
      articlesArray.push(doc.data());
    });
    return articlesArray
}

const LibraryView = ({route,navigation}) => {
    const auth = getAuth();
    const {likedArticles} = route.params;
    const [localLikedArticles,setLocalLikedArticles] = useState();
    const [localSubscriptions, setLocalSubscriptions] = useState([]);
    const [displayCategory, setDisplayCategory] = useState("subscriptions");
    const [articles,setArticles] = useState();

    useEffect(() => {
        let documentID = auth.currentUser.email;
        console.log("refreshing")
        const getArticlesFunction = async () => {
            let fetchedArticles = await getArticles();
            setArticles(fetchedArticles);
        }

        getArticlesFunction();

        const fetchUser = onSnapshot(doc(db,"users",documentID),(docSnap) => {
            let likes = [];
            let subscriptions = [];
            for (let i = 0; i < docSnap.data().likes.length; i++){
                likes.push(docSnap.data().likes[i])
            }
            for (let i = 0; i < docSnap.data().subscriptions.length; i++){
                subscriptions.push(docSnap.data().subscriptions[i])
            }
            setLocalSubscriptions(subscriptions);
            setLocalLikedArticles(likes);
        })
        
        return () => fetchUser();

    },[likedArticles])

    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
            >
                Library
            </Text>

            <View style={globalStyles.tabHeader}>
                <Pressable onPress = {() => {setDisplayCategory("subscriptions")}}>
                    <View style = {[{'borderBottomColor': displayCategory == "subscriptions"?"black":'#99999970','borderBottomWidth': 1.5,padding:10}]}>
                        <MaterialCommunityIcons
                            name={"account-star"}
                            size={25}
                            color= {displayCategory == "subscriptions"?"black":'#99999970'}
                            style={{ height: 30,marginLeft:31.5}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == "subscriptions"?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Subscriptions
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress = {() => {setDisplayCategory("liked")}}>
                    <View style = {[{'borderBottomColor': displayCategory == "liked"?"black":'#99999970','borderBottomWidth': 1.5,padding:10,marginLeft:10}]}>
                        <MaterialCommunityIcons
                            name={"star"}
                            size={25}
                            color= {displayCategory == "liked"?"black":'#99999970'}
                            style={{ height: 30,marginLeft:13.5}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == "liked"?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Liked
                        </Text>
                    </View>
                </Pressable>
            </View>

            {displayCategory == "liked" && (<FlatList
                
                style = {{marginTop:10}}
                data={articles}
                renderItem={({ item }) => likedArticles.includes(item.id)?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
            /> )}
            {displayCategory == "subscriptions" && (<FlatList
                
                style = {{marginTop:10}}
                data={articles}
                renderItem={({ item }) => localSubscriptions.includes(item.authorEmail)?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
            /> )}
            
        </SafeAreaView>
    )
}

const Stack = createNativeStackNavigator();

const Library = (props) => {
    
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Library">
          <Stack.Screen
            name="Library"
            component={LibraryView}
            options={{ headerShown: false }}
            initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,setLikedArticles:props.route.params.setLikedArticles}}
          />
          <Stack.Screen
            name="Article"
            component={Article}
            options={{ headerShown: false }}
            initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,onPress:"Library"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Library 