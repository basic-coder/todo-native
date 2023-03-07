import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Footer from './components/Footer'
import Profile from './screens/Profile'
import Register from './screens/Register'
import Camera from './screens/Camera'
import { View } from 'react-native'

const Stack = createNativeStackNavigator()

const Main = () => {
  return (
    <View style={{width: "100%"}}>
    <NavigationContainer>
        <Stack.Navigator initialRouteName='home'>
            <Stack.Screen name="home" component={Home} options={{headerShown: false}}/>
            <Stack.Screen name="login" component={Login} options={{headerShown: false}}/>
            <Stack.Screen name="profile" component={Profile} options={{headerShown: false}}/>
            <Stack.Screen name="register" component={Register} options={{headerShown: false}}/>
            <Stack.Screen name="camera" component={Camera} options={{headerShown: false}}/>
        </Stack.Navigator>
        <Footer />
    </NavigationContainer>
    </View>
  )
}



export default Main