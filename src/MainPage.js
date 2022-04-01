import React from 'react';
import { 
    View, 
    Text, 
    ImageBackground, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    ScrollView,
    Linking, 
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function MainPage({ navigation, route }) {
    const { userID, userPassword } = route.params;
    const newsList = React.createRef();

    const sendNewsURL = async () => {        
        // 기사로 이동
        await Linking.openURL('https://n.news.naver.com/article/214/0001187231?cds=news_media_pc');
    }
    const sendNewsMedia = async () => {
        // 신문사로 이동
        await Linking.openURL('https://imnews.imbc.com/pc_main.html');
    }

    let newList = [];
    for(let i = 0; i < 10; i++) {
        newList.push(
        <View key={i} style={styles.news}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={sendNewsURL} style={{flex:7}}>
                <View style={{flex: 7,}}>
                    <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text ref={newsList} style={{ fontSize: hp(3), }}>
                            5차 평화협상 청신호?‥우크라 "중립국 되겠다"
                        </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={{backgroundColor: 'tomato', width: '50%', height: '75%', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                                <Text>키워드1</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={{backgroundColor: 'tomato', width: '50%', height: '75%', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                                <Text>키워드2</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={{backgroundColor: 'tomato', width: '50%', height: '75%', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
                                <Text>키워드3</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendNewsMedia} style={{flex:3}}>
                    <View style={{flex: 3}}>
                        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center', backgroundColor: 'tomato'}}>
                            <Text>
                                MBC뉴스-로고가 들어갈 예정입니다.
                            </Text>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Text>전재홍 기자</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>)
    }
    return (
        <ImageBackground source={require('../assets/sky.jpg')} resizeMode="cover" style={{flex: 1}}>
        <View style={{flex: 1, }}>
            <View style={{flex: 1.5, justifyContent: "center"}}>
                <TouchableOpacity style={{marginLeft: "80%"}} onPress={() => {
                    navigation.navigate('My', {
                        userID: userID,
                    });
                }}>
                    <Image source={require('../assets/blank.png') } resizeMode="contain" style={{
                        width: wp(15), height: wp(15), borderRadius: wp(30), overflow: "hidden"}}/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 8, alignItems: 'center', alignContent: 'center'}}>
                <ScrollView style={styles.newsArea}>
                    <Text style={{height: hp(2)}}>{userID}님 안녕하세요!</Text>
                    {newList}
                </ScrollView>
            </View>
            <View style={{flex: 0.5}}></View>
        </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    news: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(15), 
        marginLeft: wp(5), 
        marginBottom: hp(2), 
        borderRadius: 20, 
        overflow: 'hidden',
    },
    newsArea: {
        flex: 1,
        backgroundColor: 'skyblue',
        height: hp(100),
        width: wp(90),
        borderRadius: 20,
        overflow: 'hidden',
    },
})
