import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Image, 
    StyleSheet,
    Linking, 
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import medias from '../Static/media';
const media = medias();

// 키워드와 매칭되는 기사 반환 컴포넌트
export default function News({navigation, responseData, setLoading}) {

    // 키워드 추가하기 페이지로 이동 함수
    const goToAddKeywordsPage = async () => {
        await navigation.navigate('AddKeywords');
        setLoading(false);
    }

    // 뉴스 기사로 이동 함수
    const sendNewsByURL = async (newsUrl) => {
        await Linking.openURL(newsUrl);
    }

    // 언론사로 이동 함수
    const sendMediaByURL = async (mediaUrl) => {
        await Linking.openURL(mediaUrl);
    }

    const count = Math.min(300, responseData.count);

    // 뉴스 리스트 (newArea 내부)
    const newsList = [<View key={-1} style={{height: hp(2)}}/>];

    // 키워드와 일치하는 뉴스가 없을 경우
    if (responseData.count === 0) {
        newsList.push(
            <View key={0} style={{alignItems: 'center', justifyContent: 'center', height: hp(75)}}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드와 일치하는 뉴스가 없어요!</Text>
                <Text style={{fontFamily: 'MapoPeacefull'}}>키워드를 추가하시겠어요?</Text>
                <Text></Text>
                <TouchableOpacity style={styles.newsOffAddKeywordButton} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    
    // 키워드와 일치하는 뉴스가 있을 경우, 최대 100개 출력

    else {
        let show_count = 300 > responseData.count ? responseData.count : 300
        for(let i = 0; i < show_count; i++) {
            if (i % 4 === 0 && i !== 0) {
                newsList.push(
                    <View key={301 + i / 5} style={styles.addKeywordContainer}>
                        <Text style={{fontFamily: 'MapoPeacefull'}}>더 많은 뉴스를 찾아보고 싶으시다면?</Text>
                        <TouchableOpacity style={styles.newsOnAddKeywordButton} onPress={goToAddKeywordsPage}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                );
            }

            let media_tel = 'TEL ☎ '
            for(let j = 0; j < 124; j++) {
                if(media[j].name == responseData.articleList[i].articleMediaName) {
                    media_tel += media[j].number
                }
            }

            newsList.push(
                // 하나의 뉴스 for문으로 뉴스 리스트 생성
                <View key={i} style={styles.newsContainer}>
                    
                    {/* 언론사 구역 */}
                    <TouchableOpacity onPress={() => sendMediaByURL(responseData.articleList[i].articleMediaUrl)} style={{flex:2.5}}>
                        <View style={{flex: 3}}>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Image 
                                    source={{uri: responseData.articleList[i].articleMediaImageSrc}} 
                                    resizeMode='contain'
                                    style={{flex: 9, width: '90%'}}
                                />
                                <View style={{flex: 1, width: '100%',}}>
                                    <Text style={{fontFamily: 'MapoPeacefull', color: 'black', fontSize: hp(1), textAlign: 'center'}}>{'>>'} 언론사로 가기</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{borderRightColor: 'skyblue', borderRightWidth: 1,}}/>
                    {/* 뉴스 구역 (제목, 기자, 키워드1, 키워드2, 키워드3) */}
                    <TouchableOpacity onPress={() => sendNewsByURL(responseData.articleList[i].articleUrl)} style={{flex:7.5}}>
                        <View style={{flex: 7,}}>
                            
                            {/* 제목 */}
                            <View style={styles.titleContainer}>
                                {responseData.articleList[i].articleTitle.length > 40 ? 
                                    <Text style={{ fontSize: hp(1.5), fontFamily: 'MapoPeacefull'}}>
                                    {responseData.articleList[i].articleTitle}
                                    </Text>
                                    :
                                    <Text style={{ fontSize: hp(1.75), fontFamily: 'MapoPeacefull'}}>
                                    {responseData.articleList[i].articleTitle}
                                    </Text>}
                            </View>
                            
                            <View style={styles.reporterContainer}>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>{responseData.articleList[i].articleReporter}</Text>
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: hp(1), fontFamily: 'MapoPeacefull'}}>
                                        {
                                            media_tel
                                        }
                                    </Text>
                                </View>
                            </View>
                            
                            {/* 키워드 1, 2, 3 */}
                            <View style={{flex: 1.5, flexDirection: 'row'}}>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        {responseData.articleList[i].keyword1.length > 4 ?
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>
                                                {
                                                responseData.articleList[i].keyword1}
                                            </Text> :
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>
                                                {
                                                responseData.articleList[i].keyword1}
                                            </Text>
                                        }
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        {responseData.articleList[i].keyword2.length > 4 ?
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>
                                                {
                                                responseData.articleList[i].keyword2}
                                            </Text> :
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>
                                                {
                                                responseData.articleList[i].keyword2}
                                            </Text>
                                        }
                                    </View>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                                    <View style={styles.keywordContainer}>
                                        {responseData.articleList[i].keyword3.length > 4 ?
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1)}}>
                                                {
                                                responseData.articleList[i].keyword3}
                                            </Text> :
                                            <Text style={{fontFamily: 'MapoPeacefull', fontSize: hp(1.5)}}>
                                                {
                                                responseData.articleList[i].keyword3}
                                            </Text>
                                        }
                                    </View>
                                </View>
                            </View>
                            <View style={{flex: 1, width: '100%',}}>
                                <Text style={{fontFamily: 'MapoPeacefull', color: 'black', fontSize: hp(1), textAlign: 'center'}}>{'>>'} 기사보러 가기</Text>
                            </View>

                        </View>
                    </TouchableOpacity>
                </View>
            );
        }
        
        // 뉴스 리스트 마지막 키워드 추가하기 버튼 생성
        newsList.push(
            <View key={300} style={styles.addKeywordContainer}>
                <Text style={{fontFamily: 'MapoPeacefull'}}>더 많은 뉴스를 찾아보고 싶으시다면?</Text>
                <TouchableOpacity style={styles.newsOnAddKeywordButton} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center',}}>
                        <Text style={{textAlign: 'center', fontSize: 24, fontFamily: 'MapoPeacefull'}}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return newsList;
}

const styles = StyleSheet.create({
    newsContainer: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(13), 
        marginLeft: wp(5), 
        marginBottom: hp(2), 
        borderRadius: 10, 
        overflow: 'hidden',
        flexDirection: 'row',
    },
    mediaContainer: {
        backgroundColor: 'skyblue', 
        width: wp(15), 
        height: wp(15), 
        borderRadius: wp(15), 
        alignItems: 'center', 
        justifyContent: 'center',
    },
    titleContainer: {
        flex: 4.5, 
        justifyContent: 'center', 
        alignItems: 'center',
        // width: '90%'
    },
    reporterContainer: {
        flex: 1.5, 
        alignItems: 'flex-start', 
        justifyContent: 'center', 
        opacity: 0.6, 
        marginLeft: '6%',
        // flexDirection: 'row'
    },
    keywordContainer: {
        backgroundColor: 'skyblue', 
        width: '80%', 
        height: '80%', 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius: 20,
    },
    addKeywordContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(7),
        marginLeft: wp(5), 
        marginBottom: hp(2),
        borderRadius: 10, 
        overflow: 'hidden',
    },
    newsOffAddKeywordButton: {
        backgroundColor: 'white', 
        width: wp(80), 
        height: hp(7), 
        overflow: "hidden", 
        borderRadius: 20,
    },
    newsOnAddKeywordButton: {
        backgroundColor: 'skyblue', 
        width: wp(70), 
        height: hp(4), 
        overflow: "hidden", 
        borderRadius: 20,
    },
});
