import { View, Text, Button, ImageBackground } from 'react-native';


export default function StartPage({ navigation }) {
    return (
        <ImageBackground source={require('../assets/sky.jpg')} resizeMode="cover" style={{flex: 1}}>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>Start Page</Text>
                <Button
                    title="로그인"
                    onPress={() => navigation.navigate('Main', {
                        userID: 'jjinyeok'
                    } )}
                ></Button>
                <Button
                    title="누르면 title이 Update 됩니다."
                    onPress={() => navigation.setOptions({ title: 'Updated!' })}
                />
            </View>
        </ImageBackground>
    );
}
