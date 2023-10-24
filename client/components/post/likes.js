import {TouchableOpacity, Text, Animated, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useContext, useEffect, useState, useRef} from 'react'
import {AuthContext} from '../../context/authContext'
import {Request} from '../../axios'

export default Liked = ({postId}) =>  {
    const {user} = useContext(AuthContext)
    const [userLiked, setUserLiked] = useState(false) 
    const [nbrOfLike, setNbrOfLike] = useState(0)
    const likeAnimation = useRef(new Animated.Value(1)).current
  
    const like = {
        postId : postId,
        userId : user.id
    }

    const alreadyLiked = () => {
        Request.get(`/api/likes/${user.id}/${postId}`)
            .then((res) => {
                setUserLiked(res.data.liked)
                setNbrOfLike(res.data.nbrOfLike)
            })
    }

    useEffect(() => {
        alreadyLiked()
    }, [])

    const Liked = () => {
        Request.post('/api/likes', like)
        if(userLiked === true) {
            setUserLiked(false)
            setNbrOfLike(nbrOfLike - 1)
        } else {
            setUserLiked(true)
            Animated.timing(likeAnimation, {
                toValue: 2,
                useNativeDriver: true,
            }).start()
            setTimeout(() => {
                Animated.timing(likeAnimation, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start()
            }, 250)
            setNbrOfLike(nbrOfLike + 1)
        }
    }
    
    return (
        <TouchableOpacity onPress={() => Liked()} style={{flexDirection: 'row'}}>
            <Animated.View style={{transform: [{scale: likeAnimation}]}} >
                <Ionicons name={userLiked ? "md-heart-sharp" : "md-heart-outline"}  size={22} color={userLiked ? "red" : "black"}/>
            </Animated.View>
            <Text style={{fontSize: 17, alignSelf: 'center'}}>{nbrOfLike !== 0 && nbrOfLike}</Text>
        </TouchableOpacity>
    )
}