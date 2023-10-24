import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import UserLike from '../../components/profilComponents/userLike'
import UserPost from '../../components/profilComponents/userPost'
import {AuthContext} from '../../context/authContext'
import {useContext} from 'react'
import {Ionicons, Octicons} from '@expo/vector-icons'
import {useNavigation} from "@react-navigation/native";
import NbrOfFollower from "../../components/profilComponents/nbrOfFollower";
import NbrOfFollow from "../../components/profilComponents/nbrOfFollow";


const {height, width} = Dimensions.get('window')

export default Profil = () => {
    const Tab = createMaterialTopTabNavigator()
    const {user} = useContext(AuthContext)
    const nav = useNavigation()
    const {navigate, replace} = useNavigation()

    return (
        <View style={{backgroundColor: "#fff", flex:1}}>      
            <View style={{height: height*0.30}}>
                <View style={{height: height*0.15, position: 'relative'}}>
                    <TouchableOpacity onPress={() => nav.goBack()} style={{position: 'absolute', top: height*0.04, left: width*0.03, zIndex:1}} >
                        <Ionicons name="arrow-back-circle-outline" size={30} color={"#fff"}/>
                    </TouchableOpacity>    
                    <TouchableOpacity onPress={() => replace('ModifyUser', {user})} style={{position: 'absolute', top: height*0.04, right: width*0.03, zIndex:1}} >
                        <Octicons name="pencil" size={24} color={"#fff"}/>
                    </TouchableOpacity>    
                    <Image style={{height: '100%'}} source={{uri:`http://192.168.1.12:8080/uploads/users/${user.bannerPicture}`}}/>
                    <Image  
                        source={{uri: `http://192.168.1.12:8080/uploads/users/${user.profilPicture}`}} 
                        style={styles.userImg} 
                    />
                </View>
                <View style={{alignItems: 'center', marginTop: 27}}>
                    <Text style={{fontSize: 22}}>{user.username}</Text>
                    <Text style={{fontSize: 15}}>{user.descriptif}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <NbrOfFollower userId={user.id}/>
                    <NbrOfFollow userId={user.id}/>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Tab.Navigator screenOptions={{
                    tabBarStyle: {height: height*0.06},
                    tabBarActiveTintColor: '#24CC83',
                    tabBarItemStyle: {marginTop: -6},
                    tabBarLabelStyle: {fontWeight: '500', fontSize: 17},
                    tabBarIndicatorStyle: {backgroundColor: '#24CC83'},
                }}>
                <Tab.Screen name="Post" children={() => <UserPost userId={user.id}/>}/>
                <Tab.Screen name="Like" children={() => <UserLike userId={user.id}/>}/>
                </Tab.Navigator>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userImg: {
        width: 90, 
        height: 90, 
        marginBottom: -30, 
        borderRadius: 50, 
        alignSelf: 'center', 
        borderWidth: 2, 
        borderColor: "#fff",
        position: 'absolute',
        top: height*0.075
    }
})