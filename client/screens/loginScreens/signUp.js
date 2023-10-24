import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import {useContext, useState} from 'react'
import {AuthContext}from '../../context/authContext'
import {Ionicons} from '@expo/vector-icons'
import {Request} from '../../axios'


export default SignUp = () => {
    const {setUser} = useContext(AuthContext)
    const [err, setErr] = useState(null)
    const [eye, setEye] = useState(true)
    const [eyeLogo, setEyeLogo] = useState(true)
    const [errPseudo, setErrPseudo] = useState(null)
    const [errEmail, setErrEmail] = useState(null)
    const [errPassword, setErrPassword] = useState(null)
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
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

    const validEmail = () => {
        let mailFormat = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if(newUser.email.match(mailFormat)) {
            return true
        } else {
            return false
        }
    }
    const verifMail = validEmail()

    const validPassword = () => {
        let passwordFormat = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-_]).{8,32}$/
        if(newUser.password.match(passwordFormat)) {
            return true
        } else {
            return false
        }
    }
    const verifPassword = validPassword()


    const handleChange = (text, name) => {
        setNewUser({...newUser, [name]: text})
    }

    const handlePress = () => {
    if((newUser.username.length > 2) && verifMail && verifPassword) {
            Request.post("/api/register", newUser, {
                withCredentials: true
            })
                .then((res) => {
                    setUser(res.data)
                })
                .catch((err) => {
                    setErr(err.response.data)
                })
        } else {
            if(newUser.username.length < 3) {
                setErrPseudo('Le pseudo doit contenir minimum 3 caractères')
            } else setErrPseudo(null)

            if(!verifMail) {
                setErrEmail('Le format du mail est incorrect')
            } else setErrEmail(null)

            if(!verifPassword) {
                setErrPassword('Le format du mot de passe est incorrect')
            } else setErrPassword(null)
        } 
    }

    return (
        <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>
            <View style={styles.spaceBetween}>
                <Text style={styles.signUpTitle}>Créer un compte</Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder='Pseudo' onChangeText={text => handleChange(text, 'username')}></TextInput>
                {errPseudo && <Text style={{textAlign: 'center', color: 'red'}}>{errPseudo}</Text>}
                <TextInput style={styles.input} placeholder='Email' onChangeText={text => handleChange(text, 'email')}></TextInput>
                {errEmail && <Text style={{textAlign: 'center', color: 'red'}}>{errEmail}</Text>}
                <View style={styles.inputPassword} >
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
                {errPassword && <Text style={{textAlign: 'center', color: 'red'}}>{errPassword}</Text>}
                <Text style={{alignSelf: 'center', paddingHorizontal: 35, fontSize: 13, fontWeight: '500', color:"grey"}} >Le mot de passe doit contenir min 8 caractères dont une majuscule, une minuscule, un nombre et un caractères spécial</Text>
                {err && <Text style={{textAlign: 'center'}}>{err}</Text>}
            </View>
            <View style={styles.signUpButton}>
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => handlePress()}><Text style={styles.textButton}>Créer</Text></TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signUpTitle: {
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
    signUpButton: {
        fontSize: 20,
        backgroundColor: '#24CC83',
        borderRadius: 50,
        marginTop: 40,
        paddingVertical: 6,
        width: '30%',
        alignSelf: 'center'
    },
    textButton: {
        textAlign: 'center',
        fontSize: 25,
        color: "#fff"
    },
    goToSignUp: {
        marginRight: "5%",
        fontSize: 17,
        color: '#24CC83'
    }
})