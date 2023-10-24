import {TouchableOpacity, Text} from "react-native"
import {useEffect, useState} from "react"
import {Request} from "../../axios"

export default NbrOfFollow = ({userId}) => {
    const [follow, setFollow] = useState(undefined)

    useEffect(() => {
        Request.get(`/api/follow/countFollow/${userId}`)
            .then((res) => {
                setFollow(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <TouchableOpacity>
            <Text style={{fontSize: 15, marginRight: 10, paddingTop: 5}}>{follow && follow.nbrOfFollow} Abonnements</Text>
        </TouchableOpacity>
    )
}