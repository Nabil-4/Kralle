import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default Welcome = () => {
    const {navigate} = useNavigation()
    return ( 
        <SafeAreaView style={styles.signUpPage}>
            <View>
                <View style={styles.spaceBetween}>
                    <Text style={styles.appName}>KRALLE</Text>
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => navigate('SignUp')}>
                        <Text style={[styles.buttonSign, styles.signUpButton]}>Créer un compte</Text>
                    </TouchableOpacity>
                </View> 
                <View style={{marginBottom: 100}}>
                    <Text>Vous avez déjà un compte ?</Text>
                    <TouchableOpacity onPress={() => navigate('SignIn')}>
                        <Text style={[styles.buttonSign, styles.signInButton]}>Connectez-vous</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    signUpPage: {
        flex: 1,
        alignItems: 'center' ,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    spaceBetween: {
        marginTop: 180,
        marginBottom: 300,
    },
    appName: {
        fontSize: 44,
        marginBottom: 10,
        textAlign: 'center',
    },
    buttonSign: {
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#24CC83',
        borderRadius: 50,
        marginTop: 5,
        color: '#000'
    },
    signUpButton: {
        paddingVertical: 10,
        width: '100%',
        alignItems: 'center'
    },
    signInButton: {
        padding: 8
    },
    textCenter: {
        textAlign: 'center'
    } 
})

