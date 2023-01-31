

import {CardField, useStripe} from "@stripe/stripe-react-native"
import { StyleSheet } from "react-native-web";
import globalStyles from "../styles/global";
import React, {useState} from 'react';


 export default function PaymentScreen() {
    const { confirmPayment } = useStripe();
  
    return (
      
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={[css.field,globalStyles.container]}
        onCardChange={(cardDetails) => {
          console.log('cardDetails', cardDetails);
        }}
        onFocus={(focusedField) => {
          console.log('focusField', focusedField);
        }}
        
      />
    );
  }

const css = StyleSheet.create({
  field:{
  
    
  }
})