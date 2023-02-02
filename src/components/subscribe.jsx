import { View , Text , StyleSheet, Pressable, TextInputComponent} from "react-native";
import globalStyles from "../styles/global";
import React, {useState} from 'react';
import { Shadow } from "react-native-shadow-2";


const SubscribeButton = ({onPress}) =>{

    const [textColor, setTextColor] = useState("");
    const [buttonColor, setButtonColor] = useState("")
    const [subscribe, setSubscribe] = useState("")
    const changeState = () => {
        setTextColor(!textColor)
        setButtonColor(!buttonColor)
        setSubscribe(!subscribe)
       
    };

    return(
        <View style = {globalStyles.SubscribeButtonPos}>
        <Shadow distance={4} startColor = "rgba(183, 183, 183, 0.1)">
        <Pressable
            onPress={changeState}
            style = {{borderRadius: 30}}
        >
            <View style = {[globalStyles.SubscribeButton]} color>
                <Text style ={[globalStyles.SubscribeText,
                    {color: textColor ? 'white' : 'black',
                    backgroundColor: buttonColor ? 'black' : 'white'}
                ]}>{subscribe ? "Subscribed" : "Subscribe"}</Text>
            </View>
        </Pressable>
        </Shadow>
        </View>

    )

}

export default SubscribeButton