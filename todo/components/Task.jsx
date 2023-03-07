import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Checkbox } from 'react-native-paper'
import Icon from 'react-native-vector-icons/AntDesign'

const Task = ({title,description,status,taskId}) => {
    const [completed, setCompleted] = useState(status)
    const handleCheck = () =>{
        setCompleted(!completed)
    }

    const deleteHandler = () =>{
        console.log("test");
    }
  return (
    <View style={{
        padding:10,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-evenly"
    }}>
        <View style={{width:"70%"}}>
            <Text style={{fontSize: 20, marginVertical: 7, color:"#900"}}>
                {title}
            </Text>
            <Text style={{color:"#4a4a4a"}}>
                {description}
            </Text>
        </View>
      <Checkbox status={completed ? "checked": "unchecked"} color="#474747" onPress={handleCheck}/>
      <Icon onPress={deleteHandler} name="delete" color='#fff' size={20} style={{backgroundColor:"#900",padding:10,borderRadius:100}}/>
    </View>
  )
}

export default Task