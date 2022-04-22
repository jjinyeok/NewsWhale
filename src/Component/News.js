import React from 'react';
import { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Linking, 
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function News() {

    const [token, setToken] = useState("");

    AsyncStorage.getItem('token', (err, result) => {
        setToken(result);
    })

    const sendNewsURL = async () => {        
        // 기사로 이동 함수
        await Linking.openURL('https://n.news.naver.com/article/214/0001187231?cds=news_media_pc');
    }
    const sendNewsMedia = async () => {
        // 신문사로 이동 함수
        await Linking.openURL('https://imnews.imbc.com/pc_main.html');
    }
    const newList = [<View key={-1} style={{height: hp(2)}}/>];
    for(let i = 0; i < 100; i++) {
        newList.push(
            <View key={i} style={styles.news}>
                <TouchableOpacity onPress={sendNewsMedia} style={{flex:3}}>
                    <View style={{flex: 3}}>
                        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={styles.media}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>
                                    Test 언론사
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendNewsURL} style={{flex:7}}>
                    <View style={{flex: 7,}}>
                        <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: hp(2), fontFamily: 'MapoPeacefull'}}>
                                Test 뉴스 제목
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', opacity: 0.6, marginLeft: '6%'}}>
                            <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>홍길동 기자</Text>
                        </View>
                        <View style={{flex: 2, flexDirection: 'row'}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                <View style={styles.keyword}>
                                    <Text style={{fontFamily: 'MapoPeacefull'}}>키워드1</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                <View style={styles.keyword}>
                                    <Text style={{fontFamily: 'MapoPeacefull'}}>키워드2</Text>
                                </View>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                <View style={styles.keyword}>
                                    <Text style={{fontFamily: 'MapoPeacefull'}}>키워드3</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return newList;
}


const styles = StyleSheet.create({
    news: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(15), 
        marginLeft: wp(5), 
        marginBottom: hp(2), 
        borderRadius: 20, 
        overflow: 'hidden',
        flexDirection: 'row'
    },
    media: {
        backgroundColor: 'skyblue', 
        width: wp(15), 
        height: wp(15), 
        borderRadius: wp(15), 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    keyword: {
        backgroundColor: 'skyblue', 
        width: '80%', 
        height: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
    }
})