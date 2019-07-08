import React from 'react';
import { AsyncStorage, View, Image, TouchableOpacity, Text, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { Me } from '../Actions/MyInfo';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import UserProfile from '../Component/UserProfile';
import History from '../Component/HistoryButton';
import { AllRequsets } from '../Actions/RequestForUsers';
import Requests from '../Component/UserRequests';
import I from '../Photo/f.png';
class Profile extends React.Component {
    constructor(props){
        super(props)
    }
    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: '#fcb72b'
    }
    state = { refreshing: false }
    loadMyInfo() {
        try {
            AsyncStorage.getItem('token')
                .then((token) => {
                    if (token != null) {
                        this.props.Me(token)
                    } else { this.props.navigation.navigate('Auth') }
                })
                .catch(() => {
                    this.props.navigation.navigate('Auth')
                })
        } catch (e) {
            this.props.navigation.navigate('Auth')
        }
    }
    onrefresh = () => {
        this.setState({ refreshing: true }, () => {
            this.props.AllRequsets(this.props.MyInfo._id)
            this.setState({ refreshing: false })
        })
    }
    render() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flex: 1
                }}
                style={{ backgroundColor: 'black', paddingTop: 40 }} refreshControl={<RefreshControl onRefresh={this.onrefresh} refreshing={this.state.refreshing} />} >
                <UserProfile
                    Name={this.props.MyInfo.Name}
                    Number={this.props.MyInfo.Number}
                    Points={this.props.MyInfo.Points}
                    Email={this.props.MyInfo.Email}
                />
                <Requests ref='r' refreshing={this.state.refreshing} />
                <View style={{ height: 80, backgroundColor: '#1a1a1a', justifyContent: 'center', alignSelf: 'center', bottom: 0, position: 'absolute', width: Dimensions.get('window').width - 10 }} >
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('YFitnessPage') }} style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}  >
                        <Image source={I} style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#fcb72b', alignSelf: 'center' }} > Contact Us </Text>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        MyInfo: state.MyInfo,
        Requsests: state.RequestsForUsers,
    }
}
export default connect(mapStateToProps, { Me, AllRequsets })(Profile)

