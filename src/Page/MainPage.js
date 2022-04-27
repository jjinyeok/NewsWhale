import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
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

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 메인 페이지
// 1. 등록한 뉴스 나오기
export default function MainPage({ navigation }) {

    // 마이 페이지 이동
    const goToMyPage = () => {
        navigation.navigate("My");
    }

    return (
        <View style={{flex: 1, }}>
            <View style={{flex: 0.5, }}/>
            {/* 마이페이지 이동 아이콘 */}
            <View style={{flex: 1, flexDirection: 'row', alignItems: "center",}}>
                <TouchableOpacity style={styles.iconContainer} onPress={goToMyPage}>
                    <Icon name='home' size={wp(10)} color={'skyblue'}></Icon>
                </TouchableOpacity>
            </View>
            {/* 뉴스 리스트 컴포넌트 */}
            <View style={{flex: 8, alignItems: 'center', alignContent: 'center',}}>
                <ScrollView style={styles.newsArea} showsVerticalScrollIndicator={false}>
                    <News navigation={navigation}/>
                </ScrollView>
            </View>
            <View style={{flex: 0.5}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    newsArea: {
        flex: 1,
        backgroundColor: 'skyblue',
        height: hp(100),
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
