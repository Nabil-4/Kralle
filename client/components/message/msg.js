import {View, Text , Image, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import {useNavigation} from '@react-navigation/native'
import Moment from 'moment'
import UserProfil from '../post/userProfil'

export default Msg = ({item, userId}) => {
    const {push} = useNavigation()
    const users = {
        userId : userId,
        otherUserId: item.msgFrom != userId ? item.msgFrom : item.msgTo
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => push('Conversation', {users})} style={styles.msgContainer}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <UserProfil otherProfil={item.username} profilPicture={item.profilPicture}/>
                    <View>
                        <Text style={{marginTop: 15, fontSize: 17}}>{item.username}</Text>
                    </View>   
                </View>
                <View style={{padding: 5, alignItems: 'center'}}>
                    <Text>{Moment(item.senAt).format('DD/MM/YY')}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    msgContainer: {
        borderBottomWidth: 1, 
        borderColor: '#c6ecd9', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingBottom: 15
    }
})