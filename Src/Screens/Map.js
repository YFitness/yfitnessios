// import React from 'react';
// import { View, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native';
// import { connect } from 'react-redux';
// import { GetOrCheckForPermisions, modal } from '../Actions/Maps';
// import { Me } from '../Actions/MyInfo';
// import { AllGyms } from '../Actions/AllGymsForMap';
// import MapComponent from '../Component/Map';
// import NotficatonButton from '../Component/NotficatonButton';
// const { height, width } = Dimensions.get('window')
// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
// const Sty = require('../Styles/Map.json')
// const Loadding = () => (
//     <View style={{ flex: 1, justifyContent: 'center' }} >
//         <ActivityIndicator size='large' color='#ffffbe' />
//     </View>
// )
// const latitudeDelta = 0.0922
// const ASS = SCREEN_WIDTH / SCREEN_HEIGHT
// const longitudeDelta = latitudeDelta * ASS;
// class Map extends React.Component {
//     constructor(props) {
//         super(props)
//         props.AllGyms()
//         // this.loadMyInfo()
//         this.WatchId = null
//     }
//     state = {
//         Init_region: {
//             longitude: 29.924526,
//             latitude: 31.205753,
//             latitudeDelta: 0.1,
//             longitudeDelta: 0.1
//         },
//         markerPos: {
//             longitude: 0,
//             latitude: 0,
//             latitudeDelta: 0,
//             longitudeDelta: 0
//         },
//         region:{
//             longitude: 0,
//             latitude: 0,
//             latitudeDelta: 0,
//             longitudeDelta: 0
//         }
//     }
//     onlocationbuttonPress(){
//         navigator.geolocation.getCurrentPosition((pos) => {
//             const latitude = parseFloat(pos.coords.latitude)
//             const longitude = parseFloat(pos.coords.longitude)
//             let region = {
//                 longitude,
//                 latitude,
//                 latitudeDelta,
//                 longitudeDelta
//             }
//             this.setState({ region: region })
//             // this.setState({markerPos: region})
//         }, (e) => {
//             if (e.code == 2) {
//                 alert('Please Open Location Service')
//             } else {
//                 alert(`${e.message}`)
//             }
//         }, { timeout: 60000, enableHighAccuracy: true })
//     }
//     MyLocation() {
//         navigator.geolocation.getCurrentPosition((pos) => {
//             const latitude = parseFloat(pos.coords.latitude)
//             const longitude = parseFloat(pos.coords.longitude)
//             let region = {
//                 longitude,
//                 latitude,
//                 latitudeDelta,
//                 longitudeDelta
//             }
//             this.setState({ Init_region: region })
//             // this.setState({markerPos: region})
//         }, (e) => {
//             if (e.code == 2) {
//                 alert('Please Open Location Service')
//             } else {
//                 alert(`${e.message}`)
//             }
//         }, { timeout: 60000, enableHighAccuracy: true })

//         this.WatchId = navigator.geolocation.watchPosition((pos) => {
//             let region = {
//                 longitude: parseFloat(pos.coords.longitude),
//                 latitude: parseFloat(pos.coords.latitude),
//                 latitudeDelta,
//                 longitudeDelta
//             }
//             this.setState({ markerPos: region })
//         }, (e) => {
//             alert(e.message)
//         })
//     }
//     componentWillUnmount() {
//         navigator.geolocation.clearWatch(this.WatchId)
//     }
//     loadMyInfo() {
//         try {
//             AsyncStorage.getItem('token')
//                 .then((token) => {
//                     if (token != null) {
//                         this.props.Me(token)
//                     } 
//                 })
//         } catch (er) {
//             // this.props.navigation.navigate('Auth')
//             alert(er)
//         }
//     }
//     componentDidMount() {
//         this.props.GetOrCheckForPermisions()
//         this.MyLocation()
//         this.loadMyInfo()
//     }

//     HandelTime(time) {
//         if (time > 12) {
//             //pm
//             return `${time - 12} PM`
//         } else {
//             return `${time} AM`
//         }
//     }
//     show() {
//         if (this.props.All.Gyms.length == 0) {
//             return <Loadding />
//         } else {
//             return (
//                 <View style={{ flex: 1, }} >
//                     <NotficatonButton onPress={() => { this.onlocationbuttonPress() }} />
//                     <MapComponent
//                         me={this.state.markerPos}
//                         Init_region={this.state.Init_region}
//                          region={this.state.Init_region}
//                         AllGyms={this.props.All.Gyms}
//                         onMarkerPress={(item) => {
//                             const Id = this.props.Info._id
//                             if (item.name != '') {
//                                 this.props.navigation.navigate('GymDetails', {
//                                     GymId: item._id,
//                                     Name: item.Name,
//                                     Points: item.OneClass,
//                                     UserId: Id,
//                                     Man: item.Working.Man,
//                                     Women: item.Working.Women,
//                                 })
//                             }
//                         }
//                         }
//                         mapStyle={Sty}
//                     />
//                 </View>
//             )
//         }
//     }
//     render() {
//         return this.show()
//     }
// }
// const mapStateToProps = state => {
//     return {
//         Info: state.MyInfo,
//         All: state.AllGymsForMap
//     }
// }
// export default connect(mapStateToProps, { GetOrCheckForPermisions, modal, Me, AllGyms })(Map)

import React from 'react';
import { View, Dimensions, ActivityIndicator, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { MyPlace, GetOrCheckForPermisions, modal } from '../Actions/Maps';
import { Me } from '../Actions/MyInfo';
import { AllGyms } from '../Actions/AllGymsForMap';
import MapComponent from '../Component/Map';
import NotficatonButton from '../Component/NotficatonButton';
const { height, width } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const Sty = require('../Styles/Map.json')
const Loadding = () => (
    <View style={{ flex: 1, justifyContent: 'center' }} >
        <ActivityIndicator size='large' color='#ffffbe' />
    </View>
)
class Map extends React.Component {
    constructor(props) {
        super(props)
        props.AllGyms()
        this.loadMyInfo()
    }
    
    
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
    componentDidMount() {
        this.props.GetOrCheckForPermisions()
        this.onMyPlace()
    }
    onMyPlace(){
    this.props.MyPlace(SCREEN_WIDTH, SCREEN_HEIGHT)
    }
    HandelTime(time) {
        if (time > 12) {
            //pm
            return `${time - 12} PM`
        } else {
            return `${time} AM`
        }
    }
    show() {
        if (this.props.All.Gyms.length == 0) {
            return <Loadding />
        } else {
            return (
                <View style={{ flex: 1, }} >
                    <NotficatonButton onPress={() => { this.onMyPlace() }} />
                    <MapComponent
                        me={this.props.map.region}
                        Init_region={ this.props.map.region || this.props.map.Init_region}
                        region={this.props.map.region}
                        AllGyms={this.props.All.Gyms}
                        onMarkerPress={(item) => {
                              const Id = this.props.Info._id
                              if (item.name != '') {
                                  this.props.navigation.navigate('GymDetails', {
                                      GymId: item._id,
                                      Name: item.Name,
                                      Points: item.OneClass,
                                      UserId: Id,
                                      Man: item.Working.Man,
                                      Women: item.Working.Women,
                                  })
                              }
                        }
                    
                    }
                        mapStyle={Sty}
                    />
                </View>
            )
        }
    }
    render() {
        return this.show()
    }
}
const mapStateToProps = state => {
    return {
        map: state.Maps,
        Info: state.MyInfo,
        All: state.AllGymsForMap
    }
}
export default connect(mapStateToProps, { MyPlace, GetOrCheckForPermisions, modal, Me, AllGyms })(Map)