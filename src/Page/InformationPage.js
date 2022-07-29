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

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/AntDesign';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import articleUrls from '../Static/articleUrls';
const a = articleUrls();

export default function InformationPage({navigation}) {
    const articleMedia = [];
    const media_policy = async () => {
        await Linking.openURL('https://jjinyeok.tistory.com/5');
    }
    for(let i = 0; i < 125; i++) {
        articleMedia.push(
            <View key={i} style={{height: hp(3), alignItems: 'center'}}>
                <TouchableOpacity onPress={() => Linking.openURL(a[i].url)} style={{flexDirection: 'row',}}>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 2.5}}>
                        <Text style={styles.textStyle}>{a[i].name}</Text>
                    </View>
                    <View style={{flex: 6.5}}>
                        <Text style={styles.textStyle}>{a[i].url}</Text>
                    </View>
                    <View style={{flex: 0.5}}/>
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{flex: 1}}>
            {/* 메인페이지 이동 아이콘 */}
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Icon name='doubleleft' size={wp(10)} color='skyblue'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 7.5}}>
            <ScrollView style={{flex: 1}}>
                {articleMedia}
            </ScrollView>
            </View>
            <View style={{flex: 1}}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={media_policy}>
                <View style={{justifyContent: 'center', backgroundColor: 'skyblue', width: wp(80), height: hp(5), overflow: 'hidden', borderRadius: 20,}}>
                    <Text style={styles.buttonText}>자세히 보기</Text>
                </View>
            </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: 'MapoPeacefull', 
        textAlign: 'center'
    },
    buttonText: {
        fontFamily: 'MapoPeacefull', 
        textAlign: 'center',
        fontSize: 15, 
    },
    footerLargeTextStyle: {
        fontFamily: 'MapoPeacefull', 
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 15
    },
    footerSmallTextStyle: {
        fontFamily: 'MapoPeacefull', 
        textAlign: 'center', 
        textDecorationLine: 'underline', 
        color: 'darkblue', 
        fontSize: 10
    }
})
