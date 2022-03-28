import { View, Text, Button, ImageBackground } from 'react-native';


export default function MainPage({ navigation, route }) {
    const { userID, userPassword } = route.params;
    return (
        <ImageBackground source={require('../assets/sky.jpg')} resizeMode="cover" style={{flex: 1}}>
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Main Page</Text> 
            <Text>{userID}님, 안녕하세요!</Text>
            <Button
                title="마이 페이지"
                onPress={() => navigation.navigate('My', {
                    userID: userID,
                    name: '최진혁', 
                    age: 25,
                } )}
            ></Button>
            <Button title="뒤로 가기" onPress={() => navigation.goBack()} />
        </View>
        </ImageBackground>
    );
}
