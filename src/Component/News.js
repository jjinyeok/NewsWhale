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

// 현재 페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 키워드와 매칭되는 뉴스 반환 컴포넌트
export default function News({navigation}) {

    // 현재 페이지 사용여부 확인
    const isFocused = useIsFocused();

    // token 받아오기
    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');

    // 서버로부터 응답 받아오기
    const [responseData, setResponseData] = useState({});

    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords');
    }

    // 로컬 저장소로부터 토근 가져오기
    AsyncStorage.getItem('token', (err, result) => {
        setUserId(JSON.parse(result).userId);
        setToken(JSON.parse(result).token);
    });

    // token을 받아오거나, 현재 페이지로 이동했을 때, responseData GET
    // responseData: 1. count (받아온 뉴스 개수), 2. newsList (받아온 뉴스 리스트)
    useEffect(() => {
        axios.get(`${baseUrl}/news?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setResponseData(response.data);
        }).catch((e)=>{
            console.log(e);
        });
    }, [isFocused, token]);

    // 뉴스 기사로 이동 함수
    const sendNewsByURL = async (newsUrl) => {
        await Linking.openURL(newsUrl);
    }

    // 언론사로 이동 함수
    const sendMediaByURL = async (mediaUrl) => {
        await Linking.openURL(mediaUrl);

    }

    // 뉴스 리스트 (newArea 내부)
    const newsList = [<View key={-1} style={{height: hp(2)}}/>];
    
    // 키워드와 일치하는 뉴스가 없을 경우
    if (responseData.count === 0) {
        newsList.push(
            <View key={0} style={{alignItems: 'center', justifyContent: 'center', height: hp(75)}}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드와 일치하는 뉴스가 없어요!</Text>
                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드를 추가하시겠어요?</Text>
                <Text></Text>
                <TouchableOpacity style={styles.newsOffAddKeywordButton} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    // 키워드와 일치하는 뉴스가 있을 경우
    else {
        for(let i = 0; i < responseData.count; i++) {
            newsList.push(
                // 하나의 뉴스 for문으로 뉴스 리스트 생성
                <View key={i} style={styles.newsContainer}>
                    
                    {/* 언론사 구역 */}
                    <TouchableOpacity onPress={() => sendMediaByURL(responseData.newsList[i].mediaUrl)} style={{flex:3}}>
                        <View style={{flex: 3}}>
                            <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={styles.mediaContainer}>
                                    <Text style={{fontFamily: 'MapoPeacefull'}}>
                                        {responseData.newsList[i].newsMedia}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    
                    {/* 뉴스 구역 (제목, 기자, 키워드1, 키워드2, 키워드3) */}
                    <TouchableOpacity onPress={() => sendNewsByURL(responseData.newsList[i].newsUrl)} style={{flex:7}}>
                        <View style={{flex: 7,}}>
                            
                            {/* 제목 */}
                            <View style={styles.titleContainer}>
                                <Text style={{ fontSize: hp(2), fontFamily: 'MapoPeacefull'}}>
                                    {responseData.newsList[i].newsTitle}
                                </Text>
                            </View>
                            
                            {/* 기자 */}
                            <View style={styles.reporterContainer}>
                                <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>{responseData.newsList[i].newsReporter}</Text>
                            </View>
                            
                            {/* 키워드 1, 2, 3 */}
                            <View style={{flex: 2, flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>
                                            {responseData.newsList[i].keyword1}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>
                                            {responseData.newsList[i].keyword2}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        <Text style={{fontFamily: 'MapoPeacefull'}}>
                                            {responseData.newsList[i].keyword3}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        
        // 뉴스 리스트 마지막 키워드 추가하기 버튼 생성
        newsList.push(
            <View key={100} style={styles.addKeywordContainer}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>더 많은 뉴스를 찾아보고 싶으시다면?</Text>
                <TouchableOpacity style={styles.newsOnAddKeywordButton} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
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
    addKeywordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(10),
        marginLeft: wp(5), 
        marginBottom: hp(2),
        borderRadius: 20, 
        overflow: 'hidden',
    },
    newsOffAddKeywordButton: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(7), 
        overflow: "hidden", 
        borderRadius: 20,
    },
    newsOnAddKeywordButton: {
        backgroundColor: 'skyblue', 
        width: wp(70), 
        height: hp(5), 
        overflow: "hidden", 
        borderRadius: 20,
    },
});
