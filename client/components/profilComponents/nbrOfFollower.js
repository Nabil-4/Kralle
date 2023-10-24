import {TouchableOpacity, Text} from "react-native"
import {useEffect, useState} from "react"
import axios from "axios"
import {Request} from "../../axios"

export default NbrOfFollower = ({userId}) => {
    const [follower, setFollower] = useState(undefined)

    useEffect(() => {
        Request.get(`/api/follow/countFollower/${userId}`)
            .then((res) => {
                setFollower(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <TouchableOpacity>
            <Text style={{fontSize: 15, marginLeft: 10, paddingTop: 5}}>{follower && follower.nbrOfFollower} Abonnés</Text>
        </TouchableOpacity>
    )
}