import { useState } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    Button
} from 'react-native';

const StartPage = ({navigation}) => {
    const [ID, setID] = useState("ID를 입력해주세요");
    const [password, setPassword] = useState("비밀번호를 입력해주세요");

    return (
        <ImageBackground source={require('../assets/sky.jpg')} style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.loginArea}>
                <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 60, color: 'white', justifyContent: 'center',}}>Login</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{flex: 1, fontSize: 30, marginLeft: '5%', color: 'white'}}>ID</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setID}
                    />
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{flex: 1, fontSize: 30, marginLeft: '5%', color: 'white'}}>P/W</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>아이디/비밀번호 찾기</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity 
                        style={{height: '80%', width: '70%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 20, }}
                        onPress={() => navigation.navigate('Main', {
                            userID: ID,
                            userPassword: password,
                        })}
                    >
                        <Text style={{fontSize: 24}}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <TouchableOpacity style={{flex: 1, height: '60%', width: '90%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, margin: '1%'}}>
                        <Text style={{fontSize: 24}}>회원가입</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, height: '60%', width: '90%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, margin: '1%'}}>
                        <Text style={{fontSize: 24}}>카카오로 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1, height: '60%', width: '90%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, marginTop: '1%', marginBottom: '5%'}}>
                        <Text style={{fontSize: 24}}>네이버로 로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        //flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginArea: {
        backgroundColor: 'skyblue',
        height: hp(60),
        width: wp(80),
        borderRadius: 20,
        overflow: "hidden"
    },
    input: {
        flex: 3,
        height: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        width: '60%',
        marginRight: '5%',
        paddingLeft: '5%'
    },
});
export default StartPage;
