import React from 'react';
import { View, Keyboard, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import Button from '../Component/Button';
import { connect } from 'react-redux';
         
import Toast, { DURATION } from 'react-native-easy-toast'
import Input from '../Component/TextInput';
import User from '../Photo/user.png';
import phone from '../Photo/phone.png';
import { setToken } from './Application';

import { Age, Mobile, RegistUser, Validate } from '../Actions/RegistUser';
class RegistUserss extends React.Component {
    static navigationOptions = {
        headerTransparent: true,
        headerTintColor: '#fcb72b'
    }
    onRegistFail(res) {
        this.refs.tost.show(res)
    }
    onRegist() {
        Keyboard.dismiss()
        const { Name, Email, Password, ConfimPassword, Age, Mobile } = this.props.Regist
        const Data = {
            Email: Email.toLocaleLowerCase(),
            Password: Password,
            ConfimPassword: ConfimPassword,
            Name: Name,
            Age: Age,
            Mobile: Mobile
        }
        const Res = Validate(Data)
        if (Res == true) {
            this.props.RegistUser(Data)
                .then(() => {
                    if (this.props.Regist.Token !== '') {
                        setToken(this.props.Regist.Token).then(() => { this.props.navigation.navigate('User') }).catch(() => { alert('InasyncStorge') })
                    }
                    else { this.refs.tost.show(this.props.Regist.Erorr) }
                }).catch((e) => { this.refs.tost.show(e) })
        } else {
            this.refs.tost.show(Res)
        }

    }

    render() {
        return (
            <View style={styles.Conatiner}>
                <View style={{ marginHorizontal: 50, alignItems: 'center' }} >
                    <Toast ref='tost' defaultCloseDelay={100} style={{ backgroundColor: 'black', borderRadius: 20 }}
                        position='center'
                        fadeInDuration={1000}
                        fadeOutDuration={1000}
                        opacity={0.8}
                        textStyle={{ color: 'white' }}
                    />
                    <Input
                        image={phone}
                        imageStyle={{ position: 'absolute', left: 20, bottom: 17, width: 20, height: 25 }}
                        style={styles.TextInput}
                        placeholder='Mobile'
                        onChangeText={(e) => { this.props.Mobile(e) }}
                        value={this.props.Regist.Mobile}
                    />
                    <Input
                        image={User}
                        imageStyle={{ position: 'absolute', left: 20, bottom: 17, width: 15, height: 30 }}
                        style={styles.TextInput}
                        placeholder='Age'
                        onChangeText={(e) => { this.props.Age(parseInt(e, 10)) }}
                    //  value={this.props.Regist.Age.toString() }
                    />
                    {this.props.Regist.Loading == true ? <ActivityIndicator size='large' color='#fcb72b' /> : <View />}
                    <Button
                        style={styles.Button}
                        textStyle={{ color: '#fcb72b', fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}
                        Text='Regist'
                        onPress={() => { this.onRegist(this.props.Regist) }}
                    />
                </View>
            </View>
        )
    }
}
const mapStateToProps = state => {
    return {
        Regist: state.Regist
    }
}
const styles = StyleSheet.create({
    TextInput: {
        paddingLeft: 70,
        paddingBottom: 5,
        borderBottomColor: '#fcb72b',
        borderBottomWidth: 0.2,
        fontSize: 20,
                
        width: '100%',
        color: '#fcb72b',
        marginVertical: 10

    },
    Button: { backgroundColor: '#333333', marginTop: 40, alignSelf: 'center', width: '100%', padding: 5 },
    Conatiner: { flex: 1, justifyContent: 'center', backgroundColor: 'black' }
})

export default connect(mapStateToProps, {
    Age,
    Mobile,
    RegistUser
})(RegistUserss)