import { Pressable, StyleSheet, Text } from "react-native";

const Button = ({text,onPress,customStyle}) => {
    return(
        <Pressable
            style = {style.container}
            onPress = {onPress}
        >
           <Text style = {style.text}>{text}</Text> 
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 16,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderTopColor: "#F0F0F0",
        borderTopWidth: 1,
        borderBottomColor: "#F0F0F0",
        borderBottomWidth: 1
    },
    text: { 
        fontSize: 16
    }
  });
  
export default Button;