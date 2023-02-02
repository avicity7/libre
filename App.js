import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useFonts } from 'expo-font';
import {useState, useEffect} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert, Pressable, StyleSheet, Text, TextInput, View, ScrollView, FlatList ,Dimensions} from 'react-native';

//Import pages
import Home from './src/pages/Home';
import Library from './src/pages/Library';
import Account from './src/pages/Account';

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
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

//Create bottom tab 
const Tab = createBottomTabNavigator();

//Onboarding screens 
const Login = ({navigation,onPress}) => {
  const auth = getAuth();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return(
      

      <SafeAreaView
      style = {styles.container}>
          <Text style = {styles.title}>libre</Text>
          <Text style = {styles.textStyle}>Email</Text>
          <TextInput
              style = {styles.textContainer}
              placeholder='email'
              textContentType='email'
              onChangeText={newText => setEmail(newText)}
          />
          <Text style = {styles.textStyle}>Password</Text>
          <TextInput
              style = {styles.textContainer}
              placeholder = 'password'
              textContentType='password'
              onChangeText={newText => setPassword(newText)}
          />

          <Pressable 
          style = {styles.loginButton}
          onPress = {()=>{
              signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log(user);
                  navigation.navigate("HomeTabs")
                  // ...
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
              });
          }}
          >
              <Text style = {{fontSize: 16, color: "white",fontFamily:"NotoSerifBold"}}> Sign In </Text>
          </Pressable>

          <Text style = {{fontSize: 20, color: "black",fontFamily:"NotoSerifRegular",alignSelf:"center",marginTop:60}}>Don't have an account?</Text>
          <Pressable 
          style = {styles.signupButton}
          onPress = {()=>{
              navigation.navigate("Signup")
          }}
          >
              <Text style = {{fontSize: 16, color: "white",fontFamily:"NotoSerifBold"}}> Sign Up </Text>
          </Pressable>
          


      </SafeAreaView>
      

  )

}

const Signup = ({navigation}) => {
  const auth = getAuth();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return(
      

      <SafeAreaView
      style = {styles.container}>
          <Text style = {styles.title}>libre</Text>
          <Text style = {{fontSize: 20, color: "black",fontFamily:"NotoSerifRegular",alignSelf:"center",marginTop:60}}>Account Setup</Text>
          <Text style = {styles.textStyle}>Email</Text>
          <TextInput
              style = {styles.textContainer}
              placeholder='email'
              textContentType='email'
              onChangeText={newText => setEmail(newText)}
          />
          <Text style = {styles.textStyle}>Password</Text>
          <TextInput
              style = {styles.textContainer}
              placeholder = 'password'
              textContentType='password'
              onChangeText={newText => setPassword(newText)}
          />

          <Pressable 
          style = {styles.loginButton}
          onPress = {()=>{
              createUserWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                  // Signed in 
                  const user = userCredential.user;
                  console.log(user);
                  navigation.navigate("CreateAccount")
                  // ...
              })
              .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage)
                  // ..
              });
          }}
          >
              <Text style = {{fontSize: 16, color: "white",fontFamily:"NotoSerifBold"}}> Set up account </Text>
          </Pressable>

          <Text style = {{fontSize: 20, color: "black",fontFamily:"NotoSerifRegular",alignSelf:"center",marginTop:60}}>Already have an account?</Text>
          <Pressable 
          style = {styles.signupButton}
          onPress = {()=>{
              navigation.navigate("Signin");
          }}
          >
              <Text style = {{fontSize: 16, color: "white",fontFamily:"NotoSerifBold"}}> Sign In </Text>
          </Pressable>
          


      </SafeAreaView>
      

  )

}

const CreateAccount = ({navigation}) => {
  const auth = getAuth();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');

  return(
      <SafeAreaView style={styles.container}>
          <Text style = {{fontSize: 26, color: "black",fontFamily:"NotoSerifRegular",alignSelf:"center",marginBottom:30}}>Account Setup</Text>
          <Text style = {styles.textStyle}>Username</Text>
          <TextInput
              style = {styles.textContainer}
              onChangeText={newText => setUsername(newText)}
          />
          <Text style = {styles.textStyle}>First Name</Text>
          <TextInput
              style = {styles.textContainer}
              onChangeText={newText => setFirstName(newText)}
          />
          <Text style = {styles.textStyle}>Last Name</Text>
          <TextInput
              style = {styles.textContainer}
              onChangeText={newText => setLastName(newText)}
          />
          <Text style = {styles.textStyle}>Bio</Text>
          <TextInput
              style = {styles.textContainer}
              onChangeText={newText => setBio(newText)}
          />
          <Pressable 
          style = {styles.signupButton}
          onPress = {()=>{
              const docRef = doc(db, "users", auth.currentUser.email);

              const data = {
                  firstName: firstName,
                  lastName: lastName,
                  bio: bio, 
                  likes: [],
                  published: [],
                  subscriptions: [],
                  username: username
              };

              setDoc(docRef, data)
              .then(() => {
                  console.log("Document has been added successfully");
                  alert("Account created","Please sign in!")
                  navigation.navigate("Login");
                  
              })
              .catch(error => {
                  console.log(error);
              })
          }}
          >
              <Text style = {{fontSize: 16, color: "white",fontFamily:"NotoSerifBold"}}> Create Account </Text>
          </Pressable>
      </SafeAreaView>
  )
}

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
          <Stack.Screen name = "HomeTabs" component={HomeTabs} options={{ headerShown: false }}></Stack.Screen>
          <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="CreateAccount"
                    component={CreateAccount}
                    options={{ headerShown: false }}
                />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container:{
      flex: 1,
      backgroundColor: 'white',
      padding: 8,
      margin: 'auto',
      justifyContent:"center"

  },
  textContainer:{
      backgroundColor: '#F9F9F9',
      borderRadius: 10,
      width: Dimensions.get('window').width - 100,
      padding: 6,
      fontSize: 15,
      alignSelf: 'center',
      alignItems:"center",
      fontFamily:"NotoSerifRegular"
      
  },
  textStyle:{
      fontSize: 20,
      paddingTop: 5,
      paddingBottom: 15,
      marginTop: 30,
      left:46,
      fontFamily: "NotoSerifBold"
      
  },
  loginButton:{
      marginTop: 60,
      backgroundColor: '#202020',
      borderRadius:16,
      width: 300,
      padding: 6,
      alignSelf:'center',
      alignItems:"center",
  
  },
  signupButton:{
      marginTop: 20,
      backgroundColor: '#202020',
      borderRadius:16,
      width: 300,
      padding: 6,
      alignSelf:'center',
      alignItems:"center",
  
  },
  title:{
      fontFamily:'NotoSerifBold',
      fontSize: 40,
      alignSelf: 'center',
  },
  shadowProp: {
      shadowColor: '#75757560',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 5,
    },


})

export default App 
