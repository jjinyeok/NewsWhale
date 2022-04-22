import { useState } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Keywords from '../Component/Keywords';

import Icon from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function MyPage({ navigation, route }) {

    const [token, setToken] = useState("");
    const [testString, setTestString] = useState("");

    AsyncStorage.getItem('token', (err, result) => {
        setToken(result);
        console.log(token)
    });

    axios.get('http://192.168.219.114:8080/test', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        setTestString(response.data)
        console.log(response.data);
    }).catch((e) => {
        console.log(e)
    })

    const goToStartPage = async () => {
        navigation.navigate('Start');
    }
    const goToMainPage = () => {
        navigation.navigate('Main')
    }
    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords')
    }

    return (
        <View style={{flex: 1}}>
        <View style={{flex: 0.5}}/>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginLeft: '5%'}}>
                <TouchableOpacity onPress={goToMainPage} style={{}}>
                    <Icon name="doubleleft" size={hp(5)} color="skyblue"/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex: 1.5, alignItems: "center", justifyContent: "center",}}>
            <Image source={require('../../assets/fly_whale.png') } resizeMode="contain" style={{width: wp(30), opacity: 0.8 }}/>
        </View>
        <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center",}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2), }}>{String(testString)}</Text>
                <Text style={{fontFamily: 'MapoPeacefull',}}>뉴스웨일을 통해 뉴스를 구독하세요!</Text>
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                <TouchableOpacity onPress={goToStartPage}>
                    <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull', borderBottomColor: 'black', borderBottomWidth: 1,}}>
                        로그아웃
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}/>
        </View>
        <View style={{ flex: 3.5, alignItems: "center", justifyContent: "center", }}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View style={{alignItems: "center"}}>
                    <Keywords/>
                </View>
            </ScrollView>
        </View>
        <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center", }}>
            <TouchableOpacity style={{
                backgroundColor: 'skyblue', width: wp(80), height: wp(15), overflow: "hidden", borderRadius: 20, }} 
                onPress={goToAddKeywordsPage}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{flex: 0.5}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    news: {
        backgroundColor: 'white', 
        width: wp(35), 
        height: hp(5),
        borderRadius: hp(20),
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
})

