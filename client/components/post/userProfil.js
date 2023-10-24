import {TouchableOpacity, Image, StyleSheet} from "react-native"
import {useNavigation} from '@react-navigation/native'
import {useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useState, useEffect} from "react"
import {Request} from "../../axios"

export default UserProfil = ({otherProfil, profilPicture}) => {
    const {push} = useNavigation()
    const {user} = useContext(AuthContext)
    const isUser = user.username === otherProfil
    const [profil, setProfil] = useState(null)

    useEffect(() => {
        Request.get(`/api/otherProfil/${otherProfil}`)
            .then((res) => {
                setProfil(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <TouchableOpacity onPress={() => isUser ? push('Profil') : push('OtherProfil', {profil})} style={{padding: 8, height: 50}}>

            <Image source={{uri: `http://192.168.1.12:8080/uploads/users/${profilPicture}`}}
                style={styles.userImg}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    userImg: {
        width: 50, 
        height: 50, 
        borderRadius: 50
    }
})