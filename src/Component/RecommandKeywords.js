import { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import network from '../Static/network';

const baseUrl = network();

export default function RecommandKeywords({recommendKeywords}) {
    
    const recommendations = [];
    const randomList = []
    let count = 0;
    // while(true) {
    //     if(count === 8) {
    //         break;
    //     }
    //     const tmp_keyword = recommendKeywords[Math.floor(Math.random() * 11 + 1)]
    //     if (!randomList.includes(tmp_keyword)) {
    //         randomList.push(tmp_keyword);
    //         count += 1;
    //     }
    // }
    console.log(randomList)
    for(let i = 0; i < 4; i++) {
        recommendations.push(
            <View key={i}>
                <View style={{ flexDirection: 'row', }}>
                    <View id={i * 2} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>{randomList[i * 2]}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: wp(10)}} />
                    <View id={i * 2 + 1} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>{randomList[i * 2 + 1]}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: hp(1.5)}}/>
            </View>
        );
    }
    return recommendations;
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
