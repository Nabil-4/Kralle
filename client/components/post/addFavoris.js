import {TouchableOpacity, Animated, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useContext, useState, useEffect, useRef} from 'react'
import {AuthContext} from '../../context/authContext'
import {Request} from "../../axios"

export default AddFavoris = ({postId}) =>  {
    const {user} = useContext(AuthContext)
    const [userFavoris, setUserFavoris] = useState(false) 
    const favorisAnimation = useRef(new Animated.Value(1)).current
  
    const favoris = {
        postId : postId,
        userId : user.id
    }

    const alreadyFavoris = () => {
        Request.get(`/api/favoris/${user.id}/${postId}`)
            .then((res) => {
                setUserFavoris(res.data)
            })
    }

    useEffect(() => {
        alreadyFavoris()
    }, [])

    const addFavoris = () => {
        Request.post('/api/favoris', favoris)
        if(userFavoris === true) {
            setUserFavoris(false)
        } else {
            setUserFavoris(true)
            Animated.timing(favorisAnimation, {
                toValue: 2,
                useNativeDriver: true,
            }).start()
            setTimeout(() => {
                Animated.timing(favorisAnimation, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start()
            }, 250)
        }
    }
    
    return (
        <TouchableOpacity onPress={() => addFavoris()}>
            <Animated.View style={{transform: [{scale: favorisAnimation}]}}>
                <Ionicons name={userFavoris ? "md-bookmark" :"md-bookmark-outline"} size={22} color={userFavoris ? "#24CC83" : "black"}/>
            </Animated.View>
        </TouchableOpacity>
    )
}