import { Pressable, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCarou from '../components/carou';

const databaseData = require('../../api/database.json');
import { useFonts } from 'expo-font';
import BackButton from '../components/backbutton';

const ArticlesView = ({ navigation }) => {
    const [loaded] = useFonts({
        NotoSerifRegular: require('../../assets/fonts/NotoSerif-Regular.ttf'),
        NotoSerifBold: require('../../assets/fonts/NotoSerif-Bold.ttf')
      });
    
      if (!loaded) {
        return null;
    }

    const ArticleCard = ({item}) => {
        return(
            <View style = {style.container}>
                <Pressable
                    onPress = {() => {navigation.navigate("Article",item)}}
                >
                    <Text style = {[style.text,{fontFamily: 'NotoSerifRegular'}]}>{item.title}</Text> 
                    <View style={{flexDirection:"row",marginTop:15}}>
                        <View style = {{flex:1}}>
                            <Text style = {[style.category,{fontFamily: 'NotoSerifBold'},item.category == "Politics"?{color:"#882A2A"}:item.category == "Society"? {color:"#3A6E7E"}:{color:"#591B8A"}]}>{item.category}</Text>
                        </View>
                        <View style = {{flex:1}}>
                            <Text style = {[style.author,{fontFamily: 'NotoSerifRegular'}]}>by {item.author}</Text> 
                        </View>
                    </View>
                </Pressable>
            </View>
        )
    }
    
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
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

const Article = ({route,navigation}) => { 
    const article  = route.params;
    return (
        <ScrollView style = {globalStyles.articleContainer}>
            <BackButton onPress={() => {navigation.navigate("Articles")}}/>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold',marginTop:120,marginLeft:15,marginRight:15}]}
            >
                {article.title}
            </Text>
            
            <Text
                style={[globalStyles.articleDetails,{fontFamily: 'NotoSerifRegular',marginLeft:15,marginRight:15}]}
            >
                Published by: {article.author}
            </Text>
            <Text
                style={[globalStyles.articleBody,{fontFamily: 'NotoSerifRegular',marginLeft:15,marginRight:15}]}
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
            options={{ headerShown: false }}
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
        fontSize: 12,
        textAlign: "right"
    },
    category: {
        fontSize: 12,
    }
});
export default Home 