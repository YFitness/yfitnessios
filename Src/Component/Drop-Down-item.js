import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import DropDownItem from 'react-native-drop-down-item';

export default class DropDownitem extends React.Component {
    state = {
        Man: {
            Saturday: [{From: 10,To: 5}],
            Monday: [{From: 12,To: 5}]
        }
    };
    render() {
        const Days = Object.keys(this.props.Data)
        return (
            <View style={{ flex: 1 }}>
                <Text style={{fontSize: 20, color: 'red', marginLeft: 10, marginBottom:10}} >{this.props.Gender}: </Text>
                <ScrollView style={{ alignSelf: 'stretch' }}>
                    {
                        this.props.Data
                            ? Days.map((param, i) => {
                                return (
                                    <DropDownItem
                                        key={i}
                                        style={{marginVertical: 10, marginLeft: 15}}
                                        contentVisible={false}
                                        header={
                                            <View>
                                                <Text style={{
                                                    fontSize: 16,
                                                    color: 'blue',
                                                }}>{param}</Text>
                                            </View>
                                        }
                                    >
                                        {
                                            this.props.Data[param].map((edf,inde)=>{
                                               return <Text key={inde} >{`${edf.From} : ${edf.To}`}</Text>
                                            })
                                        }
                                    </DropDownItem>
                                );
                            })
                            : null
                    }
                    <View style={{ height: 96 }} />
                </ScrollView>
            </View>
        );
    }
}
