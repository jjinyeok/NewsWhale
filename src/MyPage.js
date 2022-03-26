import { useEffect } from 'react';
import { View, Text, Button } from 'react-native';


export default function MyPage({ navigation, route }) {
    // anti-pattern: Params should contain the minimal data required to show a screen, nothing more -> 고칠 부분
    const {userID, name, age} = route.params;
    useEffect(() => {
        if (route.params?.post) {
            // Post updated, do something with `route.params.post`
            // For example, send the post to the server
          }
    }, [route.params?.post]);
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>My Page</Text>
            <Text>User ID: {userID}</Text>
            <Text>User Name: {name}</Text>
            <Text>User Age: {age}</Text>
            <Button
                title="키워드 추가하기"
                onPress={() => navigation.navigate('AddKeywords')}
            ></Button>
            <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
            <Text style={{ margin: 10 }}>Post: {route.params?.post}</Text>
        </View>
    );
}