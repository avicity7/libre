import { View , Image, StyleSheet,SafeAreaView} from "react-native";
import {collection, getDocs, getDoc, doc, onSnapshot, setDoc, updateDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import globalStyles from "../styles/global";
import React, {useState,useEffect} from 'react'

const db = require('../../api/firebaseConfig.js');
const styles = StyleSheet.create({
    circle:{
        borderRadius:100,
        width:100,
        height:100,
        zIndex: 1,
        marginTop: -50,
        marginLeft: 15,
    }



})


const ProfilePhoto = () => {
   
    const auth = getAuth();


    const [localPublishedArticles, setLocalPublishedArticles] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [articles,setArticles] = useState([]);
    const [profileImg, setProfileImg] = useState('');
    const [bannerImg, setBannerImg] = useState('')

    useEffect(()=>{
        console.log("refreshing")
        let documentID = auth.currentUser.email;
        const fetchAccount = onSnapshot(doc(db,"users",documentID),(docSnap) => {
            let firstName = docSnap.data().firstName;
            let lastName = docSnap.data().lastName;
            let username = docSnap.data().username;
            let bio = docSnap.data().bio;
            let profileImg = docSnap.data().profileImg;
            let bannerImg = docSnap.data().bannerImg
            
            setFirstName(firstName);
            setLastName(lastName);
            setUsername(username);
            setBio(bio);
            setProfileImg(profileImg);
            setBannerImg(bannerImg);
           
        })

        
        return () => fetchAccount();

    },[])
    
    
    const image =  `${profileImg}`
    
    console.log(image)
    return(
        <View>
            <Image
            source = {{uri:image}}
                style = {styles.circle}
            >

            </Image>

        </View>

    )

}
export default ProfilePhoto