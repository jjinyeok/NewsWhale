import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    ScrollView,
    StyleSheet,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// react-native-icon 받아오기 위한 lib
import Icon from 'react-native-vector-icons/AntDesign';

// 등록한 키워드 조회하기 (내부 Component)
import Keywords from '../Component/Keywords';

// 마이페이지
// 등록한 키워드 조회하기
// 등록한 키워드 삭제하기
export default function MyPage({ navigation }) {

    // To-do: 로그아웃 기능 구현해야함
    const goToStartPage = async () => {
        navigation.navigate('Start');
    }
    const goToMainPage = () => {
        navigation.navigate('Main');
    }
    const goToAddKeywordsPage = () => {
        navigation.navigate('AddKeywords');
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: 0.5}}/>
            
            {/* 메인페이지 이동 아이콘 */}
            <View style={{flex: 1, justifyContent: 'center'}}>
                <View style={{marginLeft: '5%'}}>
                    <TouchableOpacity onPress={goToMainPage}>
                        <Icon name='doubleleft' size={wp(10)} color='skyblue'/>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* 뉴스웨일 로고 이미지 */}
            <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../assets/fly_whale.png') } resizeMode='contain' style={{width: wp(30), opacity: 0.8 }}/>
            </View>
            
            {/* 코멘트 */}
            <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{flex: 1}}/>
                
                {/* 코멘트 */}
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.commentText}>뉴스웨일을 통해 뉴스를 구독하세요!</Text>
                </View>
                
                {/* 로그아웃 */}
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={goToStartPage}>
                        <Text style={styles.signOutText}>
                            로그아웃
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}/>
            </View>
            
            {/* 등록된 키워드 리스트 컴포넌트 */}
            <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                    <View style={{alignItems: 'center'}}>
                        <Keywords navigation={navigation}/>
                    </View>
                </ScrollView>
            </View>
            
            {/* 버튼1: 메인 페이지에서 뉴스보기 */}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={goToMainPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>메인 페이지에서 뉴스보기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            
            {/* 버튼2: 키워드 추가하기 */}
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={styles.button} onPress={goToAddKeywordsPage}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.buttonText}>키워드 추가하기</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{flex: 0.5}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'skyblue', 
        width: wp(80), 
        height: hp(7), 
        overflow: 'hidden', 
        borderRadius: 20,
    },
    buttonText: {
        textAlign: 'center', 
        fontSize: 24, 
        fontFamily: 'MapoPeacefull',
    },
    commentText: {
        fontFamily: 'MapoPeacefull', 
        fontSize: hp(2),
    }, 
    signOutText: {
        textAlign: 'center', 
        fontFamily: 'MapoPeacefull', 
        borderBottomColor: 'black', 
        borderBottomWidth: 1,
    },
});
