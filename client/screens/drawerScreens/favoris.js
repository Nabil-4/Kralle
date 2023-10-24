import {View, Text, SafeAreaView, FlatList, RefreshControl, ActivityIndicator} from "react-native";
import {useEffect, useState} from "react";
import {useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import Post from "../../components/post/post";
import {Request} from "../../axios";

export default Favoris = () => {
    const {user} = useContext(AuthContext)
    const [favList, setFavList] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
    }

    useEffect(() => {
        Request.get(`/api/favoris/${user.id}`)
            .then((res) => {
                setFavList(res.data)
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
    } else if(favList.length === 0) {
        return (
            <SafeAreaView style={{flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18, color: 'grey'}}>Aucun post favoris</Text>
            </SafeAreaView>
        )
    } else {
        return (
            <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>
                <FlatList
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    data={favList}
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
