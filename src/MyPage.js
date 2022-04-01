import React from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    Button, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';


export default function MyPage({ navigation, route }) {
    const keywords = [<View style={{height: hp(1.5)}} key={-1}/>];
    let keywordsCount = 99;
    let keywordsOutput = Math.min(100, keywordsCount);
    for(let i = 0; i < parseInt(keywordsOutput / 2); i++) {
        keywords.push(
            <View key={i}>
                <View style={{ flexDirection: 'row', }}>
                    <View id={i * 2} style={styles.news}>
                        <Text style={{textAlign: 'center', flex: 5}}>#키워드 {i * 2 + 1}</Text>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text>삭제</Text> 
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: wp(10)}} />
                    <View id={i * 2 + 1} style={styles.news}>
                        <Text style={{textAlign: 'center', flex: 5}}>#키워드 {i * 2 + 1 + 1}</Text>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text>삭제</Text> 
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
                        <Text style={{textAlign: 'center', flex: 5}}>#키워드 {keywordsOutput - 1 + 1}</Text>
                        <TouchableOpacity style={{flex: 1.5}}>
                            <View style={{flex: 1, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20}}>
                                <Text>삭제</Text> 
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
        <View style={{flex: 0.5, justifyContent: 'center'}}>
            <View style={{marginLeft: '5%'}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Main');
                }} style={{}}>
                    <Icon name="doubleleft" size={wp(10)} color="skyblue"/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{flex: 2, alignItems: "center", justifyContent: "center",}}>
            <Image source={require('../assets/blank.png') } resizeMode="contain" style={{
                    width: hp(20), height: hp(20), borderRadius: hp(20), overflow: "hidden"}}/>
        </View>
        <View style={{ flex: 0.5, alignItems: "center", justifyContent: "center"}}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Start');
            }}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{textAlign: 'center'}}>로그아웃</Text>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{ flex: 3.5, alignItems: "center", justifyContent: "center" }}>
            <ScrollView style={{flex: 1}}>
                <View style={{alignItems: "center"}}>
                    {keywords}
                </View>
            </ScrollView>
        </View>
        <View style={{ flex: 1.5, alignItems: "center", justifyContent: "center", }}>
            <TouchableOpacity style={{
                backgroundColor: 'skyblue', width: wp(80), height: wp(15), overflow: "hidden", borderRadius: 20, }} 
                onPress={() => {
                    navigation.navigate('AddKeywords');
            }}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{textAlign: 'center', fontSize: 24}}>키워드 추가하기</Text>
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
        width: wp(40), 
        height: hp(5),
        borderRadius: 20,
        overflow: 'hidden',
        justifyContent: "center",
        flexDirection: 'row',
        alignItems: 'center'
    }
})
