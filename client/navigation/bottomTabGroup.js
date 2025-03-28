import {TouchableOpacity, Image, StyleSheet} from 'react-native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useNavigation} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import TopTabGroup from './topTabGroup'
import Message from '../screens/tabScreens/message'
import Tendance from '../screens/tabScreens/tendance'
import {AuthContext} from '../context/authContext'
import {useContext} from 'react'
import {baseURL} from '../axios'



const Tab = createBottomTabNavigator()

export default BottomTabGroup = () => {
    const {user} = useContext(AuthContext)
    const nav = useNavigation()
    return (
        <Tab.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerLeft : () => <TouchableOpacity onPress={() => nav.openDrawer()}> 
                                        <Image 
                                            source={{uri: `${baseURL}/uploads/users/${user.profilPicture}`}} 
                                            style={styles.drawerButton}
                                        />
                                    </TouchableOpacity>
            }}>
            <Tab.Screen 
                name='Home' 
                component={TopTabGroup} 
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({focused}) => (
                        <Ionicons style={{paddingTop: 6}} name={focused ? "home" : "home-outline"} size={28} color="#24CC83"/>
                    )
                }}/>
            <Tab.Screen 
                name='Tendance' 
                component={Tendance} 
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({focused}) => ( 
                        <Ionicons style={{paddingTop: 6}} name={focused ? "md-search" : "md-search-outline"} size={30} color="#24CC83"/>
                    )
                }}/>
            <Tab.Screen 
                name='Message' 
                component={Message} 
                options={{
                    tabBarLabel: "",
                    tabBarIcon: ({focused}) => ( 
                        <Ionicons style={{paddingTop: 6}} name={focused ? "mail-sharp" : "mail-outline"} size={28} color="#24CC83"/>
                    )
                }}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    drawerButton: {
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        marginLeft: 14
    }
})