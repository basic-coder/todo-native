import { View, Text, SafeAreaView, TextInput, Platform,StatusBar,StyleSheet, Touchable,ScrollView, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import Task from '../components/Task'
import Icon from 'react-native-vector-icons/Entypo'
import {Dialog,Button} from 'react-native-paper'

const Home = () => {
    const [task, setTask] = useState()

    const [openDailog, setOpenDailog] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const tasks = [{
        title: "Sample",description:"Sample description",status: true,taskId: 1
    }]

    const addTaskHandler = () =>{
        
    }
  return (
    <>
    <View style={{
        backgroundColor: "#fff", 
        flex: 1, 
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight  : 0
    }}>
        <ScrollView >
        <SafeAreaView>
            <Text style={styles.heading}>All Task </Text>

            {tasks.map((item,index)=>(
                <Task key={index} title={item.title} description={item.description} status={item.status} taskId={item.taskId} />
            ))}

            <TouchableOpacity style={styles.addBtn} onPress={()=>setOpenDailog(!openDailog)} >
                <Text>
                    <Icon name='add-to-list' size={20} color="#900" />
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
        </ScrollView>
    </View>
    <Dialog visible={openDailog} onDismiss={()=>setOpenDailog(!openDailog)}>
        <Dialog.Content>
            <TextInput style={styles.input} value={title} onChangeText={()=>setTitle(e.target.value)} placeholder="Title" />
            <TextInput style={styles.input} value={description} onChangeText={()=>setDescription(e.target.value)} placeholder="description" />
            <View style={{flexDirection:"row", alignItems:"center"}}>
                <TouchableOpacity>
                    <Text onPress={()=>setOpenDailog(!openDailog)}>
                        Cancel
                    </Text>
                    <Button color='#900' onPress={addTaskHandler}>
                        ADD
                    </Button>
                </TouchableOpacity>
            </View>
        </Dialog.Content>
    </Dialog>
    </>
  )
}

const styles = StyleSheet.create({
    heading:{
        fontSize: 28, 
        textAlign: "center",
        marginTop:25,
        marginBottom:20,
        color:"#fff",
        backgroundColor:"#d7d7d7"
    },
    addBtn:{
        backgroundColor:"#fff",
        width:150,
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 100,
        alignSelf: "center",
        marginVertical: 20,
        elevation: 5
    },
    input:{
        borderColor:"#b5b5b5",
        backgroundColor:"#fff",
        borderWidth: 1,
        padding: 10,
        paddingLeft: 15,
        borderRadius: 1,
        marginVertical: 15,
        fontSize:15
    }
})

export default Home