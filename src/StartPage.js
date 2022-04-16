import { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// font 받아오기 위한 lib
import * as Font from "expo-font";

// Local Storage를 위한 AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// 통신을 위해 사용하는 axios
import axios from 'axios';

//여기에 현재 내 IP 주소(localhost나 127.0.0.1말고)를 주면 local 환경에서도 실험 가능
const baseUrl = "http://192.168.219.114:8080";

export default function StartPage({navigation}) {
    // input 값
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // isReady = true라면, Font를 불러왔음을 의미
    const [isReady, setIsReady] = useState(false);

    const goToMainPage = async () => {
        const response = await axios.post(`${baseUrl}/auth/signin`, {
            id: id,
            password: password
        })
        AsyncStorage.setItem('user', 
            JSON.stringify({
                'user_id': response.data.user_id,
                'id': response.data.id, 
                'password': response.data.password,
                'nickname': response.data.nickname,
                'email': response.data.email,
            })
        );
        console.log(response.data.id)
        console.log(response.data.password)
        if(response.data.id === id){
            if(response.data.password === password) {
                navigation.navigate('Main');
            }
            else {
                Alert.alert('로그인 실패',
                '비밀번호를 확인해주세요')
            }
        }
        else {
            Alert.alert('로그인 실패', 
            '아이디를 확인해주세요');
        }
    }

    const goToSignUpPage = () => {
        navigation.navigate('SignUp')
    }

    useEffect(async () => {
        // 시작과 동시에 Font를 저장 -> 'MapoPeacefull"
        await Font.loadAsync({
            "MapoPeacefull": require("/Users/jjinyeok/Documents/news-whale/assets/fonts/MapoPeacefull.ttf"),
        });
        setIsReady(true);
    }, []);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
        {isReady && ( //Font를 불러왔다면 화면을 띄움
        <View style={styles.container}>
            <View style={styles.loginArea}>
                <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.loginText}>Login</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={styles.IDPWText}>ID</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setId}
                    />
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={styles.IDPWText}>P/W</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center'}}>
                        <Text style={styles.findIDPWText}>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.loginButton} onPress={goToMainPage}>
                        <Text style={styles.buttonText}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.buttonText}>네이버로 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.buttonText}>카카오로 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUpButton} onPress={goToSignUpPage}>
                        <Text style={styles.buttonText}>회원가입하러 가기</Text>
                    </TouchableOpacity>
                    <View style={{flex: 0.25}}/>
                </View>
            </View>
        </View>
        )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginArea: {
        backgroundColor: 'skyblue',
        height: hp(60),
        width: wp(80),
        borderRadius: 20,
        overflow: "hidden",
    },
    input: {
        flex: 3,
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '60%',
        marginRight: '5%',
        paddingLeft: '5%',
        fontFamily: 'MapoPeacefull'
    },
    loginText: {
        fontSize: 60, 
        color: 'white', 
        justifyContent: 'center', 
        fontFamily: 'MapoPeacefull', 
        fontWeight: '100'
    },
    buttonText: {
        fontSize: 24 , 
        fontFamily: 'MapoPeacefull',
    },
    IDPWText: {
        flex: 1, 
        fontSize: 30,
        marginLeft: '5%', 
        color: 'white', 
        fontFamily: 'MapoPeacefull',
    },
    findIDPWText: {
        color: 'white', 
        fontFamily: 'MapoPeacefull'
    },
    signUpButton: {
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
        height: '80%', 
        width: '70%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 20, 
    }
});
