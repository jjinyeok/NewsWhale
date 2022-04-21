import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function AddKeywordsPage({ navigation }) {
    const [text, setText] = useState("");
    const goToMainPage = () => {
        navigation.navigate('Main')
    }
    const goToMyPage = () => {
        navigation.navigate('My')
    }
    const recommendations = [];
    // AsyncStorage.getItem('user', (err, result) => {
    //     const user = JSON.parse(result);
    //     alert(user.id + ' ' + user.password);
    // })


    for(let i = 0; i < 5; i++) {
        recommendations.push(
            <View key={i}>
                <View style={{ flexDirection: 'row', }}>
                    <View id={i * 2} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드 {i * 2 + 1}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: wp(10)}} />
                    <View id={i * 2 + 1} style={styles.recommendations}>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드 {i * 2 + 1 + 1}</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: hp(1.5)}}/>
            </View>
        );
    }

    return (
        <View style={{ flex: 1}}>
            <View style={{flex: 0.5}}/>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToMainPage}>
                        <Icon name="doubleleft" size={hp(5)} color="skyblue"/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 9}}>
                <View style={{flex: 2}}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <TextInput
                        style={{width: wp(80), height: hp(7), borderColor: 'black', borderWidth: 1, fontSize: 20, backgroundColor:'white',fontFamily: 'MapoPeacefull', paddingLeft: '5%',}}
                        onChangeText={setText}
                        value={text}
                        placeholder="검색어를 입력해주세요"
                        keyboardType="ascii-capable"
                    />
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center',}}>
                    <TouchableOpacity style={{
                        backgroundColor: 'skyblue', width: wp(80), height: hp(7), overflow: "hidden", borderRadius: 20, }} 
                        onPress={goToMyPage}
                    >
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>추가하기</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
                <View style={{flex: 5}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{fontSize: 16, fontFamily: 'MapoPeacefull'}}>추천 키워드</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <View style={{alignItems: "center"}}>
                            {recommendations}
                        </View>
                    </View>
                    <View style={{flex: 1}}/>
                </View>
                <View style={{flex: 3}}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    recommendations: {
        backgroundColor: 'skyblue', 
        width: wp(40), 
        height: hp(5),
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center'
    }
})
