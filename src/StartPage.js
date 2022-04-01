import { useState, useEffect } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as Font from "expo-font";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
} from 'react-native';

export default function StartPage({navigation}) {
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");
    const [isReady, setIsReady] = useState(false);
    useEffect(async () => {
        // 시작과 동시에 Font를 저장 -> 'MapoPeacefull"
        await Font.loadAsync({
          "MapoPeacefull": require("/Users/jjinyeok/Documents/news-whale/assets/fonts/MapoPeacefull.ttf"),
        });
        setIsReady(true);
      }, []);

    return (
        <View style={{flex: 1}}>
        {isReady && ( //Font를 불러왔다면 화면을 띄움
        <View style={styles.container}>
            <View style={styles.loginArea}>
                <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontSize: 60, color: 'white', justifyContent: 'center', fontFamily: 'MapoPeacefull', fontWeight: '100'}}>Login</Text>
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{flex: 1, fontSize: 30, marginLeft: '5%', color: 'white', fontFamily: 'MapoPeacefull'}}>ID</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setID}
                    />
                </View>
                <View style={{flex: 1, flexDirection: "row"}}>
                    <Text style={{flex: 1, fontSize: 30, marginLeft: '5%', color: 'white', fontFamily: 'MapoPeacefull'}}>P/W</Text>
                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={{flex: 0.5, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{width: '50%', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'MapoPeacefull'}}>아이디/비밀번호 찾기</Text>
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
                        <Text style={styles.text}>로그인</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                    <TouchableOpacity style={styles.signUp}>
                        <Text style={styles.text}>네이버로 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUp}>
                        <Text style={styles.text}>카카오로 로그인</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signUp}>
                        <Text style={styles.text}>회원가입</Text>
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
    },
    text: {
        fontSize: 24 , 
        fontFamily: 'MapoPeacefull',
    },
    signUp: {
        flex: 1, 
        height: '60%', 
        width: '90%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'white', 
        borderRadius: 10, 
        margin: '1%'
    },
});
