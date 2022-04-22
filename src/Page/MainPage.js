import React from 'react';
import { 
    View, 
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
} from 'react-native';

import News from '../Component/News';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';

export default function MainPage({ navigation, route }) {

    const goToMyPage = () => {
        navigation.navigate("My");
    }

    return (
        <View style={{flex: 1, }}>
            <View style={{flex: 0.5, }}>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: "center"}}>
                <TouchableOpacity style={{flex: 1, alignItems: 'center', marginLeft: '75%'}} onPress={goToMyPage}>
                    <Icon name='home' size={wp(10)} color={'skyblue'}></Icon>
                </TouchableOpacity>
            </View>
            <View style={{flex: 8, alignItems: 'center', alignContent: 'center'}}>
                <ScrollView style={styles.newsArea} showsVerticalScrollIndicator={false}>
                    <News/>
                </ScrollView>
            </View>
            <View style={{flex: 0.5}}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    newsArea: {
        flex: 1,
        backgroundColor: 'skyblue',
        height: hp(100),
        width: wp(90),
        borderRadius: 20,
        overflow: 'hidden',
    }
});

