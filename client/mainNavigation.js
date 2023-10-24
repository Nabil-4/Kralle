import {NavigationContainer} from '@react-navigation/native'
import DrawerGroup from './navigation/drawerGroup'
import {useState, useEffect} from 'react'
import {AuthContext} from './context/authContext'
import LoginStackGroup from './navigation/loginStackGroup'
import {ActivityIndicator, View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {MMKV} from 'react-native-mmkv'

export default MainNavigation = () => {
    // const storage = new MMKV()
    
    // const [user, setUser] = useState(JSON.parse(storage.getString('User')) || null)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     storage.set('User', JSON.stringify(user))
    // }, [user])

    useEffect(() => {
        const getUser = async () => {
            const userNotParse = await AsyncStorage.getItem('User')
            const user = JSON.parse(userNotParse)
            setUser(user)
            setLoading(false)
        }
        getUser()
    }, [])

    useEffect(() => {
        AsyncStorage.setItem('User', JSON.stringify(user))
    }, [user])

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } 
    const n = true
        
    return (
        <AuthContext.Provider value={{user, setUser}}>
            <NavigationContainer>
                {user !== null ? <DrawerGroup/> : <LoginStackGroup/>}  
            </NavigationContainer>
        </AuthContext.Provider>
    ) 
}
