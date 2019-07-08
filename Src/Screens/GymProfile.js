import React from 'react';
import { AsyncStorage, View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import Profile from '../Component/GymProfile';
import HistoryButton from '../Component/HistoryButton';
import GymRequests from '../Component/GymRequests';
import { connect } from 'react-redux';
import { AllRequsets } from '../Actions/RequestForGyms';
import { NavigationEvents } from 'react-navigation';
import Button from '../Component/Button';
class GymProfile extends React.Component {
    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: 'white'
    }
    state = {
        ref: false
    }
    handelOnRefresh = ()=>{
        this.setState({ref: true},()=>{
            this.props.AllRequsets(this.props.Info._id)
            this.setState({ref: false})
        })
    }
    render() {
        return (
            <View style={{ backgroundColor: 'black', flex: 1 }}>
                <ScrollView refreshControl={<RefreshControl refreshing={this.state.ref} onRefresh={this.handelOnRefresh} />} >
                    <Profile onPress={() => { this.props.navigation.navigate('Charge') }} />
                    <HistoryButton onPress={() => { this.props.navigation.navigate('HistoryForGyms') }} />
                    <GymRequests />
                </ScrollView>
                <Button style={styles.container} textStyle={styles.Text} Text='Log out' onPress={() => { AsyncStorage.clear().then(() => { this.props.navigation.navigate('LoadingScreen') }) }} />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333333', marginTop: 20, alignSelf: 'center', width: '40%', padding: 5
    },
    Text: {
        color: '#fcb72b', fontSize: 20, fontWeight: 'bold', alignSelf: 'center'
    }
})
const mapStateToProps = state => {
    return {
        Requsests: state.Requests,
        Info: state.GymInfo,
        AcceptOrDecline: state.AcceptOrDecline
    }
}
export default connect(mapStateToProps,{AllRequsets})(GymProfile)