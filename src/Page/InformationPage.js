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

import Footer from '../Component/Footer';

import medias from '../Static/media';
const media = medias();

export default function InformationPage({navigation}) {
    const articleMedia = [];
    for(let i = 0; i < 124; i++) {
        articleMedia.push(
            <View key={i} style={{height: hp(5), alignItems: 'center', flexDirection: 'row'}}>
                <View style={{flex: 0.5}}/>
                <View style={{flex: 1.5}}>
                    <Text style={styles.textStyle}>{media[i].name}</Text>
                </View>
                <View style={{flex: 0.5}}/>
                <View style={{flex: 4.5}}>
                <TouchableOpacity onPress={() => Linking.openURL(media[i].url)} style={{}}>
                    <Text style={styles.textStyle}>{media[i].url}</Text>
                </TouchableOpacity>
                </View>
                <View style={{flex: 0.5}}/>
                <View style={{flex: 3}}>
                    <Text style={styles.textStyle}>{media[i].number}</Text>
                </View>
                <View style={{flex: 0.5}}/>
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
                <Footer navigation={navigation}/>
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
