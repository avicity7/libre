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
import Svg, { Circle, Rect, Path } from 'react-native-svg';
import AuthorCard from '../components/authorCard';

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
            <View style = {{flexDirection:"row"}}>
                <Text
                    style={[globalStyles.header,{fontFamily: 'NotoSerifBold'}]}
                >
                    Articles
                </Text>
                <Pressable style = {{flex:1,flexDirection:"row-reverse"}} onPress = {()=>{navigation.navigate("Credit")}}>
                    <Text style = {{marginLeft:10,marginRight:10,marginTop:20,fontFamily:"NotoSerifRegular",fontSize:25}}>0</Text>
                    <Svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style = {{alignSelf:"center"}}>
                        <Circle cx="20" cy="20" r="20" fill="#202020"/>
                        <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                    </Svg>
                    
                </Pressable>
            </View>
                
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
             
                <ImageBackground style = {globalStyles.articleImage} imageStyle= {globalStyles.articleImageBorder} source ={{uri:article.image}}>
                <View style = {globalStyles.articleImageDarken}>
                <View style = {{flexDirection:"row"}}>
                    <View style = {{flex:1}}>
                        <BackButton onPress={() => {navigation.navigate(onPress)}}/>
                    </View>
                    <View style = {{flex:1}}>
                        <LikeButton id={article.id} likedArticles={likedArticles} setLikedArticles={setLikedArticles}/>
                    </View>
                </View>
                <Text
                    style={globalStyles.imageTitle}
                >
                    {article.title}
                </Text>
                </View>
                </ImageBackground>
                <Text
                    style={globalStyles.titleStyle}
                >
                    {article.title}
                </Text>
                <Text
                    style={[globalStyles.articleDetails,globalStyles.detailPos]}
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

const Credit = ({navigation}) => {
    return(
        <SafeAreaView style = {globalStyles.container}>
            <BackButton onPress={() => {navigation.navigate("Articles")}}/>
            <ScrollView>

                <Text style = {styles.creditNumber}>1234</Text>
                <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style = {styles.coin}>
                    <Circle cx="20" cy="20" r="20" fill="#202020"/>
                    <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                    <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                    <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                    <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                </Svg>
                

                <Pressable style = {styles.button} onPress = {()=>{navigation.navigate("Purchase Credits")}}>
                    <Text style = {{fontFamily:"NotoSerifRegular", fontSize: 13}}>Purchase Credits</Text>
                </Pressable>

                <Text style = {styles.subscriptionSubHeader}>My Subscriptions</Text>
            
                <AuthorCard/>


            </ScrollView>

        </SafeAreaView>






    )



}

const PurchaseCredit = ({navigation})=>{
    return(
        <SafeAreaView style ={globalStyles.container}>
            <BackButton onPress={() => {navigation.navigate("Credit")}}/>
            <ScrollView>
                <View style ={{marginTop:80}}>

                    <Text style = {[styles.creditNumber,{color:"#DDDDDD"}]}>1234</Text>
                    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style = {styles.coin}>
                        <Circle cx="20" cy="20" r="20" fill="#202020"/>
                        <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M12.001 7.99994L18.6676 15.3333V24.6666L12.001 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                        <Path d="M27.999 7.99994L21.3324 15.3333V24.6666L27.999 31.9999V7.99994Z" fill="#F5F5F5"/>
                    </Svg>
                    <Text style = {[styles.cashNumber,{color:"#DDDDDD"}]}>$0.00USD</Text>
                

                    <DropShadow style = {styles.shadowProp}>
                        <Pressable style = {styles.buyButton}>

                            <Text style = {styles.buttonText}>Purchase with Card</Text>
                            <Svg style ={styles.buySvg} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M16.6665 3.33331H3.33317C2.40817 3.33331 1.67484 4.07498 1.67484 4.99998L1.6665 15C1.6665 15.925 2.40817 16.6666 3.33317 16.6666H16.6665C17.5915 16.6666 18.3332 15.925 18.3332 15V4.99998C18.3332 4.07498 17.5915 3.33331 16.6665 3.33331ZM15.8332 15H4.1665C3.70817 15 3.33317 14.625 3.33317 14.1666V9.99998H16.6665V14.1666C16.6665 14.625 16.2915 15 15.8332 15ZM16.6665 6.66665H3.33317V4.99998H16.6665V6.66665Z" fill="black"/>
                            </Svg>

                        </Pressable>
                    </DropShadow>
                
                    <DropShadow style = {styles.shadowProp}>
                        <Pressable style = {styles.buyButton}>
                            
                            <Text style = {styles.buttonText}>Purchase with BTC</Text>
                            <Svg style ={styles.buySvg} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9.96094 7.34918L9.5051 9.17418C10.0209 9.30252 11.6126 9.82752 11.8701 8.79418C12.1384 7.71835 10.4759 7.47835 9.96094 7.34918ZM9.27594 10.0958L8.77344 12.1083C9.3926 12.2625 11.3043 12.8758 11.5868 11.7408C11.8826 10.5558 9.89594 10.25 9.27594 10.0958Z" fill="black"/>
                            <Path d="M12.0177 1.91583C7.55357 0.803332 3.0344 3.52 1.92191 7.98417C0.808572 12.4467 3.52524 16.9675 7.98607 18.0808C12.4502 19.1933 16.9719 16.4775 18.0836 12.0133C19.1969 7.55 16.4802 3.02917 12.0177 1.91583ZM13.6769 8.81167C13.5561 9.62333 13.1052 10.0158 12.5086 10.1542C13.3294 10.5808 13.7461 11.2358 13.3494 12.3717C12.8561 13.7808 11.6844 13.9 10.1244 13.605L9.74607 15.1217L8.83274 14.8942L9.20524 13.3992C8.96155 13.3383 8.71848 13.275 8.47607 13.2092L8.1019 14.7125L7.1894 14.4833L7.56774 12.9642C7.35357 12.9092 7.1369 12.8508 6.91607 12.7958L5.72524 12.5L6.18024 11.4533C6.18024 11.4533 6.85357 11.6325 6.84441 11.6192C7.10357 11.6833 7.21774 11.515 7.26274 11.4017L7.86191 9.00583L7.95774 9.03C7.92682 9.01753 7.89508 9.00723 7.86274 8.99916L8.2894 7.28833C8.30024 7.09333 8.23441 6.84833 7.86357 6.75583C7.87857 6.74667 7.1994 6.59083 7.1994 6.59083L7.44191 5.61416L8.70357 5.92916L8.70274 5.93333C8.8919 5.98083 9.0869 6.02583 9.28607 6.07083L9.66024 4.56916L10.5744 4.79667L10.2077 6.26833C10.4527 6.32416 10.7002 6.38083 10.9402 6.44083L11.3052 4.97833L12.2194 5.20583L11.8452 6.7075C12.9986 7.10666 13.8419 7.70333 13.6769 8.81167Z" fill="black"/>
                            </Svg>
                        
                        

                        

                        </Pressable>
                    </DropShadow>
                    <DropShadow style = {styles.shadowProp}>
                        <Pressable style = {styles.buyButton}>
                            <Text style = {styles.buttonText}>Purchase with ETH</Text>
                            <Svg style ={styles.buySvg}width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M9.95356 14.975L3.81689 11.35L9.95273 20L16.0944 11.35L9.95106 14.975H9.95356ZM10.0469 0L3.90856 10.1858L10.0461 13.8142L16.1836 10.1892L10.0469 0Z" fill="black"/>
                            </Svg>

                        </Pressable>
                    </DropShadow>
                </View>    
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
          <Stack.Screen
            name="Credit"
            component={Credit}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Purchase Credits"
            component={PurchaseCredit}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    creditNumber: {
        alignSelf:'center',
        fontSize: 62,
        fontFamily: "NotoSerifRegular",
        marginTop: 40


    },
    cashNumber: {
        alignSelf:'center',
        fontSize: 25,
        fontFamily: "NotoSerifRegular",

    },
    coin:{
        alignSelf:"center",
        margin: 10
    },
    buySvg:{
        alignSelf:'center',
        marginLeft:15
    },
    button:{
        alignSelf:'center',
        borderRadius: 15,
        padding: 5,
        backgroundColor:'white',
        margin: 10,
    
    },
    buttonText:{
        fontFamily:"NotoSerifRegular",
        fontSize: 13,
        alignSelf:'center',
        textAlign:'center',
        marginLeft: 15
    },
    shadowProp:{
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    subscriptionSubHeader:{
        alignSelf:"center",
        fontFamily:"NotoSerifRegular",
        fontSize: 20,
        margin: 15,
        color:"#909090",
        

    },

    buyButton:{
        alignSelf:'center',
        alignItems:'center',
        justifyContent:'flex-start',
        alignContent:'center',
        borderRadius: 15,
        padding: 10,
        width:Dimensions.get('window').width - 190,
        backgroundColor:'white',
        margin: 10,
        flexDirection:'row',
        
    
    },




})

export default Home