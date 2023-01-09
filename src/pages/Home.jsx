import { Pressable, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import WriteButton from '../components/writebutton';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCarou from '../components/carou';

const databaseData = require('../../api/database.json');

const ArticlesView = ({ navigation }) => {

    const ArticleCard = ({item}) => {
        return(
            <View style = {style.container}>
                <Pressable
                    onPress = {() => {navigation.navigate("Article",item)}}
                >
                    <View style={{display:"flex"}}>
                        <Text style = {style.text}>{item.title}</Text> 
                        <Text style = {style.category}>{item.category}</Text>
                    </View>
                    <Text style = {style.author}>by {item.author}</Text> 
                </Pressable>
            </View>
        )
    }
    
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Articles
            </Text>
            <ScrollView>
                <ArticleCarou/>
                <FlatList
                    data={databaseData.articles}
                    renderItem={ArticleCard}
                    keyExtractor={item => item.id}
                />
            </ScrollView>
            
        </SafeAreaView>
    )
}

const Article = ({route}) => { 
    const article  = route.params;
    return (
        <ScrollView style = {globalStyles.articleContainer}>
            <Text
                style={globalStyles.header}
            >
                {article.title}
            </Text>
            
            <Text
                style={globalStyles.articleDetails}
            >
                Published by: {article.author}
            </Text>
            <Text
                style={globalStyles.articleBody}
            >
                {article.body}
            </Text>
        </ScrollView>
    )
}

const Stack = createNativeStackNavigator();

const Home = () => {
    return (
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Articles">
          <Stack.Screen
            name="Articles"
            component={ArticlesView}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Article"
            component={Article}
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
    );
  };

const style = StyleSheet.create({
    container: {
        padding: 16,
        borderTopColor: "#F0F0F0",
        borderTopWidth: 1,
        borderBottomColor: "#F0F0F0",
        borderBottomWidth: 1
    },
    text: { 
        fontSize: 20,
    },
    author: { 
        fontSize: 13,
        marginTop: 10,
        alignSelf: "flex-end"
    },
    category: {
        fontSize: 15,
        textAlign: "right"
    }
});
export default Home 