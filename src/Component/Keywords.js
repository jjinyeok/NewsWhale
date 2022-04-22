import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet,
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

export default function Keywords() {

    const [token, setToken] = useState("");

    const keywords = [<View style={{height: hp(1.5)}} key={-1}/>];
    let keywordsCount = 0;
    let keywordsOutput = Math.min(100, keywordsCount);


    AsyncStorage.getItem('token', (err, result) => {
        setToken(result);
        console.log(token)
    });

    if (keywordsOutput === 0) {
        keywords.push(
            <View key={0} style={{flex: 1, height: hp(33.5), width: wp(100), alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>등록한 키워드가 없습니다! </Text>
                <Text>새로운 키워드를 등록해주세요!</Text>
            </View>
        )
    }

    else{
        for(let i = 0; i < parseInt(keywordsOutput / 2); i++) {
            keywords.push(
                <View key={i}>
                    <View style={{ flexDirection: 'row', height: hp(5)}}>
                        <View id={i * 2} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {i * 2 + 1}</Text>
                            </View>
                            <TouchableOpacity style={{}}>
                                <View style={styles.delete}>
                                    <Icon name="trash-2" size={hp(3)} color="white"/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: wp(10)}} />
                        <View id={i * 2 + 1} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {i * 2 + 2}</Text>
                            </View>
                            <TouchableOpacity style={{}}>
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
        if (keywordsOutput % 2 == 1) {
            keywords.push(
                <View key={parseInt(keywordsOutput / 2)}>
                    <View style={{ flexDirection: 'row', }}>
                        <View id={keywordsOutput - 1} style={styles.keyword}>
                            <View style={{width: wp(35) - hp(5)}}>
                                <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {keywordsOutput - 1 + 1}</Text>
                            </View>
                            <TouchableOpacity style={{flex: 1.5}}>
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
