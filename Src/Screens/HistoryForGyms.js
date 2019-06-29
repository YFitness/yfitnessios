import React from 'react';
import { View, AsyncStorage, ActivityIndicator, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native';
import HistoryList from '../Component/HistoryList';
import { AllRequsetss } from '../Actions/RequestForGyms';
import { Me } from '../Actions/GymInfo';
import { connect } from 'react-redux';
import { Fonts } from '../Fonts/insex';
import { NavigationEvents } from 'react-navigation';

class HistoryForGyms extends React.Component {
    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: '#fcb72b'
    }
    state={
        Refresh : false
    }
    handelOnRefresh = () => {
        this.setState({ Refresh: true },()=>{
            this.props.Me(token).then(() => { this.props.AllRequsetss(this.props.Info._id) })
        })
        this.setState({ Refresh: false })  
    }
    _laodData = () => {
        AsyncStorage.getItem('token')
            .then((token) => {
                if (token != null) {
                    this.props.Me(token).then(() => { this.props.AllRequsetss(this.props.Info._id) })
                }
            })
    }
    render() {
        return (
            <ScrollView 
            contentContainerStyle={{ flex: 1, paddingTop: 50, backgroundColor: 'black' }}
            refreshControl={<RefreshControl refreshing={this.state.Refresh} onRefresh={this.handelOnRefresh} />}
            >
                <NavigationEvents
                    onDidFocus={() => { this._laodData(); console.log(this.props) }}
                />
                {this.props.Requests.Loading == true ? <ActivityIndicator size='large' color='#5473a9' /> : <View />}
                {this.props.Requests.Allrequests.length == 0 && this.props.Requests.Loading == false ? <View style={{ flex: 1, justifyContent: 'center' }} >
                    <Text style={{ color: '#fcb72b', alignSelf: 'center', fontSize: 20, fontFamily: Fonts.Helvetica }} > No History For You </Text>
                </View> : <HistoryList data={this.props.Requests.Allrequests.reverse()} />
                }
            </ScrollView>
        
        )

    }
}
const mApsateToProps = state => {
    return {
        Requests: state.Requests,
        Info: state.GymInfo,
    }
}
export default connect(mApsateToProps, { AllRequsetss, Me })(HistoryForGyms)