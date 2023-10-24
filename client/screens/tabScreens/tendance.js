import {View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity, ActivityIndicator} from "react-native"
import {useState, useEffect} from "react"
import {useNavigation} from '@react-navigation/native'
import Post from '../../components/post/post'
import {Request} from "../../axios"


export default Tendance = () => {
    const {navigate} = useNavigation()
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [postList, setPostList] = useState(undefined)
    const [tendanceList, setTendanceList] = useState(undefined)

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
    }

    useEffect(() => {
        Request.get("/api/tendance/mostliked")
            .then((res) => {
                setPostList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })

            Request.get("/api/tendance")
            .then((res) => {
                setTendanceList(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } else {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} showsVerticalScrollIndicator={false} style={{backgroundColor: "#fff"}}>
                <View style={{justifyContent: "space-between"}}> 
                    <View>
                        <Text style={{fontSize: 28, padding: 8}}>Tendance</Text>
                        <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                            data={tendanceList}
                            renderItem={({item}) => 
                            <View>
                                {item.word.replace(/ /g, '').length > 0 && 
                                <TouchableOpacity onPress={() => navigate('TopTendance', {tendance : item.word})} style={{paddingBottom: 10}}>
                                    <Text style={{paddingLeft: 15, fontSize: 24}}>{item.word}</Text>
                                    <Text style={{paddingLeft: 15}}>{item.nbrPosts} posts</Text>
                                </TouchableOpacity>}
                            </View>  
                            }
                            keyExtractor={item => item.word}
                            scrollEnabled={false}
                        />
                    </View>
                    <Text style={styles.mostLikedTitle}>Most liked</Text>
                    <FlatList
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                        data={postList}
                        renderItem={({item}) => 
                            <Post post={item} loading={loading}/>
                        }
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                    />
                    </View>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    mostLikedTitle: {
        fontSize: 28, 
        padding: 10, 
        marginTop: 5
    }
})