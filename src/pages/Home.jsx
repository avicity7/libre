import { Pressable, StyleSheet, Text, View, ScrollView, FlatList , ImageBackground, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCarou from '../components/carou';
import LikeButton from '../components/heartbutton';
import ArticleCard from '../components/articleCard';
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
    
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
            >
                Articles
            </Text>
                
            <FlatList
                removeClippedSubviews={false} 
                ListHeaderComponent = {<ArticleCarou/>}
                data={databaseData.articles}
                renderItem={({ item }) => <ArticleCard item={item} onPress={()=>navigation.navigate("Article",{'article':item})} />}
                keyExtractor={item => item.id}
            />
        
        </SafeAreaView>
    )
}

export const Article = ({route,navigation}) => { 
    const {article,likedArticles,setLikedArticles,onPress} = route.params;
    return (
        <SafeAreaView style = {globalStyles.articleContainer}>
            <ScrollView>
             
                <ImageBackground style = {{width: Dimensions.get('window').width, height: 220}} source ={{uri:article.image}}>
                <View style = {{flex: 1, alignItems: 'center',backgroundColor: 'rgba(0, 0, 0, .5)',borderRadius: 14}}>
                <View style = {{flexDirection:"row"}}>
                    <View style = {{flex:1}}>
                        <BackButton onPress={() => {navigation.navigate(onPress)}}/>
                    </View>
                    <View style = {{flex:1}}>
                        <LikeButton id={article.id} likedArticles={likedArticles} setLikedArticles={setLikedArticles}/>
                    </View>
                </View>
                <Text
                    style={{fontSize: 25, color:"white", textAlign: 'center', fontWeight: '500',backgroundColor: 'transparent',fontFamily: 'NotoSerifBold', top: 40}}
                >
                    {article.title}
                </Text>
                </View>
                </ImageBackground>
                <Text
                    style={{fontSize: 25, color:"black",fontWeight: '500',backgroundColor: 'transparent',fontFamily: 'NotoSerifBold',marginLeft: 15, marginRight: 15,marginTop: 15}}
                >
                    {article.title}
                </Text>
                <Text
                    style={[globalStyles.articleDetails,{fontFamily: 'NotoSerifRegular',marginLeft: 15,marginRight:15, marginTop: 15,color:'#B0B0B0'}]}
                >
                    Published by: {article.author}
                </Text>
                <Text
                    style={[globalStyles.articleBody,{fontFamily: 'NotoSerifRegular'}]}
                >
                    {article.body}
                </Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const Stack = createNativeStackNavigator();

const Home = (props) => {
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
            initialParams={{likedArticles:props.route.params.likedArticles,setLikedArticles:props.route.params.setLikedArticles,onPress:"Articles"}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default Home