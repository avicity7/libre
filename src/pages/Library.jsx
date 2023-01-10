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


const useForceUpdate = () =>{
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // An function that increment 👆🏻 the previous state like here 
    // is better than directly setting `value + 1`
}


const LibraryView = ({route,navigation}) => {
    const {likedArticles,setLikedArticles} = route.params;
    const [displayCategory, setDisplayCategory] = useState(true);
    const [refreshed, setRefreshed] = useState(false);
    useEffect(()=>{
        if (refreshed != true){
            console.log("refreshing")
            setDisplayCategory(!displayCategory);
            setDisplayCategory(!displayCategory);
            setRefreshed(true);
        }
    })
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
            >
                Library
            </Text>

            <View style={globalStyles.tabHeader}>
                <Pressable onPress = {() => {setDisplayCategory(true)}}>
                    <View style = {[{'borderBottomColor': displayCategory == true?"black":'#99999970','borderBottomWidth': 1.5,padding:10}]}>
                        <MaterialCommunityIcons
                            name={"account-star"}
                            size={25}
                            color= {displayCategory == true?"black":'#99999970'}
                            style={{ height: 30,marginLeft:31.5}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == true?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Subscriptions
                        </Text>
                    </View>
                </Pressable>
                <Pressable onPress = {() => {setDisplayCategory(false)}}>
                    <View style = {[{'borderBottomColor': displayCategory == false?"black":'#99999970','borderBottomWidth': 1.5,padding:10,marginLeft:10}]}>
                        <MaterialCommunityIcons
                            name={"star"}
                            size={25}
                            color= {displayCategory == false?"black":'#99999970'}
                            style={{ height: 30,marginLeft:13.5}}
                        />
                        <Text style={[globalStyles.tabHeaderText,displayCategory == false?{color:"black"}:{color:'#99999970'},{fontFamily: 'NotoSerifRegular'}]}>
                            Liked
                        </Text>
                    </View>
                </Pressable>
            </View>

            <FlatList
                style = {displayCategory == false?{opacity:100}:{opacity:0},{marginTop:10}}
                data={databaseData.articles}
                renderItem={({ item }) => likedArticles.includes(item.id) && displayCategory == false?<ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />:null}
                keyExtractor={item => item.id}
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
            initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles}}
          />
          <Stack.Screen
            name="Article"
            component={Article}
            options={{ headerShown: false }}
            initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles,onPress:"Library"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Library 