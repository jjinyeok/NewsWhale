import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet,
    Alert
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/AntDesign';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 추천 키워드 조회하기 (내부 Component)
import RecommandKeywords from '../Component/RecommandKeywords';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 키워드 추가하기 페이지
// 1. 추천 키워드 조회하기
export default function AddKeywordsPage({ navigation }) {
    

    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [tokenGet, setTokenGet] = useState(false);
    const [responseKeywords, setResponseKeywords] = useState("");
    
    const [text, setText] = useState("");
    const goToMainPage = () => {
        navigation.navigate('Main')
    }
    const goToMyPage = () => {
        postKeyword();
    }

    useEffect(() => {
        AsyncStorage.getItem('token', (err, result) => {
            setUserId(JSON.parse(result).userId);
            setToken(JSON.parse(result).token);
            setTokenGet(true);
            //console.log(JSON.parse(result).token);
        });
    }, [])

    const postKeyword = () => {
        axios.post(`${baseUrl}/keywords`,
        {
            userId: userId,
            keywordName: text
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if(response.data.success) {
                setTimeout(() => {
                    navigation.navigate('My');
                }, 500 );
            } else {
                Alert.alert('경고', '중복된 키워드를 입력하였습니다.', [{text: '확인'}]);
            }
        })
    }

    return (
        <View style={{ flex: 1}}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToMainPage}>
                        <Icon name="doubleleft" size={hp(5)} color="skyblue"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 9}}>
                <View style={{flex: 2}}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <TextInput
                        style={{width: wp(80), height: hp(7), borderColor: 'black', borderWidth: 1, fontSize: 20, backgroundColor:'white',fontFamily: 'MapoPeacefull', paddingLeft: '5%',}}
                        onChangeText={setText}
                        value={text}
                        placeholder="검색어를 입력해주세요"
                        keyboardType="ascii-capable"
                    />
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <TouchableOpacity style={{
                        backgroundColor: 'skyblue', width: wp(80), height: hp(7), overflow: "hidden", borderRadius: 20, }} 
                        onPress={goToMyPage}
                    >
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>추가하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
                <View style={{flex: 5}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, fontFamily: 'MapoPeacefull'}}>추천 키워드</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <View style={{alignItems: "center"}}>
                            <RecommandKeywords/>
                        </View>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
                <View style={{flex: 3}}/>
            </View>
        </View>
    );
}
