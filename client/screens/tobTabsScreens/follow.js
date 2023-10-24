import {SafeAreaView, FlatList, View, ActivityIndicator, RefreshControl, Text, ScrollView, } from 'react-native'
import {useState, useEffect} from 'react'
import Post from '../../components/post/post'
import {Request} from '../../axios'


export default Follow = ({userId}) => {
    const [loading, setLoading] = useState(true)
    const [postList, setPostList] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false)

    const getPost = () => {
        Request.get(`/api/post/follow/${userId}`)
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
        getPost()
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
    }


    useEffect(() => {
        getPost()
    }, [])

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } else if(postList.length === 0) {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} contentContainerStyle={{flexGrow: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18, color: 'grey'}}>Aucun post</Text>
            </ScrollView>
        )  
        } else {
            return (
                <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        data={postList}
                        renderItem={({item}) => (
                            <Post post={item}/>
                        )}
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    /> 
                </SafeAreaView>
            )
        } 
    }