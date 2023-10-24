import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from "react-native";
import {AuthContext} from '../../context/authContext'
import {useContext} from 'react'
import {Ionicons} from '@expo/vector-icons'
import {Request} from "../../axios";

export default Settings = () => {
    const {setUser} = useContext(AuthContext)

    const logout = () => {
        Request.post('/api/logout')
            .then((res) => console.log(res.data))
            .catch((err) => console.log(err.response.data))
            setUser(null)
    }
    return (
        <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>  
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{margin: 10, fontSize: 18}}>Deconexion</Text>
            <TouchableOpacity onPress={() => logout()} style={{width: 25, height: 25, margin: 10}}>
                <Ionicons name="exit-outline" size={25} color={"red"} />
            </TouchableOpacity>
        </View>
            
        </SafeAreaView>
    )
}

