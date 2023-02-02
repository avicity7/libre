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
import {collection, getDocs, query, where} from "firebase/firestore";

//Create bottom tab 
const Tab = createBottomTabNavigator();

const getLikes = async() => {
  var likedArray = []
  const user = await getDocs(query(collection(db, "users"), where("username", "==", "hiroyuki")))
  user.forEach(doc => {
    likedArray = doc.data()
    console.log(likedArray)
  });
  return likedArray
}

const HomeTabs = () => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [refreshFlatList, setRefreshFlatList] = useState(false);
  const addLikedArticle = (article) => {
    setLikedArticles(likedArticles.push(article));
    setRefreshFlatList(!refreshFlatList);
    console.log(likedArticles)
  }
  const removeLikedArticle = (article) => { 
    setLikedArticles(likedArticles.splice(likedArticles.indexOf(article), 1));
    setRefreshFlatList(!refreshFlatList);
    console.log(likedArticles)
  }
  const updateDisplayCategory = () => { 
    setDisplayCategory(!displayCategory);
    console.log(displayCategory)
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
            <Tab.Screen name = "Library" component = {Library} initialParams = {{likedArticles: likedArticles,addLikedArticle:addLikedArticle,removeLikedArticle:removeLikedArticle,refreshFlatList:refreshFlatList}} ></Tab.Screen>
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
