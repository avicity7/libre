import { Pressable, ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from '../styles/global';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from 'expo-font';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import ArticleCard from '../components/articleCard'
import { Article } from './Home';
const databaseData = require('../../api/database.json'); 
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const LibraryView = ({route,navigation}) => {
    const {likedArticles,setLikedArticles} = route.params;
    const [displayCategory, setDisplayCategory] = useState("subscribedArticles")
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
            >
                Library
            </Text>

            <View style={globalStyles.tabHeader}>
                <Pressable onPress = {() => {setDisplayCategory("subscribedArticles")}}>
                    <View style = {[{'borderBottomColor': displayCategory == "subscribedArticles"?"black":'#99999970','borderBottomWidth': 1,padding:5}]}>
                        <MaterialCommunityIcons
                            name={"account-star"}
                            size={30}
                            color= {displayCategory == "subscribedArticles"?"black":'#99999970'}
                            style={{ height: 30,marginLeft:40}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == "subscribedArticles"?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Subscriptions
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress = {() => {setDisplayCategory("likedArticles")}}>
                    <View style = {[{'borderBottomColor': displayCategory == "likedArticles"?"black":'#99999970','borderBottomWidth': 1,padding:5,marginLeft:10}]}>
                        <MaterialCommunityIcons
                            name={"star"}
                            size={30}
                            color= {displayCategory == "likedArticles"?"black":'#99999970'}
                            style={{ height: 30,marginLeft:15}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == "likedArticles"?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Liked
                        </Text>
                    </View>
                </Pressable>
            </View>

            <ScrollView style = {displayCategory == "likedArticles"?{opacity:100}:{opacity:0}}>
                <FlatList
                    data={databaseData.articles}
                    renderItem={({ item }) => likedArticles.includes(item.id) && displayCategory == "likedArticles"?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

const Stack = createNativeStackNavigator();

const Library = (props) => {
    console.log(props.route.params.likedArticles);
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Library">
          <Stack.Screen
            name="Library"
            component={LibraryView}
            options={{ headerShown: false }}
            initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles}}
          />
          <Stack.Screen
            name="Article"
            component={Article}
            options={{ headerShown: false }}
            initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Library 