import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const Footer = ({navigation}) => {

  return (
    <View
    style={{
      padding: 30,
      backgroundColor: "#fff",
      flexDirection: "row",
      justifyContent: "space-around"
    }}
    >
      <TouchableOpacity onPress={()=>navigation('home')}>
        <Icon name="home" size={30} color="#900" />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation('profile')}>
        <Icon name="user" size={30} color="#900" />
      </TouchableOpacity>
    </View>
  )
}

export default Footer