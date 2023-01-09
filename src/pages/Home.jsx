import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import WriteButton from '../components/writebutton';
import Button from '../components/button';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCarou from '../components/carou';

const ArticlesView = ({ navigation }) => {
    return ( 
        <SafeAreaView style={globalStyles.container}>
            <Text
                style={globalStyles.header}
            >
                Articles
            </Text>
            <ScrollView>
                <ArticleCarou/>
                <Button 
                    style = {globalStyles.articleCard}
                    text = {"Open Article"}
                    onPress = {()=>{navigation.navigate("Article")}}
                />
            </ScrollView>
            
        </SafeAreaView>
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
                
                <Text
                    style={globalStyles.articleDetails}
                >
                    Published by: Author
                </Text>
                <Text
                    style={globalStyles.articleBody}
                >
                    Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment. Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring. Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.
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