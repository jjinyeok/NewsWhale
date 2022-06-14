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
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// font 받아오기 위한 lib
import * as Font from 'expo-font';

// 로컬 저장소 (userId, token)
import AsyncStorage from '@react-native-async-storage/async-storage';

// 통신을 위해 사용하는 axios
import axios from 'axios';

// 서버 통신 주소
import network from '../Static/network';
const baseUrl = network();

// 시작 페이지
// 로그인
export default function StartPage({navigation}) {

    // input 값
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // isReady = true라면, Font를 불러왔음을 의미
    const [isReady, setIsReady] = useState(false);

    // 로그인 함수
    // input: (username, password) -> output: JSON(userId, token)
    const signIn = async () => {
        axios.post(`${baseUrl}/auth/signin`, {
            username: username,
            password: password,
        }).then((response) => {
            console.log(response.data.token);
            AsyncStorage.setItem('token', 
                JSON.stringify(response.data)
            );
            navigation.navigate('Main');
        }).catch((error) => {
            if(error.name === 'Error') {
                Alert.alert('로그인 실패', '아이디와 비밀번호를 확인해주세요' , [{text: '확인'}]);
            }
        });
    }

    // 회원가입 페이지 이동
    const goToSignUpPage = () => {
        navigation.navigate('SignUp')
    }
    
    // 시작과 동시에 Font를 저장 -> 'MapoPeacefull'
    useEffect(async () => {
        await Font.loadAsync({
            'MapoPeacefull': require('/Users/jjinyeok/Documents/news-whale/assets/fonts/MapoPeacefull.ttf'),
        });
        setIsReady(true);
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1.5}}/>
            {isReady && ( //Font를 불러왔다면 화면을 띄움
            <View style={styles.container}>
                <View style={styles.loginArea}>
                    <View style={{flex: 0.5}}/>
                    
                    {/* 로고 */}
                    <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={require('../../assets/blue_square_logo.png') } resizeMode='contain' style={{width: wp(50)}}/>
                    </View>
                    <View style={{flex: 0.5}}/>
                    
                    {/* 아이디 입력란 */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.IDPWText}>ID</Text>
                        <TextInput
                            style={styles.inputText}
                            onChangeText={setUsername}
                        />
                    </View>
                    
                    {/* 패스워드 입력란 */}
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.IDPWText}>PW</Text>
                        <TextInput
                            secureTextEntry={true}
                            style={styles.inputText}
                            onChangeText={setPassword}
                        />
                    </View>
                    
                    {/* 아이디/비밀번호 찾기 | 회원가입 */}
                    <View style={{flex: 1.5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                        
                        {/* 아이디/비밀번호 찾기 */}
                        {/* <TouchableOpacity style={{alignItems: 'flex-end', justifyContent: 'center', marginRight: '5%'}}>
                            <Text style={styles.smallText}>아이디/비밀번호 찾기</Text>
                        </TouchableOpacity>
                        <Text style={{fontFamily: 'MapoPeacefull', color: 'white'}}>|</Text> */}
                        
                        {/* 회원가입 */}
                        <TouchableOpacity style={{alignItems: 'flex-start', justifyContent: 'center', marginLeft: '5%'}} onPress={goToSignUpPage}>
                            <Text style={styles.smallText}>회원가입</Text>
                        </TouchableOpacity>
                    </View>
                    
                    {/* 로그인 버튼: 성공 -> 메인페이지 */}
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                            <Text style={styles.buttonText}>로그인</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 0.5}}/>
                    
                    {/* SNS 로그인 */}
                    {/* <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                        <TouchableOpacity style={styles.snsSignUpButton}>
                            <Text style={styles.buttonText}>네이버로 로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.snsSignUpButton}>
                            <Text style={styles.buttonText}>카카오로 로그인</Text>
                        </TouchableOpacity>
                        <View style={{flex: 1}}/>
                    </View> */}
                    <View style={{flex: 3}}/>
                </View>
            </View>
            )}
            <View style={{flex: 1}}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 7.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginArea: {
        backgroundColor: 'skyblue',
        height: hp(60),
        width: wp(80),
        borderRadius: 20,
        overflow: 'hidden',
    },
    inputText: {
        flex: 3,
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: '5%',
        paddingLeft: '5%',
        fontFamily: 'MapoPeacefull'
    },
    loginText: {
        fontSize: 50, 
        color: 'white', 
        justifyContent: 'center', 
        fontFamily: 'MapoPeacefull', 
        fontWeight: 'bold'
    },
    IDPWText: {
        flex: 1, 
        fontSize: 30,
        color: 'white', 
        fontFamily: 'MapoPeacefull',
        textAlign: 'center',
    },
    smallText: {
        color: 'white', 
        fontFamily: 'MapoPeacefull'
    },
    buttonText: {
        fontSize: 24 , 
        fontFamily: 'MapoPeacefull',
    },
    snsSignUpButton: {
        flex: 1, 
        height: '60%', 
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        margin: '1%'
    },
    loginButton: {
        height: '100%', 
        width: wp(50),
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 20, 
    }
});
