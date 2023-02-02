import React, { useState, useEffect } from 'react';
import {Image, View, Platform, Dimensions } from 'react-native';
import Button from './button';
import * as ImagePicker from 'expo-image-picker';
import globalStyles from '../styles/global';

export default function ImagePickerExample() {
  
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style = {[{textAlign:'center'},globalStyles.shadowProp]}>
      <Button title="Pick an image from camera roll" color = "black" onPress={pickImage}/>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200}} />}
    </View>
  );
}