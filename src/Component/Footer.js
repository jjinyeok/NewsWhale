import React from 'react';
import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    Image,
    Linking, 
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// font 받아오기 위한 lib
import * as Font from 'expo-font';

export default function Footer({navigation}) {

    const privacy_policy = async () => {
        await Linking.openURL('https://jjinyeok.tistory.com/4');
    }

    const media_policy = async () => {
        await Linking.openURL('https://jjinyeok.tistory.com/5');
    }

    // 정보 페이지 이동
    const goToInformationPage = () => {
        navigation.navigate('Information')
    }

    return (
    <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
        <Text style={styles.footerLargeTextStyle}>Developer email : fun2314@gmail.com</Text>
        <TouchableOpacity onPress={privacy_policy}>
            <Text style={styles.footerSmallTextStyle}>news whale applicatioin privacy policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goToInformationPage}>
            <Text style={styles.footerSmallTextStyle}>ownership information about the news publisher and its contributors</Text>
        </TouchableOpacity>
        <View style={{flex: 0.5}}/>
    </View>
    );
}

const styles = StyleSheet.create({
    footerLargeTextStyle: {
        //fontFamily: 'MapoPeacefull', 
        textAlign: 'center', 
        color: 'black', 
        fontWeight: 'bold',
        fontSize: 15
    },
    footerSmallTextStyle: {
        //fontFamily: 'MapoPeacefull', 
        textAlign: 'center', 
        textDecorationLine: 'underline', 
        color: 'darkblue', 
        fontSize: 10
    }
})
