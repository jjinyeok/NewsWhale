import { useState } from 'react';
import { View, Text, Button, TextInput, ImageBackground } from 'react-native';


export default function AddKeywordsPage({ navigation }) {
    const [postText, setPostText] = useState('');

    return (
        <ImageBackground source={require('../assets/sky.jpg')} style={{flex: 1}}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <TextInput
                multiline
                placeholder="What's on your mind?"
                style={{ height: 200, padding: 10, backgroundColor: 'white' }}
                value={postText}
                onChangeText={setPostText}
            />
            <Text>Add Keywords Page</Text>
            <Button
                title="Done"
                onPress={() => {
                    // Pass and merge params back to home screen
                    navigation.navigate({
                        name: 'My',
                        params: { post: postText },
                        merge: true,
                    });
                    // 이 방식을 쓰게 될지, post를 유연하게 사용할지는 아직은 잘 모르겠음
                }}
            />
            <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
            <Button
                title="initialRouteName로 가기"
                onPress={() => navigation.popToTop()}
            />
        </View>
        </ImageBackground>
    );
}
