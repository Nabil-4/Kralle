import {FlatList, SafeAreaView, RefreshControl, View, Text, ActivityIndicator, ScrollView} from 'react-native'
import {useContext} from 'react'
import {AuthContext} from '../../context/authContext'
import {useEffect, useState} from 'react'
import Msg from '../../components/message/msg'
import {Request} from '../../axios'


export default Message = () => {
    const {user} = useContext(AuthContext)
    const [listConversation, setListConversation] = useState(undefined)
    const [refreshing, setRefreshing] = useState(false)
    const [loading, setLoading] = useState(true)

    const getConversation = () => {
        Request.get(`/api/message/${user.id}`)
        .then((res) => {
            setListConversation(res.data)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err.response.data)
        })
    }

    const onRefresh = () => {
        setRefreshing(true)
        getConversation()
        setTimeout(() => {
          setRefreshing(false)
        }, 1000)
    }

    useEffect(() => {
        getConversation()
    }, [])

    if(loading) {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff"}}>
                <ActivityIndicator size="large" color={'#24CC83'}/>
            </View>
        )
    } else if(listConversation.length === 0) {
        return (
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>} contentContainerStyle={{flexGrow: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center"}}>
                <Text style={{fontSize: 18, color: 'grey'}}>Aucune conversation</Text>
            </ScrollView>
        )
    } else {
        return (
            <SafeAreaView style={{backgroundColor: "#fff", flex: 1}}>   
                <FlatList 
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
                    data={listConversation}
                    renderItem={({item}) => 
                        <Msg item={item} userId={user.id}/>
                    }
                    keyExtractor={item => item.sendAt}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        )
    }
}