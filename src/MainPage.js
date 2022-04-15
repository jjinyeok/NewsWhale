import React from 'react';
import { 
    View, 
    Text, 
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

    const newsList = React.createRef();
    const sendNewsURL = async () => {        
        // 기사로 이동 함수
        await Linking.openURL('https://n.news.naver.com/article/214/0001187231?cds=news_media_pc');
    }
    const sendNewsMedia = async () => {
        // 신문사로 이동 함수
        await Linking.openURL('https://imnews.imbc.com/pc_main.html');
    }
    const goToMyPage = () => {
        navigation.navigate("My");
    }

    // 화면에 출력될 뉴스 링크들
    let newList = [<View key={-1} style={{height: hp(2)}}></View>];
    for(let i = 0; i < 100; i++) {
        newList.push(
        <View key={i} style={styles.news}>
            <View style={{flex:1, flexDirection: 'row'}}>
                <TouchableOpacity onPress={sendNewsMedia} style={{flex:3}}>
                    <View style={{flex: 3}}>
                        <View style={{flex: 5, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{backgroundColor: 'skyblue', width: wp(15), height: wp(15), borderRadius: wp(15), alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>
                                    MBC뉴스
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendNewsURL} style={{flex:7}}>
                <View style={{flex: 7,}}>
                    <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text ref={newsList} style={{ fontSize: hp(2), fontFamily: 'MapoPeacefull'}}>
                            5차 평화협상 청신호?‥우크라 "중립국 되겠다"
                        </Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center', opacity: 0.6, marginLeft: '6%'}}>
                        <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>전재홍 기자</Text>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={styles.keywordBlock}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드1</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={styles.keywordBlock}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드2</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                            <View style={styles.keywordBlock}>
                                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드3</Text>
                            </View>
                        </View>
                    </View>
                </View>
                </TouchableOpacity>
            </View>
        </View>)
    }
    return (
        <View style={{flex: 1, }}>
            <View style={{flex: 0.5, }}>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', marginLeft: '75%'}} onPress={goToMyPage}>
                    <Image source={require('../assets/blank.png') } resizeMode="contain" style={{
                        width: wp(10), height: wp(10), borderRadius: wp(30), overflow: "hidden", flex: 2}}/>
                    <Text style={{flex: 1, fontFamily: 'MapoPeacefull'}}>My Page</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 8, alignItems: 'center', alignContent: 'center'}}>
                <ScrollView style={styles.newsArea}>
                    {newList}
                </ScrollView>
            </View>
            <View style={{flex: 0.5}}></View>
        </View>
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
    keywordBlock: {
        backgroundColor: 'skyblue', 
        width: '80%', 
        height: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
    }
})

