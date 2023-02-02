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
import {collection, getDocs, query, where} from "firebase/firestore";

const getLikes = async() => {
    var likedArray = []
    const user = await getDocs(query(collection(db, "users"), where("username", "==", "hiroyuki")))
    user.forEach(doc => {
      likedArray = doc.data().likes
    });
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

const LibraryView = ({route,navigation}) => {
    const {likedArticles, addLikedArticle, removeLikedArticle, refreshFlatList} = route.params;
    const [displayCategory, setDisplayCategory] = useState("subscriptions");
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

            <FlatList
                extraData={likedArticles}
                style = {[displayCategory == "liked"?{opacity:100}:{opacity:0},{marginTop:10}]}
                data={articles}
                renderItem={({ item }) => likedArticles.includes(item.id) && displayCategory == "liked"?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
            />
            
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
            initialParams={{likedArticles:props.route.params.likedArticles,addLikedArticle:props.route.params.addLikedArticle,removeLikedArticle:props.route.params.removeLikedArticle,updateDisplayCategory:props.route.params.updateDisplayCategory,refreshFlatList:props.route.params.refreshFlatList}}
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