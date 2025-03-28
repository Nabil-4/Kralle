import {View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from "react-native";
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Ionicons} from '@expo/vector-icons'
import {useNavigation, useRoute} from "@react-navigation/native";
import UserLike from '../../components/profilComponents/userLike'
import UserPost from '../../components/profilComponents/userPost'
import FollowButton from "../../components/profilComponents/followButton";
import NbrOfFollower from "../../components/profilComponents/nbrOfFollower";
import NbrOfFollow from "../../components/profilComponents/nbrOfFollow";
import MessageButton from "../../components/profilComponents/messageButton";
import {baseURL} from "../../axios"

const {height, width} = Dimensions.get('window')

export default OtherProfil = () => {
    const Tab = createMaterialTopTabNavigator()
    const route = useRoute()
    const {params} = route
    const {profil} = params
    const nav = useNavigation()

    return (
        <View style={{backgroundColor: "#fff", flex:1}}>   
            <View style={{height: height*0.30}}>
                <View style={{height: height*0.15, position: 'relative'}}>
                    <TouchableOpacity onPress={() => nav.goBack()} style={{position: 'absolute', top: height*0.04, left: width*0.03, zIndex:1}} >
                        <Ionicons name="arrow-back-circle-outline" size={30} color={"#fff"}/>
                    </TouchableOpacity>     
                    <Image style={{height: '100%'}} source={{uri:`${baseURL}/uploads/users/${profil.bannerPicture}`}}/>
                    <Image  
                        source={{uri: `${baseURL}/uploads/users/${profil.profilPicture}`}} 
                        style={styles.userImg} 
                    />
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <MessageButton profilId={profil.id}/>
                    <FollowButton profilId={profil.id}/>
                </View>
                <View style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 22}}>{profil.username}</Text>
                    <Text style={{fontSize: 15}}>{profil.descriptif}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <NbrOfFollower userId={profil.id}/>
                    <NbrOfFollow userId={profil.id}/>
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
                <Tab.Screen name="Post" children={() => <UserPost userId={profil.id} />}/>
                <Tab.Screen name="Like" children={() => <UserLike userId={profil.id}/>}/>
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