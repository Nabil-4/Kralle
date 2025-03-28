import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {Ionicons} from '@expo/vector-icons'
import Moment from 'moment'
import UserProfil from './userProfil'
import AddFavoris from './addFavoris'
import Liked from './likes'
import {baseURL} from "../../axios"


export default Post = ({post}) => {
    const {width} = Dimensions.get('window')
    const {push} = useNavigation()
    const otherProfil = post.username


    return (     
        <SafeAreaView>
            <TouchableOpacity onPress={() => push('PostDetail', {post})} style={styles.postContainer}>  
                <UserProfil otherProfil={otherProfil} profilPicture={post.profilPicture}/>
                <View style={styles.containContainer}>
                    <View style={{paddingTop: 5}}>
                        <Text style={styles.usernameStyle}>{post.username} <Text style={{fontWeight: '400'}}>-</Text> <Text style={styles.postTimeStyle}>{Moment(post.createAt).format('DD/MM/YY')}</Text></Text>
                    </View>  
                    <Text style={post.contain && styles.postText}>{post.contain}</Text>
                    {post.img && <View style={{maxHeight: 320}}>
                        <Image style={styles.imagePost} source={{uri: `${baseURL}/uploads/posts/${post.img}`}}/>
                    </View>}
                    <View style={{flexDirection: 'row', justifyContent: 'center', justifyContent: 'space-between'}}>
                        <TouchableOpacity onPress={() => push('PostDetail', {post})} style={{flexDirection: 'row'}}>
                           <Ionicons name="md-chatbubble-ellipses-outline" size={22}/><Text style={{fontSize: 17, marginLeft: 2, alignSelf: 'center'}}>{post.nbrOfComment !== 0 && post.nbrOfComment}</Text>
                        </TouchableOpacity>
                        <Liked postId={post.id}/>
                        <AddFavoris postId={post.id}/>
                        <TouchableOpacity>
                            <Ionicons name="md-share-social-outline" size={22}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingRight: 10}}><Text>...</Text></View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row', 
        borderBottomWidth: 1, 
        borderColor: '#c6ecd9', 
        paddingBottom: 5,
        paddingTop: 5,
    },
    containContainer: {
        flexDirection: 'column', 
        paddingLeft: 5, 
        paddingRight: 8, 
        flex: 1
    },
    usernameStyle: {
        fontSize: 20, 
        fontWeight: '600'
    },
    postTimeStyle: {
        fontSize: 13, 
        fontWeight: '400'
    },
    imagePost: {
        width: '100%',
        height: 300,
        borderRadius: 10, 
        marginBottom: 10
    },
    postText: {
        fontSize: 18, 
        marginVertical: 10 
    }
})