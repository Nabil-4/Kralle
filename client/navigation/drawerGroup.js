import {TouchableOpacity, Image, StyleSheet, View, Text, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {createDrawerNavigator, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer'
import {FontAwesome5} from '@expo/vector-icons'
import HomeStackGroup from './homeStackGroup'
import {AuthContext} from '../context/authContext'
import {useContext} from 'react'
import NbrOfFollow from '../components/profilComponents/nbrOfFollow'
import NbrOfFollower from '../components/profilComponents/nbrOfFollower'
import {baseURL} from '../axios'

const Drawer = createDrawerNavigator()
const {height} = Dimensions.get('window') 

export default DrawerGroup = () => {
    const {user, setUser} = useContext(AuthContext)
    const {navigate} = useNavigation()
    return (
        <Drawer.Navigator 
            screenOptions={{
                headerShown: false,
                swipeEdgeWidth: 0,
            }}
            drawerContent={(props) => {
                return (
                    <View style={{flex: 1, width: 'auto'}}>
                        <DrawerContentScrollView>
                                <View 
                                    style={styles.drawerContent}>
                                    <View style={styles.imgAndUsernameContainer}>
                                        <Image 
                                            source={{uri: `${baseURL}/uploads/users/${user.profilPicture}`}} 
                                            style={styles.userImg}
                                        />
                                        <Text style={{fontSize: 25}}>{user.username}</Text>
                                    </View>
                                    <View style={styles.followContainer}>
                                        <NbrOfFollow userId={user.id}/>
                                        <NbrOfFollower userId={user.id}/>
                                    </View>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => navigate('Profil')} style={{margin: 20, flexDirection: 'row', alignItems: 'center',}}>
                                        <FontAwesome5 name="user" size={22}/>
                                        <Text style={{fontSize: 22, marginLeft: 10}}>Profil</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigate('Favoris')} style={{margin: 20, flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome5 name="star" size={18}/>
                                        <Text style={{fontSize: 22, marginLeft: 10}}>Favoris</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigate('Settings')} style={{margin: 20, flexDirection: 'row', alignItems: 'center'}}>
                                        <FontAwesome5 name="cog" size={18}/>
                                        <Text style={{fontSize: 22, marginLeft: 10}}>Settings</Text>
                                    </TouchableOpacity>
                                </View>
                            <DrawerItemList {...props}/>
                        </DrawerContentScrollView>
                    </View>
                )
            }}>
            <Drawer.Screen name="HomeStackGroup" component={HomeStackGroup} options={{drawerItemStyle: {display: 'none'} }}/>      
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        height: 200,                                   
        backgroundColor: '#c6ecd9',
        justifyContent: "space-between",
        marginBottom: height*0.015,
    },
    imgAndUsernameContainer: {
        justifyContent: "flex-start", 
        alignItems: "center"
    },
    userImg: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginTop:  height*0.02, 
        borderWidth: 2, 
        borderColor: "#fff"  
    },
    followContainer: {
        flexDirection: "row", 
        marginBottom:  height*0.007, 
        justifyContent: "center", 
        justifyContent: "space-around"
    }
})