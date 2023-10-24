import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Welcome from '../screens/loginScreens/welcome'
import SignUp from '../screens/loginScreens/signUp'
import SignIn from '../screens/loginScreens/signIn'

const LoginStack = createNativeStackNavigator() 

export default LoginStackGroup = () => {
    const {navigate} = useNavigation()
    return (
        <LoginStack.Navigator 
            screenOptions={{
                headerTitleAlign: 'center'
            }}>
            <LoginStack.Screen name="Kralle" component={Welcome}/>
            <LoginStack.Screen 
                name="SignUp" 
                component={SignUp}
                options={{
                    headerRight: () => <TouchableOpacity onPress={() => navigate('SignIn')}><Text style={styles.goToSignUp}>Login</Text></TouchableOpacity>
                }}/>
            <LoginStack.Screen 
                name="SignIn"
                component={SignIn}
                options={{
                    headerRight: () => <TouchableOpacity onPress={() => navigate('SignUp')}><Text style={styles.goToSignUp}>SignUp</Text></TouchableOpacity>
                }}/>
        </LoginStack.Navigator>
    )
}

const styles = StyleSheet.create({
    goToSignUp: {
        marginRight: "5%",
        fontSize: 17,
        color: '#24CC83'
    }
})