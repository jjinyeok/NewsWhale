import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    ScrollView,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/AntDesign';
import Footer from '../Component/Footer';

import LoadingPage from './LoadingPage';

// 로컬 저장소 (userId, token, clickKeyword)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 현재 페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

// 등록한 뉴스 나오기 (내부 Component)
import News from '../Component/News';

export default function DetailKeywordPage({ navigation }) {

    const isFocused = useIsFocused();

    const [clickKeyword, setClickKeyword] = useState('')

    const [token, setToken] = useState('');

    const [responseData, setResponseData] = useState({});
    console.log(responseData)

    console.log(token);
    console.log(clickKeyword)

    // 현재 페이지 사용여부 확인
    const [loading, setLoading] = useState(false);

    const goToMyPage = () => {
        navigation.navigate('My');
    }

    useEffect(() => {
        AsyncStorage.getItem('clickKeyword', (err, result) => {
            setToken(JSON.parse(result).token);
            setClickKeyword(JSON.parse(result).clickKeyword);
        });
        setLoading(false);
        axios.get(`${baseUrl}/article/keyword?keyword=${clickKeyword}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setResponseData(response.data);
            setLoading(true);
        }).catch((e)=>{
            console.log(e);
        });
    }, [isFocused, clickKeyword]);

    return (
        <View style={{flex: 1, }}>
            {loading ? (
            <View style={{flex: 1}}>
                
                <View style={{flex: 0.5}} />
                <View style={{flex: 1, justifyContent: 'center'}}>
                    <View style={{marginLeft: '5%'}}>
                        <TouchableOpacity onPress={goToMyPage}>
                            <Icon name='doubleleft' size={wp(10)} color='skyblue'/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{flex: 8, alignItems: 'center'}}>   
                    <View style={{flex: 3, borderRadius: 50, justifyContent: 'center', alignItems: 'center'}} size={hp(10)}>
                        <View style={{borderRadius: 200, backgroundColor: 'white', width: hp(20), height: hp(20), justifyContent: 'center', alignItems: 'center', borderColor: 'skyblue', borderWidth: 10}}>
                            <Text style={{fontSize: 20 , fontFamily: 'MapoPeacefull',}}>{clickKeyword}</Text>
                        </View>
                    </View>
                    <View style={{flex: 4.5, borderRadius: 20, backgroundColor: 'skyblue', width: wp(90)}}>
                        <View style={{flex: 1}}>
                            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                                <News navigation={navigation} responseData={responseData} setLoading={setLoading} />
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                
                <View style={{flex: 1}}>
                    <Footer navigation={navigation}/>
                </View>
            </View>
            ) :
            // 로딩 중
            <LoadingPage/>
            }
        </View>
    )

}
