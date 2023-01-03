import { Pressable, StyleSheet, Text, View, TextInput } from 'react-native';
import React, {useState, useEffect} from 'react';
import globalStyles from "../styles/global";
import PublishButton from '../components/publishButton';
import ImagePickerExample from '../components/imagePicker';
import { SafeAreaView } from "react-native-safe-area-context";

const Publish = () => {
    return(
        <View>
            <SafeAreaView>
                <Text>Article Name</Text>
                <TextInput></TextInput>
                <Text>Header Picture</Text>
                <ImagePickerExample></ImagePickerExample>
                <Text>Article Body</Text>
                <TextInput></TextInput>
                <PublishButton />
            </SafeAreaView>




        </View>
    )



}

export default Publish;


