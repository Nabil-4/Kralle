import {ScrollView, FlatList} from 'react-native'
import {useRoute} from '@react-navigation/native'
import {useEffect, useState} from 'react'
import Post from '../../components/post/post'
import {Request} from '../../axios'


export default TopTendance = () => {
    const route = useRoute()
    const {params} = route
    const {tendance} = params
    const [tendanceList, setTendanceList] = useState(undefined)

    useEffect(() => {
        Request.get(`/api/tendance/${tendance}`)
            .then((res) => {
                setTendanceList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    }, [])

    return (
        <ScrollView style={{flex: 1, backgroundColor: "#fff"}}>
            <FlatList
                data={tendanceList}
                renderItem={({item}) => 
                    <Post post={item}/>
                }
                keyExtractor={item => item.id}
                scrollEnabled={false}
            />
        </ScrollView>
    )
}