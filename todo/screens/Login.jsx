import { View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'

const Login = ({navigation}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const loginHandler = () =>{

  }
  return (
    <View
    style={{
      flex: 1,
      backgroundColor:"#fff",
      alignItems:"center",
      justifyContent:"center"
    }}
    >
      <Text style={{fontSize: 20,margin:20}}>Welcome</Text>
      <View style={{width:"70%"}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
        secureTextEntry
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />

        <Button disabled={!email|| !password} style={styles.btn} onPress={loginHandler}>
          <Text style={{color:"fff"}}>Login</Text>
        </Button>

        <Text style={{marginTop: 20}}>Or</Text>

        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={{
            color:"#900", height: 30 ,margin: 20
          }}>
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
      borderColor:"#b5b5b5",
      backgroundColor:"#fff",
      borderWidth: 1,
      padding: 10,
      paddingLeft: 15,
      borderRadius: 5,
      marginVertical: 15,
      fontSize:15
  },
  btn:{
    backgroundColor:"#900",
    padding: 5,
    width:"70%"
  }
})

export default Login