import {View, FlatList, Text, TextInput, SafeAreaView, TouchableOpacity, StyleSheet, Keyboard, ActivityIndicator} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import {Ionicons} from '@expo/vector-icons'
import UserProfil from '../../components/post/userProfil'
import {Request} from '../../axios'


export default Conversation = () => {
    const route = useRoute()
    const {params} = route
    const {users} = params
    const [loading, setLoading] = useState(true)
    const [messageList, setMessageList] = useState(undefined)
    const [message, setMessage] = useState({
        message: "",
        msgFrom: users.userId,
        msgTo: users.otherUserId,
        relation: users.userId > users.otherUserId ? `${users.otherUserId}-${users.userId}` : `${users.userId}-${users.otherUserId}`
    })

    const emptyInput = message.message.replace(/ /g, '')

    const resetInput = () => {
        setMessage({message: "", msgFrom: users.userId, msgTo: users.otherUserId})
        Keyboard.dismiss()
        this.textInput.clear()
    }

    useEffect(() => {
        Request.get(`/api/message/${users.userId}/${users.otherUserId}`)
            .then((res) => {
                setMessageList(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    const handleChange = (text, name) => {
        setMessage({...message, [name]: text})
    }

    const sendMessage = () => {
        Request.post(`/api/message`, message)
            .then((res) => {
                resetInput()
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } else {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "#fff", position: 'relative'}}>
                <View>
                    <FlatList
                        style={{marginBottom: 45}}
                        data={messageList}
                        renderItem={({item}) => 
                            <View style={item.msgFrom === users.userId ? styles.msgContainerUser : styles.msgContainer}>
                                <UserProfil otherProfil={item.username} profilPicture={item.profilPicture}/>
                                <View style={{borderWidth: 1, borderRadius: 25, marginTop: 20}}>
                                    <Text style={{padding: 8}}>{item.contain}</Text>
                                </View>
                            </View>
                        }
                        showsVerticalScrollIndicator={false}
                        inverted={true}
                        keyExtractor={item => item.id}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <View style={{width: '88%'}}>
                        <TextInput ref={input => {this.textInput = input}} onChangeText={text => handleChange(text, 'message')} multiline={true} maxLength={240} style={styles.input}></TextInput>
                    </View> 
                    <TouchableOpacity onPress={() => emptyInput.length > 0 && sendMessage()} style={{justifyContent: 'center'}}>
                            <Ionicons name="send-outline" size={25} color="#fff" style={emptyInput.length > 0 ? styles.sendButton : styles.sendButtonEmptyInput}/>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
    )
    }

    
}

const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute', 
        bottom: 1, 
        left: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: "#fff"
    },
    input: {
        borderWidth: 2, 
        borderColor: '#24CC83', 
        borderRadius: 10, 
        paddingHorizontal: 10, 
        paddingVertical: 5
    },
    sendButton: {
        backgroundColor: "#24CC83", 
        paddingVertical: 7,
        paddingHorizontal: 10, 
        borderRadius: 10
    },
    sendButtonEmptyInput: {
        backgroundColor: "#c6ecd9", 
        paddingVertical: 7,
        paddingHorizontal: 10, 
        borderRadius: 10
    },
    msgContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 10,
    },
    msgContainerUser: {
        flexDirection: 'row-reverse', 
        alignItems: 'center', 
        marginBottom: 10,
        justifyContent: 'flex-start',
    }
})