import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import WriteButton from '../components/writebutton';
import Button from '../components/button';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

const ArticlesView = ({ navigation }) => {
    return ( 
        <View style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Articles
            </Text>
            <ScrollView>

                <Button 
                    style = {globalStyles.articleCard}
                    text = {"Open Article"}
                    onPress = {()=>{navigation.navigate("Article")}}
                />
            
            </ScrollView>
            
        </View>
    )
}

const Article = ({route}) => { 
    
    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Text
                    style={globalStyles.header}
                >
                    Article
                </Text>
            </ScrollView>
            
        </View>
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

export default Home 