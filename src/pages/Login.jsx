import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, FlatList ,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
const db = require('../../api/firebaseConfig.js');
const auth = getAuth();

const Login = ({navigation}) => {
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
                navigation.navigate("Login")
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
                    navigation.goBack();
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

const Stack = createNativeStackNavigator();

const LoginPage = () => { 
    return(
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="Login">
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
    )
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

export default LoginPage