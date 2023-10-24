import {TouchableOpacity, Animated, View} from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {useContext, useEffect, useState, useRef} from 'react'
import {AuthContext} from '../../context/authContext'
import {Request} from "../../axios"

export default FollowButton = ({profilId}) => {
    const {user} = useContext(AuthContext)
    const [userFollowed, setUserFollowed] = useState(false) 
    const followAnimation = useRef(new Animated.Value(1)).current

    const users = {
        userId : user.id,
        otherUserId: profilId
    }

    const alreadyFollow = () => {
        Request.get(`/api/follow/${user.id}/${profilId}`)
            .then((res) => {
                setUserFollowed(res.data)
            })
    }

    useEffect(() => {
        alreadyFollow()
    }, [])

    const follow = () => {
        Request.post('/api/follow', users)
        if(userFollowed === true) {
            setUserFollowed(false)
        } else {
            setUserFollowed(true)
            Animated.timing(followAnimation, {
                toValue: 1.7,
                useNativeDriver: true,
            }).start()
            setTimeout(() => {
                Animated.timing(followAnimation, {
                    toValue: 1,
                    useNativeDriver: true,
                }).start()
            }, 250)
        }
    }

    return (
        <TouchableOpacity onPress={() => follow()}>
            <Animated.View style={{transform: [{scale: followAnimation}]}}>
                <Ionicons name={userFollowed ? "person" : "person-add-outline"} size={24} color={userFollowed ? "#24CC83" : "black"} style={{marginRight: 10, paddingTop: 5}}></Ionicons>
            </Animated.View>
        </TouchableOpacity>
    )
}