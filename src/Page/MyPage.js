import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/AntDesign';

// 등록한 키워드 조회하기 (내부 Component)
import Keywords from '../Component/Keywords';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 마이페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 마이페이지
// 등록한 키워드 조회하기
// 등록한 키워드 삭제하기
export default function MyPage({ navigation }) {

    // To-do: 로그아웃 기능 구현해야함
    const goToStartPage = async () => {
        navigation.navigate('Start');
    }
    const goToMainPage = () => {
        navigation.navigate('Main');
    }
    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords');
    }

    const privacy_policy = async () => {
        await Linking.openURL('https://jjinyeok.tistory.com/4');
    }

    const media_policy = async () => {
        await Linking.openURL('https://jjinyeok.tistory.com/5');
    }

    const [loading, setLoading] = useState(false);

    const isFocused = useIsFocused();

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    
    // 로컬 저장소로부터 토근 가져오기
    AsyncStorage.getItem('token', (err, result) => {
        setUserId(JSON.parse(result).userId);
        setToken(JSON.parse(result).token);
    });

    const [responseKeywords, setResponseKeywords] = useState([]);
    const [keywordCount, setKeywordCount] = useState(0);
    const [afterDelete, setAfterDelete] = useState(0);

    useEffect(() => {
        setLoading(false);
        axios.get(`${baseUrl}/keywords?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setKeywordCount(parseInt(response.data.count));
            setResponseKeywords(response.data.keywordName);
            setLoading(true);
        }).catch((e) => {
            console.log(e)
        });
    }, [isFocused, token, afterDelete]);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}/>
            
            {/* 메인페이지 이동 아이콘 */}
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToMainPage}>
                        <Icon name='doubleleft' size={wp(10)} color='skyblue'/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* 뉴스웨일 로고 이미지 */}
            <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/fly_whale.png') } resizeMode='contain' style={{width: wp(30), opacity: 0.8 }}/>
            </View>
            
            {/* 코멘트 */}
            <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                
                {/* 코멘트 */}
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.commentText}>뉴스웨일을 통해 뉴스를 구독하세요!</Text>
                </View>
                
                {/* 로그아웃 */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={goToStartPage}>
                        <Text style={styles.signOutText}>
                            로그아웃
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
            </View>
            
            {/* 등록된 키워드 리스트 컴포넌트 */}
            <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center'}}>
                        {loading ? 
                        <Keywords 
                            navigation={navigation} 
                            setLoading={setLoading} 
                            responseKeywords={responseKeywords} 
                            keywordCount={keywordCount}
                            userId={userId}
                            token={token}
                            afterDelete={afterDelete}
                            setAfterDelete={setAfterDelete}/> :
                        <View style={{flex: 1}}>
                            <Text style={{fontFamily: 'MapoPeacefull', marginTop: hp(10)}}>로딩 중...</Text>
                            <ActivityIndicator size="large" color='blue'/>
                        </View>}
                    </View>
                </ScrollView>
            </View>
            
            {/* 버튼1: 메인 페이지에서 뉴스보기 */}
            {loading ? 
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={goToMainPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>메인 페이지에서 뉴스보기</Text>
                    </View>
                </TouchableOpacity>
            </View> :
            <View style={{flex: 1, }}>
                
            </View>
            }
            
            {/* 버튼2: 키워드 추가하기 */}
            {loading ? 
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View> :
            <View style={{flex: 1, }}>
                
            </View>
            }
            <View style={{flex: 0.5, alignItems: 'center', justifyContent:'center'}}>
                <Text style={{fontWeight: 'bold'}}>Developer email : fun2314@gmail.com</Text>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 0.5}}/>
                    <TouchableOpacity onPress={privacy_policy} style={{flex: 1}}>
                        <Text style={{textAlign: 'center', textDecorationLine: 'underline', color: 'darkblue'}}>개인정보처리방침</Text>
                    </TouchableOpacity>
                    {/* <View style={{flex: 0.1}}/> */}
                    <TouchableOpacity onPress={media_policy} style={{flex: 1}}>
                        <Text style={{textAlign: 'center', textDecorationLine: 'underline', color: 'darkblue'}}>언론사별 URL</Text>
                    </TouchableOpacity>
                    <View style={{flex: 0.5}}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'skyblue', 
        width: wp(80), 
        height: hp(7), 
        overflow: 'hidden', 
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center', 
        fontSize: 24, 
        fontFamily: 'MapoPeacefull',
    },
    commentText: {
        fontFamily: 'MapoPeacefull', 
        fontSize: hp(2),
    }, 
    signOutText: {
        textAlign: 'center', 
        fontFamily: 'MapoPeacefull', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
    },
});
