import { Pressable, StyleSheet, Text, TextInput, View, ScrollView, FlatList ,Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const Login = ({navigation}) => {
    const auth = getAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    return(
        

        <SafeAreaView
        style = {styles.container}>
            <Text style = {styles.title}>libre</Text>
            <Text style = {styles.textStyle}>Username</Text>
            <TextInput
                style = {styles.textContainer}
                placeholder='username'
                textContentType='username'
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
                <Text style = {{fontSize: 20, color: "white",fontFamily:"NotoSerifRegular"}}> Sign In </Text>
            </Pressable>
            


        </SafeAreaView>
        

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
        padding: 'auto',
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

export default Login