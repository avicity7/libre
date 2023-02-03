import { View , Text , StyleSheet, Pressable, TextInputComponent} from "react-native";
import globalStyles from "../styles/global";
import React, {useEffect, useState} from 'react';
import { Shadow } from "react-native-shadow-2";


const SubscribeButton = ({onPress,subscribed}) =>{

    const [textColor, setTextColor] = useState(subscribed);
    const [buttonColor, setButtonColor] = useState(subscribed)
    const [subscribe, setSubscribe] = useState(subscribed)
    const changeState = () => {
        setTextColor(!textColor)
        setButtonColor(!buttonColor)
        setSubscribe(!subscribe)
        onPress();
    };
    useEffect(()=>{
        setSubscribe(subscribed);
        setButtonColor(subscribed);
        setTextColor(subscribed);
    },[subscribed])
    return(
        <View style = {globalStyles.SubscribeButtonPos}>
        <Shadow distance={4} startColor = "rgba(183, 183, 183, 0.1)">
        <Pressable
            onPress={changeState}
            style = {{borderRadius: 30}}
        >
            <View style = {[globalStyles.SubscribeButton]} color>
                <Text style ={[globalStyles.SubscribeText,
                    {color: textColor ? '#C30B0B' : 'black',
                    backgroundColor: buttonColor ? 'white' : 'white'}
                ]}>{subscribe ? "Unsubscribe" : "Subscribe"}</Text>
            </View>
        </Pressable>
        </Shadow>
        </View>

    )

}

export default SubscribeButton