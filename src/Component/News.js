import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Linking, 
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 마이페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native'

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

export default function News({navigation}) {

    const isFocused = useIsFocused();

    // token 받아오기
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    const [res, setRes] = useState({});

    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords');
    }

    AsyncStorage.getItem('token', (err, result) => {
        setUserId(JSON.parse(result).userId);
        setToken(JSON.parse(result).token);
    });

    //console.log(res.newsList[0]);

    useEffect( () => {
        // const tmpNews = []
        // let tmpCount = 0;
        axios.get(`${baseUrl}/news?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            console.log(response.data);
            setRes(response.data);
        }).catch((e)=>{
            console.log(e);
        });
    }, [isFocused, token]);

    // 기사로 이동 함수
    const sendNewsURL = async () => {        
        await Linking.openURL('https://n.news.naver.com/article/214/0001187231?cds=news_media_pc');
    }
    // 신문사로 이동 함수
    const sendNewsMedia = async () => {
        await Linking.openURL('https://imnews.imbc.com/pc_main.html');
    }

    // 뉴스 리스트 (newArea 내부)
    const newsList = [<View key={-1} style={{height: hp(2)}}/>];
    if (res.count === 0) {
        newsList.push(
            <View key={0} style={{alignItems: 'center', justifyContent: 'center', height: hp(75)}}>
                <Text>키워드와 일치하는 뉴스가 없어요!</Text>
                <Text>키워드를 추가하시겠어요?</Text>
                <Text></Text>
                <TouchableOpacity style={{
                    backgroundColor: 'white', width: wp(80), height: wp(15), overflow: "hidden", borderRadius: 20, }} 
                    onPress={goToAddKeywordsPage}
                >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    else {
        for(let i = 0; i < res.count; i++) {
            newsList.push(
                // 하나의 뉴스 리스트
                <View key={i} style={styles.newsContainer}>
                    {/* 언론사 구역 */}
                    <TouchableOpacity onPress={async () => {
                        await Linking.openURL(res.newsList[i].mediaUrl);
                    }} style={{flex:3}}>
                        <View style={{flex: 3}}>
                            <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={styles.mediaContainer}>
                                    <Text style={{fontFamily: 'MapoPeacefull'}}>
                                        {res.newsList[i].newsMedia}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    {/* 뉴스 구역 (제목, 기자, 키워드1, 키워드2, 키워드3) */}
                    <TouchableOpacity onPress={async () => {
                        await Linking.openURL(res.newsList[i].newsUrl);
                    }} style={{flex:7}}>
                        <View style={{flex: 7,}}>
                            <View style={styles.titleContainer}>
                                <Text style={{ fontSize: hp(2), fontFamily: 'MapoPeacefull'}}>
                                    {res.newsList[i].newsTitle}
                                </Text>
                            </View>
                            <View style={styles.reporterContainer}>
                                <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>{res.newsList[i].newsReporter}</Text>
                            </View>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>{res.newsList[i].keyword1}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>{res.newsList[i].keyword2}</Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>{res.newsList[i].keyword3}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    return newsList;
}


const styles = StyleSheet.create({
    newsContainer: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(15), 
        marginLeft: wp(5), 
        marginBottom: hp(2), 
        borderRadius: 20, 
        overflow: 'hidden',
        flexDirection: 'row',
    },
    mediaContainer: {
        backgroundColor: 'skyblue', 
        width: wp(15), 
        height: wp(15), 
        borderRadius: wp(15), 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 5, 
        justifyContent: 'center', 
        alignItems: 'center',
    },
    reporterContainer: {
        flex: 1, 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        opacity: 0.6, 
        marginLeft: '6%',
    },
    keywordContainer: {
        backgroundColor: 'skyblue', 
        width: '80%', 
        height: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
    },
});
