import {View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity} from 'react-native'
import {useContext, useState} from 'react'
import {AuthContext} from '../../context/authContext'
import {Ionicons} from '@expo/vector-icons'
import {Request} from '../../axios'

export default SignIn = () => {
    const {setUser} = useContext(AuthContext)
    const [eye, setEye] = useState(true)
    const [eyeLogo, setEyeLogo] = useState(true)
    const [err, setErr] = useState(null)
    const [userConnect, setUserConnect] = useState({
        usernameOrEmail: "",
        password: ""
    })

    const revealPassword = () => {
        if(eye === true) {
            setEye(false)
            setEyeLogo(false)
        } else {
            setEye(true)
            setEyeLogo(true)
        }
    }

    const handleChange = (text, name) => {
        setUserConnect({...userConnect, [name]: text})
    }

    const handlePress = () => {
        Request.post("/api/login", userConnect, {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                setErr(err.response.data)
            })
    }
    
    return (
        <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>
            <View style={styles.spaceBetween}>
                <Text style={styles.signInTitle}>Se connecter</Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder='Pseudo ou email' onChangeText={text => handleChange(text, 'usernameOrEmail')}></TextInput>
                <View style={styles.inputPassword}>
                    <TextInput 
                        maxLength={32} 
                        secureTextEntry={eye} 
                        placeholder='Mot de passe' 
                        onChangeText={text => handleChange(text, 'password')}>
                    </TextInput>
                    <TouchableOpacity onPress={() => revealPassword()}>
                        <Ionicons name={eyeLogo ? 'eye-off-outline' : 'eye-outline'} size={25}/>
                    </TouchableOpacity>
                </View>
                {err && <Text style={{textAlign: 'center'}}>{err}</Text>}
            </View>
            <View style={styles.signInButton}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={handlePress}><Text style={styles.textButton}>Se connecter</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signInTitle: {
        fontSize: 42,
        marginBottom: 10,
        textAlign: 'center',
    },
    spaceBetween: {
        marginBottom: 40,
        marginTop: 50
    },
    input: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#24CC83", 
        width: "80%",
        alignSelf: 'center',
        marginTop: 20,
        padding: 5
    },
    inputPassword: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#24CC83", 
        width: "80%",
        alignSelf: 'center',
        marginTop: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    signInButton: {
        fontSize: 20,
        backgroundColor: '#24CC83',
        borderRadius: 50,
        marginTop: 40,
        color: '#000',
        paddingVertical: 6,
        width: '42%',
        alignSelf: 'center'
    },
    textButton: {
        textAlign: 'center',
        fontSize: 25
    },
    goToSignUp: {
        marginRight: "5%",
        fontSize: 17,
        color: '#24CC83'
    }
})