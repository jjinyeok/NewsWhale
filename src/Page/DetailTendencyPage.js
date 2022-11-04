import React from 'react';
import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    StyleSheet, 
    Alert, 
    Image,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import AntDesign from 'react-native-vector-icons/AntDesign';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 추천 키워드 조회하기 (내부 Component)
import RecommandKeywords from '../Component/RecommandKeywords';

// 마이페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

import LoadingPage from './LoadingPage'

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network.js';
const baseUrl = network();

import Footer from '../Component/Footer';

// 키워드 추가하기 페이지
// 1. 추천 키워드 조회하기
export default function DetailTendencyPage({ navigation }) {

    const [userId, setUserId] = useState('');
    const [token, setToken] = useState('');
    const [mostKeywords, setMostKeywords] = useState({});

    const isFocused = useIsFocused();

    const PoliticsKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                    <FontAwesome5 name='handshake' size={hp(2)} /> 정치
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.politicsKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.politicsKeywords[0]}</Text>
                            : (mostKeywords.politicsKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.politicsKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.politicsKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.politicsKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.politicsKeywords[1]}</Text>
                            : (mostKeywords.politicsKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.politicsKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.politicsKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.politicsKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.politicsKeywords[2]}</Text>
                            : (mostKeywords.politicsKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.politicsKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.politicsKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }
    const EconomyKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <FontAwesome name='money' size={hp(2)} /> 경제 
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.economyKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.economyKeywords[0]}</Text>
                            : (mostKeywords.economyKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.economyKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.economyKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.economyKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.economyKeywords[1]}</Text>
                            : (mostKeywords.economyKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.economyKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.economyKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.economyKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.economyKeywords[2]}</Text>
                            : (mostKeywords.economyKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.economyKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.economyKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const SocietyKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <Ionicons name='people-outline' size={hp(2)} /> 사회
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.societyKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.societyKeywords[0]}</Text>
                            : (mostKeywords.societyKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.societyKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.societyKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.societyKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.societyKeywords[1]}</Text>
                            : (mostKeywords.societyKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.societyKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.societyKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.societyKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.societyKeywords[2]}</Text>
                            : (mostKeywords.societyKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.societyKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.societyKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const CultureKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <MaterialIcons name='theaters' size={hp(2)} /> 문화 
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.cultureKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.cultureKeywords[0]}</Text>
                            : (mostKeywords.cultureKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.cultureKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.cultureKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.cultureKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.cultureKeywords[1]}</Text>
                            : (mostKeywords.cultureKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.cultureKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.cultureKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.cultureKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.cultureKeywords[2]}</Text>
                            : (mostKeywords.cultureKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.cultureKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.cultureKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const InternationalKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <Ionicons name='earth' size={hp(2)} /> 국제
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.internationalKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.internationalKeywords[0]}</Text>
                            : (mostKeywords.internationalKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.internationalKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.internationalKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.internationalKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.internationalKeywords[1]}</Text>
                            : (mostKeywords.internationalKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.internationalKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.internationalKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.internationalKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.internationalKeywords[2]}</Text>
                            : (mostKeywords.internationalKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.internationalKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.internationalKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const LocalKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <Fontisto name='compass' size={hp(2)} /> 지역
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.localKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.localKeywords[0]}</Text>
                            : (mostKeywords.localKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.localKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.localKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.localKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.localKeywords[1]}</Text>
                            : (mostKeywords.localKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.localKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.localKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.localKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.localKeywords[2]}</Text>
                            : (mostKeywords.localKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.localKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.localKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const SportsKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <FontAwesome name='soccer-ball-o' size={hp(2)} /> 스포츠 
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.sportsKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.sportsKeywords[0]}</Text>
                            : (mostKeywords.sportsKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.sportsKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.sportsKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.sportsKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.sportsKeywords[1]}</Text>
                            : (mostKeywords.sportsKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.sportsKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.sportsKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.sportsKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.sportsKeywords[2]}</Text>
                            : (mostKeywords.sportsKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.sportsKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.sportsKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    const ItScienceKeywords = () => {
        return (
            <View style={{flex: 1, backgroundColor: 'skyblue', borderRadius: 20, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
                    <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>
                        <Ionicons name='flask' size={hp(2)} /> IT/과학 
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.itScienceKeywords[0].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.itScienceKeywords[0]}</Text>
                            : (mostKeywords.itScienceKeywords[0].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.itScienceKeywords[0]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.itScienceKeywords[0]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.itScienceKeywords[1].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.itScienceKeywords[1]}</Text>
                            : (mostKeywords.itScienceKeywords[1].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.itScienceKeywords[1]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.itScienceKeywords[1]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                    <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', width: wp(15), borderRadius: 20}}>
                        {(mostKeywords.itScienceKeywords[2].length > 6) 
                            ?<Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(0.75)}}>{mostKeywords.itScienceKeywords[2]}</Text>
                            : (mostKeywords.itScienceKeywords[2].length > 4) 
                                ? <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>{mostKeywords.itScienceKeywords[2]}</Text>
                                : <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>{mostKeywords.itScienceKeywords[2]}</Text>
                        }
                    </View>
                    <View style={{flex: 0.5}}/>
                </View>
                <View style={{flex: 0.5}}/>
            </View>
        )
    }

    useEffect(() => {
        AsyncStorage.getItem('token', (err, result) => {
            setUserId(JSON.parse(result).userId);
            setToken(JSON.parse(result).token);
        });
    }, []);

    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords')
    }

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(false);
        axios.get(`${baseUrl}/keyword/most`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            setMostKeywords(response.data)
            setLoading(true)
        }).catch((e) => {
            console.log(e)
        });
    }, [isFocused, token]);

    console.log(mostKeywords)

    return (
        <View style={{flex: 1}}>
        {loading ?
        <View style={{ flex: 1}}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToAddKeywordsPage}>
                        <AntDesign name='doubleleft' size={hp(5)} color='skyblue'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2)}}>분야별 가장 많이 언급된 키워드</Text>
            </View>
            <View style={{flex: 6.5, alignItems: 'center'}}>
                <View style={{flex: 1, width: wp(90), flexDirection: 'row'}}>
                    <PoliticsKeywords/>
                    <View style={{flex: 0.1}}/>
                    <EconomyKeywords/>
                    <View style={{flex: 0.1}}/>
                    <SocietyKeywords/>
                </View>
                <View style={{flex: 0.05}}/>
                <View style={{flex: 1, width: wp(90), flexDirection: 'row'}}>
                    <CultureKeywords/>
                    <View style={{flex: 0.1}}/>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/fly_whale.png') } resizeMode='contain' style={{width: wp(25), }}/>
                    </View>
                    <View style={{flex: 0.1}}/>
                    <InternationalKeywords/>
                </View>
                <View style={{flex: 0.05}}/>
                <View style={{flex: 1, width: wp(90), flexDirection: 'row'}}>
                    <LocalKeywords/>
                    <View style={{flex: 0.1}}/>
                    <SportsKeywords/>
                    <View style={{flex: 0.1}}/>
                    <ItScienceKeywords/>
                </View>
            </View>
            <View style={{flex: 1}}>
                <Footer navigation={navigation}/>
            </View>
        </View>
        : <LoadingPage/>}
        </View>
    )
}
