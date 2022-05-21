import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    ActivityIndicator,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LoadingPage() {
    return(
        <View style={{flex: 1, backgroundColor: 'skyblue', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1}}></View>
            <View style={{flex: 5}}>
                <Image source={require('../../assets/fly_whale.png')} resizeMode='contain' style={{flex: 1, width: wp(50)}}/>
            </View>
            <View style={{flex: 2}}>
                <ActivityIndicator size="large" color='blue'/>
            </View>
            <View style={{flex: 3}}></View>
        </View>
    );
}