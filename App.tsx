import { StyleSheet, Text, View } from 'react-native'
import React from 'react' 
import * as Yup from 'yup' 

const passwordId = Yup.object().shape({
  passwordLength : Yup.number().min(4,"Should be at least 4 characters").max(12,"Should be at least 4 characters").required("Please provide the password length")
})

export default function App() {
  return (
    <View>
      <Text>App</Text>
    </View>
  )
}

const styles = StyleSheet.create({})
