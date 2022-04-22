import { useState, useEffect } from 'react';
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

// 통신을 위해 사용하는 axios
import axios from 'axios';

//여기에 현재 내 IP 주소(localhost나 127.0.0.1말고)를 주면 local 환경에서도 실험 가능
const baseUrl = "http://192.168.219.114:8080";

import Icon from 'react-native-vector-icons/AntDesign';

export default function SignUpPage({navigation}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState("");
    const [idCheckSuccess, setIdCheckSuccess] = useState(false);

    const goToStartPage = () => {
        navigation.navigate('Start')
    }

    // 회원가입 버튼 클릭
    const signUp = async () => {
        if(username == "" || !idCheckSuccess){
            Alert.alert("경고", 
                "아이디는 필수 항목입니다.",
                [ {text: '확인',}]);
            navigation.navigate('SignUp');
        }
        else if(password == ""){
            Alert.alert("경고", 
                "비밀번호는 필수 항목입니다.",
                [ {text: '확인',}]);
            navigation.navigate('SignUp');
        }
        else if(password !== passwordCheck) {
            Alert.alert("경고", 
                "비밀번호와 비밀번호 확인이 일치하지 않습니다. 확인해주세요.",
                [ {text: '확인',}]);
            navigation.navigate('SignUp');
        }
        else {
            const response = await axios.post(`${baseUrl}/auth/signup`, {
                username: username,
                password: password,
                nickname: nickname,
                email: email,
            });
            if(response.data.username === username) {
                console.log(username)
                navigation.navigate('Start');
            }
        }
    }

    // 아이디 중복확인 버튼 클릭
    const idCheck = async () => {
        console.log(username);
        const response = await axios.post(`${baseUrl}/auth/duplicatecheck`, {
            username: username
        });
        if(response.data === true) {
            Alert.alert("", 
            "이미 존재하는 아이디입니다. 다른 아이디를 선택해주세요.",
            [ {text: '확인',}]);
        }
        else if(response.data === false) {
            Alert.alert("",
            "사용가능한 아이디입니다.",
            [ {text: '확인',}])
            setIdCheckSuccess(true);
        }
    }

    return(
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToStartPage}>
                        <Icon name="doubleleft" size={hp(5)} color="skyblue"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.signUpArea}>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: 'skyblue', width: wp(80)}}>
                    <Text style={styles.introduceText}>안녕하세요!</Text>
                    <Text style={styles.introduceText}>뉴스 구독 어플리케이션</Text> 
                    <Text style={styles.introduceText}>News Whale입니다.</Text>
                </View>
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
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>닉네임*</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setNickname}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                        <Text style={styles.text}>이메일*</Text>
                    </View>
                    <View style={styles.passwordChecker}>
                        <TextInput
                            onChangeText={setEmail}
                            style={styles.input}
                        />
                    </View>
                </View>
                <View style={{flex: 1}}/>
                <View style={styles.signUpButtonArea}>
                    <TouchableOpacity onPress={signUp} style={styles.signUpButton}>
                        <Text style={styles.buttonText}>회원가입</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
    container: {
        flex: 9, 
        alignItems: 'center',
    },
    signUpArea: {
        backgroundColor: 'skyblue',
        height: hp(80),
        width: wp(80),
        borderRadius: 20,
        overflow: "hidden",
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