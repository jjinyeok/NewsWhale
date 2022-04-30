import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    Alert
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/Feather';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 마이페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

export default function Keywords({navigation}) {

    // 현재 페이지 사용여부 확인
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

    useEffect(() => {
        axios.get(`${baseUrl}/keywords?userId=${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setKeywordCount(parseInt(response.data.count));
            setResponseKeywords(response.data.keywordName);
        }).catch((e) => {
            console.log(e)
        });
    }, [isFocused, token]);

    const keywords = [<View style={{height: hp(1.5)}} key={-1}/>];
    if (keywordCount === 0) {
        keywords.push(
            <View key={0} style={{flex: 1, height: hp(33.5), width: wp(100), alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>등록한 키워드가 없습니다! </Text>
                <Text>새로운 키워드를 등록해주세요!</Text>
            </View>
        )
    }

    else{
        for(let i = 0; i < parseInt(keywordCount / 2); i++) {
            keywords.push(
                <View key={i}>
                    <View style={{ flexDirection: 'row', height: hp(5)}}>
                        <View id={i * 2} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>{responseKeywords[i * 2]}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    '확인', 
                                    `정말 ${responseKeywords[i * 2]}를 삭제할까요?`,
                                    [{
                                        text: '취소',
                                        onPress: () => {
                                            navigation.navigate('My');
                                        }
                                    },
                                    {
                                        text: '삭제하기',
                                        onPress: async () => {
                                            await axios.delete(`${baseUrl}/keywords?userId=${String(userId)}&keywordName=${responseKeywords[i * 2]}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            setTimeout(() => {
                                                navigation.reset({
                                                    routes: [{
                                                        name: 'My',
                                                    }]
                                                });
                                            }, 500);
                                        }
                                    }]
                                );
                            }}>
                                <View style={styles.delete}>
                                    <Icon name="trash-2" size={hp(3)} color="white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: wp(10)}} />
                        <View id={i * 2 + 1} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>{responseKeywords[i * 2 + 1]}</Text>
                            </View>
                            <TouchableOpacity onPress={() => {
                                Alert.alert(
                                    '확인', 
                                    `정말 ${responseKeywords[i * 2 + 1]}를 삭제할까요?`,
                                    [{
                                        text: '취소',
                                        onPress: () => {
                                            navigation.navigate('My');
                                        }
                                    },
                                    {
                                        text: '삭제하기',
                                        onPress: () => {
                                            axios.delete(`${baseUrl}/keywords?userId=${String(userId)}&keywordName=${responseKeywords[i * 2 + 1]}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            setTimeout(() => {
                                                navigation.reset({
                                                    routes: [{
                                                        name: 'My',
                                                    }]
                                                });
                                            }, 500);
                                        }
                                    }]
                                );
                            }}>
                                <View style={styles.delete}>
                                    <Icon name="trash-2" size={hp(3)} color="white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: hp(1.5)}}/>
                </View>
            );
        }
        if (keywordCount % 2 == 1) {
            keywords.push(
                <View key={parseInt(keywordCount / 2)}>
                    <View style={{ flexDirection: 'row', }}>
                        <View id={keywordCount - 1} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>{responseKeywords[keywordCount - 1]}</Text>
                            </View>
                            <TouchableOpacity style={{flex: 1.5}} onPress={() => {
                                Alert.alert(
                                    '확인', 
                                    `정말 ${responseKeywords[keywordCount - 1]}를 삭제할까요?`,
                                    [{
                                        text: '취소',
                                        onPress: () => {
                                            navigation.navigate('My');
                                        }
                                    },
                                    {
                                        text: '삭제하기',
                                        onPress: () => {
                                            axios.delete(`${baseUrl}/keywords?userId=${String(userId)}&keywordName=${responseKeywords[keywordCount - 1]}`, {
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            setTimeout(() => {
                                                navigation.reset({
                                                    routes: [{
                                                        name: 'My',
                                                    }]
                                                });
                                            }, 500);
                                        }
                                    }]
                                );
                            }}>
                                <View style={styles.delete}>
                                    <Icon name="trash-2" size={hp(3)} color="white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{height: hp(1.5)}}/>
                </View>
            );
        }
    }
    return keywords;
}

const styles = StyleSheet.create({
    keyword: {
        backgroundColor: 'white', 
        width: wp(35), 
        height: hp(5),
        borderRadius: hp(20),
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    delete: {
        flex: 1, 
        backgroundColor: 'skyblue', 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: hp(5), 
        height: '100%', 
        borderRadius: hp(20),
    },
});
