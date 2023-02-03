import { Pressable, StyleSheet, Text, View, ScrollView, FlatList, Image, Dimensions} from 'react-native';
import React, {useState, useEffect} from 'react';

import {collection, getDocs, getDoc, doc, onSnapshot} from "firebase/firestore";
import { getAuth } from "firebase/auth";
const db = require('../../api/firebaseConfig.js');

const AuthorCard = (item) => {
    const [firstName,setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    useEffect(()=>{
        const fetchAuthor = onSnapshot(doc(db,"users",item.item),(docSnap) => {
            let firstName = docSnap.data().firstName;
            let lastName = docSnap.data().lastName;
            let bio = docSnap.data().bio;
            setFirstName(firstName);
            setLastName(lastName);
            setBio(bio);
        })
        return () => fetchAuthor();
    },[])
    return(
        <View style = {styles.container}>
            <View style ={{flexDirection:"column"}}>
            <Text style = {{ paddingLeft: 10, fontFamily:"NotoSerifBold"}}>{firstName} {lastName}</Text>
            <Text style ={{paddingLeft:10,paddingRight:10, width:Dimensions.get('window').width - 80,fontSize:10,fontFamily:"NotoSerifRegular"}}>{bio}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding:5,
        alignContent: 'space-between',
        flexDirection: 'row'
    },



})
export default AuthorCard