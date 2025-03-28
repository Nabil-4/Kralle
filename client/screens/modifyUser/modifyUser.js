import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet} from "react-native"
import * as ImagePicker from 'expo-image-picker'
import {AuthContext} from '../../context/authContext'
import {Ionicons} from '@expo/vector-icons'
import {useState, useContext} from "react"
import {useNavigation} from "@react-navigation/native";
import {Request, baseURL} from "../../axios"


export default ModifyUser = () => {
    const {user, setUser} = useContext(AuthContext)
    const nav = useNavigation()
    const [err, setErr] = useState(false)
    const [userAreModify, setUserAreModify] = useState(false)
    const [usernameAndBio, setUsernameAndBio] = useState({
        id: user.id,
        username: user.username,
        bio: user.descriptif
    })

    const emptyInput = usernameAndBio.username.replace(/ /g, '')

    const handleChange = (text, name) => {
        setUsernameAndBio({...usernameAndBio, [name]: text})
        setUserAreModify(true)
    }

    const [bannerPicture, setBannerPicture] = useState(null)
    const getBannnerPicture = async() => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9]
        })
        setBannerPicture(image.assets[0].uri)
        setUserAreModify(true)
    }

    const [profilPicture, setProfilPicture] = useState(null)
    const getProfilPicture = async() => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1]
        })
        setProfilPicture(image.assets[0].uri)
        setUserAreModify(true)
    }

    const modifyUser = () => {
        if(userAreModify) {
            const formData = new FormData()

        if(bannerPicture) {
            formData.append('bannerPicture', {
                name: `bannerPicture_${user.id}`,
                uri: bannerPicture,
                type: `image/${bannerPicture.split('.').pop()}`
            })
        }

        if(profilPicture) {
            formData.append('profilPicture', {
                name: `profilPicture_${user.id}`,
                uri: profilPicture,
                type: `image/${profilPicture.split('.').pop()}`
            })
        }

        if((usernameAndBio['username'] !== user.username) || (usernameAndBio['bio'] !== user.descriptif) || bannerPicture || profilPicture) {
            Object.keys(usernameAndBio).forEach((key) => {
                formData.append(key, usernameAndBio[key])
            })
        }

        Request.post("/api/modifyUser", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
            .then((res) => {
                setUser(res.data)
                nav.goBack()
            })
            .catch((err) => {
                setErr(err.response.data)
            })
        }  
    }

    return (
        <View style={{backgroundColor: "#fff", flex: 1}}> 
            <View style={styles.bannerContainer}>
                <Image style={styles.bannerImg} source={{uri: bannerPicture ? bannerPicture : `${baseURL}/uploads/users/${user.bannerPicture}`}}/>
                <TouchableOpacity onPress={() => getBannnerPicture()} style={{position: 'absolute', top: '40%', left: '46%'}}>
                    <Ionicons name="images-outline" size={35}/>
                </TouchableOpacity>    
            </View>
            <View style={styles.profilContainer}>
                <Image style={styles.profilImg} source={{uri: profilPicture ? profilPicture : `${baseURL}/uploads/users/${user.profilPicture}`}}/>
                <TouchableOpacity onPress={() => getProfilPicture()} style={{position: 'absolute', top: '35%', left: '30%'}}>
                    <Ionicons name="images-outline" size={30}/>
                </TouchableOpacity> 
            </View> 
            {err && <Text style={{alignSelf: 'center'}}>{err}</Text>}
            <TextInput onChangeText={text => handleChange(text, 'username')} maxLength={30} placeholder="pseudo" style={styles.TextInput}>{user.username}</TextInput>
            <TextInput onChangeText={text => handleChange(text, 'bio')} maxLength={100} multiline={true} placeholder="Description" style={styles.TextInput}>{user.descriptif}</TextInput>
            <TouchableOpacity onPress={() => emptyInput.length > 2 && modifyUser()} style={emptyInput.length > 2 && userAreModify ? styles.saveButtonTrue : styles.saveButtonFalse}><Text style={{fontSize: 20, color: '#fff' }}>Enregistrer</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    bannerContainer: {
        width: '100%', 
        height: 150, 
        position: 'relative', 
        marginBottom: 20
    },
    bannerImg: {
        width: '100%', 
        height: 150, 
        opacity: 0.5
    },
    profilContainer: {
        width: 90, 
        height: 90, 
        position: 'relative', 
        marginBottom: 20, 
        alignSelf: 'center'
    },
    profilImg: {
        width: 90, 
        height: 90, 
        borderRadius: 50, 
        opacity: 0.5
    },
    TextInput: {
        borderWidth: 1, 
        borderRadius: 10, 
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        marginHorizontal: 25, 
        marginBottom: 20, 
        textAlign: 'center'
    },
    saveButtonTrue: {
        alignSelf: 'center', 
        borderWidth: 1, 
        padding: 7, 
        borderRadius: 25, 
        backgroundColor: '#24CC83'
    },
    saveButtonFalse: {
        alignSelf: 'center', 
        borderWidth: 1, 
        padding: 7, 
        borderRadius: 25, 
        backgroundColor: '#c6ecd9'
    }
})