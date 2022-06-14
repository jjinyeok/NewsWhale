import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

// 현재 페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

import axios from 'axios';
import network from '../Static/network';

const baseUrl = network();

const randomKeywordsExtract = (copyRecommendKeywords, count) => {
    var newnum = []
    for(let i = 0; i < count; i++){
        var movenum = copyRecommendKeywords.splice(Math.floor(Math.random() * copyRecommendKeywords.length),1)[0]
        newnum.push(movenum)
    }
    console.log(newnum)
    return newnum
}


export default function RecommandKeywords({navigation, recommendKeywords, userId, token}) {

    const recommendations = [];
    const count = Math.min(recommendKeywords.count, 8);
    const [loading, setLoading] = useState(false)

    // 현재 페이지 사용여부 확인
    const isFocused = useIsFocused();
    const [newnum, setNewnum] = useState([])

    const copyRecommendKeywords = Object.assign([], recommendKeywords.recommendKeywords)
    useEffect(() => {
        setNewnum(randomKeywordsExtract(copyRecommendKeywords, count))
    }, [isFocused])

    for(let i = 0; i < parseInt(count / 2); i++) {
        recommendations.push(
            <View key={i}>
                <View style={{ flexDirection: 'row', }}>
                    <View id={i * 2} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}
                            onPress={() => {
                                axios.post(`${baseUrl}/keywords`,
                                {
                                    userId: userId,
                                    keywordName: newnum[i * 2]
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                }).then((response) => {
                                    if(response.data.success) {
                                        navigation.navigate('My');
                                    } else {
                                        Alert.alert('경고', '중복된 키워드를 입력하였습니다.', [{text: '확인'}]);
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }}
                        >
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>{newnum[i * 2]}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: wp(10)}} />
                    <View id={i * 2 + 1} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}
                            onPress={() => {
                                axios.post(`${baseUrl}/keywords`,
                                {
                                    userId: userId,
                                    keywordName: newnum[i * 2 + 1]
                                },
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    }
                                }).then((response) => {
                                    if(response.data.success) {
                                        navigation.navigate('My');
                                    } else {
                                        Alert.alert('경고', '중복된 키워드를 입력하였습니다.', [{text: '확인'}]);
                                    }
                                }).catch((e)=>{
                                    console.log(e);
                                });
                            }}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>{newnum[i * 2 + 1]}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: hp(1.5)}}/>
            </View>
        );
    }
    return (
        <View style={{flex: 1}}>
            {recommendations}
        </View>
    );
}

const styles = StyleSheet.create({
    recommendations: {
        backgroundColor: 'skyblue', 
        width: wp(40), 
        height: hp(4.5),
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center'
    }
})
