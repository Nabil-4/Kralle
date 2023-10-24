import {TouchableOpacity} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {useContext} from 'react'
import {AuthContext} from '../../context/authContext'

export default MessageButton = ({profilId}) => {
    const {push} = useNavigation()
    const {user} = useContext(AuthContext)

    const users = {
        userId : user.id,
        otherUserId: profilId
    }

    return (
        <TouchableOpacity onPress={() => push('Conversation', {users})}>
            <Ionicons name="mail-outline" size={25} style={{marginLeft: 10, paddingTop: 5}}></Ionicons>
        </TouchableOpacity>
    )
}