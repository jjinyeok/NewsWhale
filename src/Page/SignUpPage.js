import React from 'react';
import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/AntDesign';

// 통신을 위해 사용하는 axios
import axios from 'axios';

//여기에 현재 내 IP 주소(localhost나 127.0.0.1말고)를 주면 local 환경에서도 실험 가능
import network from '../Static/network';
const baseUrl = network();

// 회원가입 페이지
// 1. 회원가입
// 2. 회원가입 아이디 중복 확인
export default function SignUpPage({navigation}) {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    // const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [idCheckSuccess, setIdCheckSuccess] = useState(false);

    // 시작 페이지 이동
    const goToStartPage = () => {
        navigation.navigate('Start');
    }

    // 회원가입
    const signUp = async () => {
        
        // warn1: 아이디 입력값이 없는 경우
        if(username === '') {
            Alert.alert('경고', 
                '아이디는 필수 항목입니다.',
                [ {text: '확인',}]);
            navigation.navigate('SignUp');
        }

        // warn2: 아이디 중복확인 안 한 경우
        else if(!idCheckSuccess) {
            Alert.alert('경고', 
                '아이디 중복확인 해주세요.',
                [ {text: '확인'} ]);
            navigation.navigate('SignUp');
        }

        // warn3: 비밀번호 입력값이 없는 경우
        else if(password === '') {
            Alert.alert('경고', 
                '비밀번호는 필수 항목입니다.',
                [ {text: '확인'} ]);
            navigation.navigate('SignUp');
        }

        // warn4: 비밀번호 !== 비밀번호 확인
        else if(password !== passwordCheck) {
            Alert.alert('경고', 
                '비밀번호와 비밀번호 확인이 일치하지 않습니다. 확인해주세요.',
                [ {text: '확인'} ]);
            navigation.navigate('SignUp');
        }

        // warn5: 이메일 입력값이 없는 경우
        // else if(email === '') {
        //     Alert.alert('경고',
        //         '이메일은 필수 항목입니다.',
        //         [ {text: '확인'} ]);
        //     navigation.navigate('SignUp');
        // }

        // 정상적 입력값 회원가입
        else {
            
            // 입력값 서버로 전송 (username, password, email, nickname)
            await axios.post(`${baseUrl}/auth/signup`, {
                username: username,
                password: password,
                email: '',
                nickname: nickname,
            })
            
            // 정상적 회원가입 완료
            .then((response) => {
                if(response.data.username === username) {
                    Alert.alert('회원가입', '회원가입 완료!', [{text: '확인', onPress: ()=> {
                        navigation.navigate('Start');
                    }}])
                }
            });
        }
    }

    // 아이디 중복확인
    const idCheck = async () => {
        
        // 입력값 서버로 전송 (username)
        const response = await axios.post(`${baseUrl}/auth/duplicatecheck`, {
            username: username
        });
        
        // 입력값 NOT IN 기존 아이디
        if(response.data === true) {
            Alert.alert('경고', 
            '이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요.',
            [ {text: '확인',}]);
        }
        
        // 입력값 IN 기존 아이디
        else if(response.data === false) {
            Alert.alert('확인',
            '사용가능한 아이디입니다.',
            [ {text: '확인',}]);
            setIdCheckSuccess(true);
        }
    }

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}/>

            {/* 시작페이지 이동 아이콘 */}
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToStartPage}>
                        <Icon name='doubleleft' size={wp(10)} color='skyblue'/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* 가운데 정렬을 위한 컨테이너(기능 X) */}
            <View style={{flex: 7.5, alignItems: 'center'}}>
            {/* 회원가입 구역 */}
            <View style={styles.signUpArea}>
                
                {/* 서비스 소개 */}
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.introduceText}>안녕하세요!</Text>
                    <Text style={styles.introduceText}>뉴스 구독 어플리케이션</Text> 
                    <Text style={styles.introduceText}>뉴스웨일입니다.</Text>
                </View>
                
                {/* 아이디 입력란 */}
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>아이디 *</Text>
                    </View>
                    <View style={styles.idChecker}>
                        <TextInput
                            onChangeText={setUsername}
                            style={styles.input}
                            editable={!idCheckSuccess}
                        />
                        <TouchableOpacity onPress={idCheck} style={styles.overlapCheckButton}>
                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5), textAlign: 'center'}}>중복확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* 비밀번호 입력란 */}
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>비밀번호 *</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* 비밀번호 확인 입력란 */}
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>비밀번호 확인 *</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setPasswordCheck}
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>
                </View>

                {/* 이메일 입력란 */}
                {/* <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>이메일*</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                </View> */}

                {/* 닉네임 입력란 */}
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>닉네임</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setNickname}
                            style={styles.input}
                        />
                    </View>
                </View>

                <View style={{flex: 1}}/>

                {/* 회원가입 버튼 구역 */}
                <View style={styles.signUpButtonArea}>
                    <TouchableOpacity onPress={signUp} style={styles.signUpButton}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex: 1}}/>
            </View>
            </View>
            <View style={{flex: 1}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    signUpArea: {
        flex: 1,
        backgroundColor: 'skyblue',
        borderRadius: 20,
        overflow: 'hidden',
    },
    text: {
        color: 'white',
        marginLeft: '5%',
        fontFamily: 'MapoPeacefull', 
        fontSize: hp(1.5),
    },
    introduceText: {
        color: 'white',
        fontFamily: 'MapoPeacefull',
        fontSize: hp(2),
    },
    idChecker: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    passwordChecker: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    overlapPasswordChecker: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    nicknameChecker: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    emailChecker: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    signUpButtonArea: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(80),
    },
    input: {
        flex: 3,
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        marginLeft: '5%',
        marginRight: '5%',
        paddingLeft: '5%',
        fontFamily: 'MapoPeacefull',
    },
    overlapCheckButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: '80%',
        width: wp(20),
        marginRight: '5%',
        justifyContent: 'center',
        alignContent: 'center',
    },
    signUpButton: {
        height: '80%', 
        width: '70%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 20, 
    },
    buttonText: {
        fontSize: 24 , 
        fontFamily: 'MapoPeacefull',
    },
});
