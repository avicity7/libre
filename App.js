import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';
import {useState, useEffect} from 'react';

//Import pages
import Home from './src/pages/Home';
import Library from './src/pages/Library';
import Account from './src/pages/Account';
import Login from './src/pages/Login';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();


//Ignoring passing setLikedArticles() into a navigation prop
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

//Import firebase stuff 
const db = require('./api/firebaseConfig');
import { updateDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Create bottom tab 
const Tab = createBottomTabNavigator();

const updateLikes = async(likesArray,username) => {
  const docRef = doc(db, "users", username);

  const data = {
    likes: likesArray
  };

  updateDoc(docRef, data)
  .then(docRef => {
      console.log("Likes updated to "+likesArray);
  })
  .catch(error => {
      console.log(error);
  })
}

const HomeTabs = () => {
  const auth = getAuth();
  const [likedArticles, setLikedArticles] = useState([]);
  
  const addLikedArticle = (article) => {
    setLikedArticles(likedArticles.push(article));
    updateLikes(likedArticles,auth.currentUser.email);
    console.log(likedArticles)
  }
  const removeLikedArticle = (article) => { 
    setLikedArticles(likedArticles.splice(likedArticles.indexOf(article), 1));
    updateLikes(likedArticles,auth.currentUser.email);
    console.log(likedArticles)
  }
  return(
    <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = "book-open";
              } 
              else if (route.name === "Library") {
                iconName = "bookshelf";
              } 
              else if (route.name === "Account") {
                iconName = "account";
              }

              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={30}
                  color={color}
                  style={{ height: 30 }}
                />
              );
            },
            tabBarActiveTintColor: "#020202",
            tabBarStyle: {
              borderTopWidth: 0,
              elevation: 0
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: "NotoSerifRegular",
              padding: Platform.OS === 'ios' ? 0 : 10
            },
            headerShown: false,
          })}
          initialRouteName = "Home"
          >
            <Tab.Screen name = "Library" component = {Library} initialParams = {{likedArticles: likedArticles,addLikedArticle:addLikedArticle,removeLikedArticle:removeLikedArticle,setLikedArticles:setLikedArticles}} ></Tab.Screen>
            <Tab.Screen name = "Home" component = {Home} initialParams = {{likedArticles: likedArticles,addLikedArticle:addLikedArticle,removeLikedArticle:removeLikedArticle}}></Tab.Screen>
            <Tab.Screen name = "Account" component = {Account} initialParams = {{likedArticles: likedArticles,addLikedArticle:addLikedArticle,removeLikedArticle:removeLikedArticle}}></Tab.Screen>
    </Tab.Navigator>
  )
}


const App = () => {
  const [loaded] = useFonts({
    NotoSerifRegular: require('./assets/fonts/NotoSerif-Regular.ttf'),
    NotoSerifBold: require('./assets/fonts/NotoSerif-Bold.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return (
    //Provide safe area (notch etc.)
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name = "Login" component = {Login} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen name = "HomeTabs" component={HomeTabs} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App 
