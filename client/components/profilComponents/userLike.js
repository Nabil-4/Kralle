import {View, FlatList, ActivityIndicator, RefreshControl, Text} from "react-native";
import {useState, useEffect} from 'react'
import Post from "../post/post";
import {Request} from "../../axios";

export default UserLike = ({userId}) => {
    const [postList, setPostList] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const getLike = () => {
        Request.get(`/api/likes/${userId}`)
            .then((res) => {
                setPostList(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }

    const onRefresh = () => {
        setRefreshing(true)
        getLike()
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
    }

    useEffect(() => {
        getLike()
    }, [])

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } else if(postList.length === 0) {
        return (
            <View style={{flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18, color: 'grey'}}>Aucun post liker</Text>
            </View>
        )
    } else {
         return (
            <View style={{backgroundColor: "#fff", flex: 1}}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    data={postList}
                    renderItem={({item}) => (
                        <Post post={item}/>
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                /> 
            </View>
        )
    } 
   
}