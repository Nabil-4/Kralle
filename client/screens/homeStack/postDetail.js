import {View, Text, StyleSheet, Image, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Keyboard, FlatList, ScrollView, ActivityIndicator} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useContext, useState, useEffect} from 'react'
import {AuthContext} from '../../context/authContext'
import * as ImagePicker from 'expo-image-picker'
import {Ionicons} from '@expo/vector-icons'
import Moment from 'moment'
import UserProfil from '../../components/post/userProfil'
import Post from '../../components/post/post'
import AddFavoris from '../../components/post/addFavoris'
import Liked from '../../components/post/likes'
import {Request, baseURL} from '../../axios'

const {height, width} = Dimensions.get('window')

export default PostDetail = () => {
    const route = useRoute()
    const {params} = route
    const {post} = params
    const {user} = useContext(AuthContext)
    const otherProfil = post.username
    const [tmpCommentImg, setTmpCommentImg] = useState(null)
    const [inputFocus, setInputFocus] = useState(false)
    const [listComment, setListComment] = useState(undefined)
    const [loading, setLoading] = useState(true)

     const getComment = () => {
        Request.get(`/api/comment/${post.id}`)
            .then((res) => {
                setListComment(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }
    

    const resetInput = () => {
        setTmpCommentImg(null),
        setComment({comment: "", postedBy: user.id, postId: post.id})
        setInputFocus(false)
        Keyboard.dismiss()
        this.textInput.clear()
    }

    useEffect(() => {
        resetInput()
        getComment()
    }, [])

    const [comment, setComment] = useState({
        comment: "",
        postedBy: user.id,
        postId: post.id
    })

    const emptyInput = comment.comment.replace(/ /g, '')

    const handleChange = (text, name) => {
        setComment({...comment, [name]: text})
    }

    const getImage = async() => {
        const image = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
        })
        setInputFocus(true)
        setTmpCommentImg(image.uri)
    }

    const handlePress = () => {
        const formData = new FormData()
        if(tmpCommentImg) {
            formData.append('commentImage', {
                name: `${user.id}_${Date.now()}`,
                uri: tmpCommentImg,
                type: `image/${tmpCommentImg.split('.').pop()}`
            })
        }
       
        Object.keys(comment).forEach((key) => {
            formData.append(key, comment[key]);
        });


        Request.post("/api/comment", formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
            .then((res) => {
                resetInput()
                getComment()
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    
    return (    
        <SafeAreaView style={{flex: 1, position: 'relative',  backgroundColor: "#fff"}}>   
            <ScrollView>
                <View style={styles.postContainer}>  
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <UserProfil otherProfil={otherProfil} profilPicture={post.profilPicture}/>
                            <View style={{marginTop: 10}}>
                                <Text style={styles.usernameStyle}>{post.username}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{paddingRight: 10}}>
                            <Text>...</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={!post.img ? styles.textContainer : styles.textContainerWithImg}>
                        <View>
                            <Text style={{fontSize: 18, marginVertical: 5, marginLeft: post.img ? 5 : 0}}>{post.contain}</Text>
                            {post.img && <View style={{maxHeight: 320}}>
                            <Image style={styles.imagePost} source={{uri: `${baseURL}/uploads/posts/${post.img}`}}/>
                        </View>}
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={styles.postTimeStyle}>{Moment(post.createAt).format('hh:mm DD/MM/YY')}</Text>
                    </View>
                    
                </View>
                
                <View style={{flexDirection: 'row', justifyContent: 'center', paddingVertical: height*0.01, borderBottomWidth: 1, borderColor: '#c6ecd9', justifyContent: "space-around"}}>
                    <TouchableOpacity style={{flexDirection: 'row'}}>
                        <Ionicons name="md-chatbubble-ellipses-outline" size={22}/><Text style={{fontSize: 17, alignSelf: 'center'}}>{post.nbrOfComment !== 0 && post.nbrOfComment}</Text>
                    </TouchableOpacity>
                    <Liked postId={post.id}/>
                    <AddFavoris postId={post.id}/>
                    <TouchableOpacity>
                        <Ionicons name="md-share-social-outline" size={22}/>
                    </TouchableOpacity>
                </View>  
                {loading === true
                ? 
                <View style={{justifyContent: 'center', backgroundColor: "#fff", marginTop: 50}}>
                    <ActivityIndicator size="large" color={'#24CC83'}/>
                </View>
                : 
                <FlatList
                    data={listComment}
                    renderItem={({item}) => (
                        <Post post={item} loading={loading}/>
                    )}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                />} 
                <View style={{height: 60}}></View>
            </ScrollView>  
            <View style={!inputFocus ? styles.commentContainer : styles.commentContainerFocus}>
                {tmpCommentImg &&
                <Image style={{width: 75, height: 75, borderWidth: 2, borderColor: '#24CC83', padding: 2, marginBottom: 2}} source={{uri: tmpCommentImg}}/>}
                <TextInput ref={input => {this.textInput = input}} onFocus={() => setInputFocus(true)} onChangeText={text => handleChange(text, 'comment')} style={!inputFocus ? styles.commentInput : styles.commentInputFocus} multiline={true} maxLength={240} placeholder='Poster votre réponse'></TextInput>
                <View style={{justifyContent: 'center', flexDirection: 'row', marginTop: inputFocus && 5}}>
                    <TouchableOpacity onPress={() => getImage()} style={!inputFocus ? styles.commentButton : styles.commentButtonFocus}>
                        <Ionicons style={{textAlign: 'center'}} name="md-image-outline" size={25} color="#fff"/>
                    </TouchableOpacity>
                {inputFocus && 
                <TouchableOpacity onPress={() =>  emptyInput.length > 0 && handlePress()} style={!inputFocus ? styles.commentButton : emptyInput.length > 0 ? styles.commentButtonFocus : styles.commentButtonFocusEmptyInput }>
                    <Text style={{textAlign: 'center', color: "#fff", fontSize: 20}}>Commenter</Text>
                </TouchableOpacity>}  
                </View>
            </View>
     </SafeAreaView> 
    )
}

const styles = StyleSheet.create({
    postContainer: { 
        borderBottomWidth: 1, 
        borderColor: '#c6ecd9', 
        paddingBottom: 5,
        paddingTop: 5
    },
    textContainer: {
        flexDirection: 'column', 
        marginHorizontal: 13,
        marginBottom: 10,
        marginTop: 15
    },
    textContainerWithImg: {
        flexDirection: 'column', 
        marginHorizontal: 13,
        marginVertical: 10,
    },
    usernameStyle: {
        fontSize: 20, 
        fontWeight: '600'
    },
    postTimeStyle: {
        fontSize: 16, 
        fontWeight: '400',
        marginLeft: 10
    }, 
    commentInput: {
        paddingHorizontal: 10,
        borderRadius: 10, 
        borderWidth: 2,
        borderColor: '#24CC83', 
        width: width*0.84, 
        backgroundColor: "#fff"
    },
    commentInputFocus: {
        paddingHorizontal: 10,
        borderRadius: 10, 
        borderWidth: 2,
        borderColor: '#24CC83', 
        width: width*0.98, 
        backgroundColor: "#fff",
        alignSelf: 'center',
    },
    commentContainer: {
        position: 'absolute', 
        bottom: 0, 
        width: width*0.96, 
        marginBottom: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignSelf: 'center'
    },
    commentContainerFocus: {
        position: 'absolute', 
        bottom: 0, 
        width: width*0.96, 
        marginBottom: 1, 
        alignSelf: 'center',
    },
    commentButton: {
        padding: 8,
        backgroundColor: '#24CC83', 
        marginLeft: 1,
        borderRadius: 15,
        justifyContent: 'center',
    },
    commentButtonFocus: {
        padding: 5,
        backgroundColor: '#24CC83', 
        marginHorizontal: 5,
        borderRadius: 15,
        justifyContent: 'center',
        width: '45%',
        marginBottom: 1
    },
    commentButtonFocusEmptyInput: {
        padding: 5,
        backgroundColor: '#c6ecd9', 
        marginHorizontal: 5,
        borderRadius: 15,
        justifyContent: 'center',
        width: '45%',
        marginBottom: 1
    },
    imagePost: {
        width: '100%',
        height: 300, 
        borderRadius: 10  
    }
})