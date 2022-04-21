import { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
    ImageBackground,
    Alert
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


export default function MyPage({ navigation, route }) {
    const keywords = [<View style={{height: hp(1.5)}} key={-1}/>];
    let keywordsCount = 99;
    let keywordsOutput = Math.min(100, keywordsCount);

    const [token, setToken] = useState("");
    const [testString, setTestString] = useState("");

    AsyncStorage.getItem('token', (err, result) => {
        setToken(result);
        console.log(token)
    });

    axios.get('http://192.168.219.114:8080/test', {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        setTestString(response.data)
        console.log(response.data);
    }).catch((e) => {
        console.log(e)
    })

    const goToStartPage = async () => {
        navigation.navigate('Start');
    }
    const goToMainPage = () => {
        navigation.navigate('Main')
    }
    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords')
    }

    for(let i = 0; i < parseInt(keywordsOutput / 2); i++) {
        keywords.push(
            <View key={i}>
                <View style={{ flexDirection: 'row', height: hp(5)}}>
                    <View id={i * 2} style={styles.news}>
                        <View style={{width: wp(35) - hp(5)}}>
                            <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {i * 2 + 1}</Text>
                        </View>
                        <TouchableOpacity style={{}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', width: hp(5), height: '100%', borderRadius: hp(20)}}>
                                <Icon2 name="trash-2" size={hp(3)} color="white"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: wp(10)}} />
                    <View id={i * 2 + 1} style={styles.news}>
                        <View style={{width: wp(35) - hp(5)}}>
                            <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {i * 2 + 2}</Text>
                        </View>
                        <TouchableOpacity style={{}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', width: hp(5), height: '100%', borderRadius: hp(20)}}>
                                <Icon2 name="trash-2" size={hp(3)} color="white"/>
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
                    <View id={keywordsOutput - 1} style={styles.news}>
                        <View style={{width: wp(35) - hp(5)}}>
                            <Text style={{textAlign: 'center', fontFamily: 'MapoPeacefull'}}>#키워드 {keywordsOutput - 1 + 1}</Text>
                        </View>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', width: hp(5), height: '100%', borderRadius: hp(20)}}>
                                <Icon2 name="trash-2" size={hp(3)} color="white"/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: hp(1.5)}}/>
            </View>
        );
    }

    return (
        <View style={{flex: 1}}>
        <View style={{flex: 0.5}}/>
        <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{marginLeft: '5%'}}>
                <TouchableOpacity onPress={goToMainPage} style={{}}>
                    <Icon name="doubleleft" size={hp(5)} color="skyblue"/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex: 1.5, alignItems: "center", justifyContent: "center",}}>
            <Image source={require('../assets/fly_whale.png') } resizeMode="contain" style={{width: wp(30), opacity: 0.8 }}/>
        </View>
        <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center",}}>
            <View style={{flex: 1}}/>
            <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(2), }}>{String(testString)}</Text>
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
        <View style={{ flex: 3.5, alignItems: "center", justifyContent: "center" }}>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: "center"}}>
                    {keywords}
                    {/* <Text>키워드를 추가해보세요</Text> */}
                </View>
            </ScrollView>
        </View>
        <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center", }}>
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
})

