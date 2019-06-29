import React from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import backround from '../Photo/Logo.png';
import { getToken, HowIsMe } from '../Screens/Application';
class Loading extends React.Component {
    async componentDidMount() {
        try {
            const g = await getToken()
            if (g !== null) {
                const type = await HowIsMe(g)
                if (type == 'Gym') {
                    this.props.navigation.navigate('Gym')
                } else if (type == 'User') {
                    this.props.navigation.navigate('User')
                }
                else if (type == 'Admin') {
                    this.props.navigation.navigate('Admin')
                }
            } else {
                this.props.navigation.navigate('Auth')
            }
        } catch (e) {
            this.props.navigation.navigate('Auth')
        }
    }
    render() {
        return (
            <View style={{ backgroundColor: 'black', justifyContent: 'center', flex: 1 }} >
                <Image source={backround} resizeMode='stretch' style={{ alignSelf: 'center', height: 200, width: 200 }} />
                <ActivityIndicator size='large' color='#fcb72b' />
            </View>
        )
    }
}
export default Loading