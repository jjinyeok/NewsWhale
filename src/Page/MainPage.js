import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/Feather';

// 등록한 뉴스 나오기 (내부 Component)
import News from '../Component/News';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 현재 페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

import LoadingPage from './LoadingPage';
import RecommandArticles from '../Component/RecommandArticles';

import Footer from '../Component/Footer';

// 메인 페이지
// 키워드와 매칭되는 뉴스 나오기
export default function MainPage({ navigation }) {

    // 현재 페이지 사용여부 확인
    const isFocused = useIsFocused();


    // token 받아오기
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    // 서버로부터 응답 받아오기
    const [responseData, setResponseData] = useState({});
    // console.log(responseData)

    // 로컬 저장소로부터 토근 가져오기
    AsyncStorage.getItem('token', (err, result) => {
        setUserId(JSON.parse(result).userId);
        setToken(JSON.parse(result).token);
    });

    const [loading, setLoading] = useState(false);

    // token을 받아오거나, 현재 페이지로 이동했을 때, responseData GET
    // responseData: 1. count (받아온 기사 개수), 2. newsList (받아온 기사 리스트)
    useEffect(() => {
        setLoading(false);
        axios.get(`${baseUrl}/article?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setResponseData(response.data)
            setLoading(true);
            // axios.get(`${baseUrl}/keywords?userId=${userId}`, {
            //     headers: {
            //     Authorization: `Bearer ${token}`,
            //     }
            // }).then((response) => {
            //     setResponseKeywords(response.data.keywordName);
            //     setLoading(true);
            // }).catch((e) => {
            //     console.log(e)
            // });
            // axios.get(`${baseUrl}/keywords?userId=${userId}`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     }
            // }).then((response) => {
            //     setResponseKeywords(response.data.keywordName);
            //     setLoading(true);
            // }).catch((e) => {
            //     console.log(e)
            // });
            // setResponseData(response.data);
            //setLoading(true);
        }).catch((e)=>{
            console.log(e);
        });
    }, [isFocused, token]);

    const count = Math.min(300, responseData.count);

    // 마이 페이지 이동
    const goToMyPage = async () => {
        await navigation.navigate("My");
        setLoading(false);
    }

    
    return (
        <View style={{flex: 1, }}>
            {loading ? (
                // 로딩 이후
                <View style={{flex: 1}}>
                    <View style={{flex: 0.5}}/>
                    {/* 마이페이지 이동 아이콘 */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center",}}>
                        <TouchableOpacity style={styles.iconContainer} onPress={goToMyPage}>
                            <Icon name='home' size={wp(10)} color={'skyblue'}></Icon>
                            <Text style={{color: '#00CCCC', fontSize: hp(1), fontFamily: 'MapoPeacefull', textAlign: 'center'}}>My Page</Text>
                        </TouchableOpacity>
                    </View>
                    {/* 뉴스 리스트 컴포넌트 */}
                    <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                        <RecommandArticles responseData={responseData}/>
                    </View>
                    <View style={{flex: 7.5, alignItems: 'center', alignContent: 'center'}}>
                        {/* <View style={{flex: 0.5, justifyContent: 'center'}}>
                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>현재 {count}개의 최신 뉴스가 등록되어 있습니다.</Text>
                        </View> */}
                        <View style={{flex: 1}}>
                            <ScrollView style={styles.newsArea} showsVerticalScrollIndicator={false}>
                                <News navigation={navigation} responseData={responseData} setLoading={setLoading} />
                            </ScrollView>
                        </View>
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
    );
}

const styles = StyleSheet.create({
    newsArea: {
        flex: 1,
        backgroundColor: 'skyblue',
        width: wp(90),
        borderRadius: 20,
        overflow: 'hidden',
    },
    iconContainer: {
        flex: 1, 
        alignItems: 'center', 
        marginLeft: '75%',
    },
});
