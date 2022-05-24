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

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default UserTendency = ({userTendency}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue', width: wp(90), borderRadius: 10}}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <FontAwesome5 name='handshake' size={hp(1.5)} /> 정치 {userTendency.politicsScore}
                    </Text>
                </View>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <FontAwesome name='money' size={hp(1.5)} /> 경제 {userTendency.economyScore}
                    </Text>
                </View>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <Ionicons name='people-outline' size={hp(1.5)} /> 사회 {userTendency.societyScore}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <MaterialIcons name='theaters' size={hp(1.5)} /> 문화 {userTendency.cultureScore}
                    </Text>
                </View>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <Ionicons name='earth' size={hp(1.5)} /> 국제 {userTendency.internationalScore}
                    </Text>
                </View>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <Fontisto name='compass' size={hp(1.5)} /> 지역 {userTendency.localScore}
                    </Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <FontAwesome name='soccer-ball-o' size={hp(1.5)} /> 스포츠 {userTendency.sportsScore}
                    </Text>
                </View>
                <View style={{ flex: 1, textAlign: 'center', alignItems: 'center' }}>
                    <Text style={{ width: wp(25), backgroundColor: 'white', textAlign: 'center', borderRadius: 20 }}>
                        <Ionicons name='flask' size={hp(1.5)} /> IT/과학 {userTendency.itScienceScore}
                    </Text>
                </View>
            </View>
        </View>
    )
}