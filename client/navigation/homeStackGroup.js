import {createNativeStackNavigator} from '@react-navigation/native-stack'

import BottomTabGroup from './bottomTabGroup'
import PostDetail from '../screens/homeStack/postDetail'
import Profil from '../screens/drawerScreens/profil'
import Favoris from '../screens/drawerScreens/favoris'
import Settings from '../screens/drawerScreens/settings'
import ModifyUser from '../screens/modifyUser/modifyUser'
import OtherProfil from '../screens/homeStack/otherProfil'
import TopTendance from '../screens/tendance/toptendance'
import Conversation from '../screens/message/conversation'


const HomeStack = createNativeStackNavigator()

export default HomeStackGroup = () => {
    return (
        <HomeStack.Navigator screenOptions={{
            headerTitleAlign: 'center',
        }}>
            <HomeStack.Screen 
                name="TabGroup" 
                component={BottomTabGroup} 
                options={{
                 headerShown: false
            }}/>
            <HomeStack.Screen 
                name="PostDetail" 
                component={PostDetail} 
                options={{
                    headerTitle: 'Post'
                }}/>
            <HomeStack.Screen 
                name="Profil" 
                component={Profil} 
                options={{
                    headerShown: false
                }}/>
            <HomeStack.Screen 
                name="OtherProfil" 
                component={OtherProfil} 
                options={{
                    headerShown: false
                }}/>
            <HomeStack.Screen 
                name="ModifyUser" 
                component={ModifyUser} 
                options={{
                    headerTitle: 'Modifer profil'
                }}/>
            <HomeStack.Screen 
                name="TopTendance" 
                component={TopTendance} 
                options={{
                    headerTitle: 'Tendance'
                }}/>
            <HomeStack.Screen 
                name="Favoris" 
                component={Favoris} 
                options={{
                    headerTitle: 'Favoris'
                }}/>
            <HomeStack.Screen 
                name="Conversation" 
                component={Conversation} 
                options={{
                    headerTitle: 'Conversation'
                }}/>
            <HomeStack.Screen 
                name="Settings" 
                component={Settings} 
                options={{
                    headerTitle: 'Settings'
                }}/>
        </HomeStack.Navigator>
    )
}