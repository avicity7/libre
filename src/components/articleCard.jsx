import { Pressable, StyleSheet, Text, View, ScrollView, FlatList } from 'react-native';

const ArticleCard = ({item,onPress}) => {
    return(
        <View style = {style.container}>
            <Pressable
                onPress = {onPress}
            >
                <Text style = {[style.text,{fontFamily: 'NotoSerifRegular'}]}>{item.title}</Text> 
                <View style={{flexDirection:"row",marginTop:15}}>
                    <View style = {{flex:1}}>
                        <Text style = {[style.category,{fontFamily: 'NotoSerifBold'},item.category == "Politics"?{color:"#882A2A"}:item.category == "Society"? {color:"#3A6E7E"}:{color:"#591B8A"}]}>{item.category}</Text>
                    </View>
                    <View style = {{flex:1}}>
                        <Text style = {[style.author,{fontFamily: 'NotoSerifRegular'}]}>by {item.author}</Text> 
                    </View>
                </View>
            </Pressable>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        padding: 16,
        borderTopColor: "#F0F0F0",
        borderTopWidth: 1,
        borderBottomColor: "#F0F0F0",
        borderBottomWidth: 1
    },
    text: { 
        fontSize: 20,
    },
    author: { 
        fontSize: 12,
        textAlign: "right"
    },
    category: {
        fontSize: 12,
    }
});

module.exports = ArticleCard