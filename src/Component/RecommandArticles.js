import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { 
    View, 
    Text,
    TouchableOpacity, 
    StyleSheet,
    ScrollView,
    Linking,
} from 'react-native';

// 화면 비율 맞추기 위한 lib
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// 현재 페이지로 이동했을 시 useIsFocused = true;
import { useIsFocused } from '@react-navigation/native';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// 맞춤형 기사 3개를 추천하고 가져오기
export default function RecommandArticles({responseData}) {
    
    // 현재 페이지 사용여부 확인
    const isFocused = useIsFocused();

    const [i, setI] = useState(0)
    const [recommendArticles, setRecommendArticles] = useState([])
    const [recommendArticlesUrl, setRecommendArticlesUrl] = useState([])
    useEffect(() => {
      var tmpRecommendArticles = []
      var tmpRecommendArticlesUrl = []
      for(let i = 0; i < responseData.recommendArticleList.length; i++) {
        tmpRecommendArticles.push(responseData.recommendArticleList[i].articleTitle);
        tmpRecommendArticlesUrl.push(responseData.recommendArticleList[i].articleUrl);
      }
      setRecommendArticles(tmpRecommendArticles)
      console.log(tmpRecommendArticles)
      setRecommendArticlesUrl(tmpRecommendArticlesUrl)
    }, [isFocused])

    useInterval(() => {
        setI((i+1) % 3)
    }, 7000)

    const recommandArticlesClick = async () => {
        await Linking.openURL(recommendArticlesUrl[i]);
    }
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}/>
            <TouchableOpacity onPress={recommandArticlesClick} style={{
              flex: 8, width: wp(90), backgroundColor: 'white', justifyContent: 'center',
              borderColor: 'skyblue', borderWidth: 1, borderRadius: 20
            }}>
                <Text style={{fontSize: hp(1.5), fontFamily: 'MapoPeacefull', textAlign: 'center'}}>{recommendArticles[i]}</Text>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
        </View>
    )
}