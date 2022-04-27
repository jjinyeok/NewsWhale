import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
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

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 마이페이지
// 1. 등록한 키워드 조회하기
// 2. 등록한 키워드 삭제하기
export default function MyPage({ navigation }) {

    const goToStartPage = async () => {
        navigation.navigate('Start');
    }
    const goToMainPage = () => {
        navigation.navigate('Main');
    }
    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords');
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToMainPage}>
                        <Icon name="doubleleft" size={wp(10)} color="skyblue"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1.5, alignItems: "center", justifyContent: "center",}}>
                <Image source={require('../../assets/fly_whale.png') } resizeMode="contain" style={{width: wp(30), opacity: 0.8 }}/>
            </View>
            <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center",}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2), }}>{}</Text>
                    <Text style={{fontFamily: 'MapoPeacefull',}}>뉴스웨일을 통해 뉴스를 구독하세요!</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <TouchableOpacity onPress={goToStartPage}>
                        <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull', borderBottomColor: 'black', borderBottomWidth: 1,}}>
                            로그아웃
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
            </View>
            <View style={{ flex: 3, alignItems: "center", justifyContent: "center", }}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: "center"}}>
                        <Keywords navigation={navigation}/>
                    </View>
                </ScrollView>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                <TouchableOpacity style={{
                    backgroundColor: 'skyblue', width: wp(80), height: wp(15), overflow: "hidden", borderRadius: 20, }} 
                    onPress={goToMainPage}
                >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>메인 페이지에서 뉴스보기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", }}>
                <TouchableOpacity style={{
                    backgroundColor: 'skyblue', width: wp(80), height: wp(15), overflow: "hidden", borderRadius: 20, }} 
                    onPress={goToAddKeywordsPage}
                >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    news: {
        backgroundColor: 'white', 
        width: wp(35), 
        height: hp(5),
        borderRadius: hp(20),
        overflow: 'hidden',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
