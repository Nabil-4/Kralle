import {TouchableOpacity, View, Modal, Text, TextInput, Dimensions, StyleSheet, Image} from 'react-native'
import {useContext, useState, useEffect} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import * as ImagePicker from 'expo-image-picker'
import {FontAwesome, Entypo, Ionicons} from '@expo/vector-icons'
import {AuthContext} from '../context/authContext'
import Follow from '../screens/tobTabsScreens/follow'
import Recomendation from '../screens/tobTabsScreens/recomendation'
import {Request} from '../axios'

const TopTabs = createMaterialTopTabNavigator()
const {height, width} = Dimensions.get('window') 

export default TopTabGroup = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const {user} = useContext(AuthContext)
    const [tmpPostImg, setTmpPostImg] = useState(null)

    useEffect(() => {
        setTmpPostImg(null),
        setPost({post: "", postedBy: user.id})
    }, [isModalVisible])


    const [post, setPost] = useState({
        post: "",
        postedBy: user.id
    })

    const emptyInput = post.post.replace(/ /g, '')

    const handleChange = (text, name) => {
        setPost({...post, [name]: text})
    }

    const getImage = async() => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
        })
        setTmpPostImg(image.assets[0].uri)
    }

    const handlePress = () => {
        const formData = new FormData()
        if(tmpPostImg) {
            formData.append('postImage', {
                name: `${user.id}_${Date.now()}`,
                uri: tmpPostImg,
                type: `image/${tmpPostImg.split('.').pop()}`
            })
        }
       
        Object.keys(post).forEach((key) => {
            formData.append(key, post[key]);
        });


        Request.post("/api/post", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
            .then((res) => {
                setIsModalVisible(false)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    
    return (
        <View style={{flex: 1}}>
            <TopTabs.Navigator 
                screenOptions={{
                    tabBarStyle: {height: height*0.06},
                    tabBarActiveTintColor: '#24CC83',
                    tabBarLabelStyle: {fontWeight: '500'},
                    tabBarIndicatorStyle: {backgroundColor: '#24CC83'}
            }}>
                <TopTabs.Screen name='Recomendation' component={Recomendation}/>
                <TopTabs.Screen name='Follow' children={() => <Follow userId={user.id}/>}/>
            </TopTabs.Navigator>
            <View>
            <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.postButton}>
                <FontAwesome style={{alignSelf: 'center'}} name="pencil" size={36} color="#fff"/>
            </TouchableOpacity>
            </View>
            <Modal
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
                animationType='slide'
                onShow={() => this.textInput.focus()}>
                <View style={{flex: 1}}>
                    <View style={styles.modalHeaderContainer}>
                        <TouchableOpacity
                            onPress={() => {setIsModalVisible(false)}} 
                            style={{marginLeft: 15}}>
                            <Entypo name='cross' size={32}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => emptyInput.length > 0 && handlePress()} style={emptyInput.length > 0 ? styles.modalPostButton : styles.modalPostButtonEmptyInput}><Text style={{fontSize: 20, padding: 5, color: '#fff'}}>Poster</Text></TouchableOpacity>
                    </View>
                    <View>
                        <Image 
                            style={{width: 60, height: 60, borderRadius: 50, margin: 10}} 
                            source={{uri: `http://192.168.1.12:8080/uploads/users/${user.profilPicture}`}}/>
                    </View>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
                        <TextInput ref={(input) => this.textInput = input} maxLength={240} multiline={true} style={styles.modalPostInput} placeholder='Quoi de neuf ?' onChangeText={text => handleChange(text, 'post')}></TextInput>
                        <TouchableOpacity onPress={() => getImage()}>
                            <Ionicons style={{marginLeft: 5}} name='md-image-outline' size={30}/>
                        </TouchableOpacity>
                        
                    </View>    
                    {tmpPostImg && <View style={{margin: 20, position: 'relative', width: 75, height: 75,}}>
                                        <Image style={{width: 75, height: 75, borderWidth: 2, borderColor: '#24CC83', padding: 2}} source={{uri: tmpPostImg}}/>
                                        <TouchableOpacity onPress={() => setTmpPostImg(null)} style={{position: 'absolute', top: -8, right: -8}}>
                                            <Entypo name='circle-with-cross' size={24} color={'red'} style={{backgroundColor: "#fff", borderRadius: 25}}/>
                                        </TouchableOpacity>                          
                                   </View>}
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    postButton: {
        width: 65, 
        height: 65, 
        backgroundColor: '#24CC83', 
        position: 'absolute', 
        right: 10, 
        bottom: 12, 
        borderRadius: 50, 
        justifyContent: 'center'
    }, 
    modalHeaderContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-between',
      marginBottom: 20, 
      marginTop: 10, 
      alignItems: 'center'
    },
    modalPostButton: {
      marginRight: 15, 
      backgroundColor: "#24CC83", 
      borderRadius: 25
    },
    modalPostButtonEmptyInput: {
      marginRight: 15, 
      backgroundColor: "#c6ecd9", 
      borderRadius: 25
    },
    modalPostInput: {
      borderWidth: 0.5, 
      width: width*0.85, 
      borderColor: "lightgrey", 
      padding: 10, 
      borderRadius: 25,
      fontSize: 18
    }
})