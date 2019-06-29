import React from 'react';
import { View, Text } from 'react-native';
import Dialog, { DialogButton, DialogFooter, DialogContent } from 'react-native-popup-dialog';
class DialogComponent extends React.Component {
    state = {
        f: false
    }
    render() {
        return (
            <View>
                <Dialog dialogStyle={{ width: '80%' }}
                    containerStyle={{ width: '100%' }}
                    visible={this.props.visible}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                text="CANCEL"
                                onPress={this.props.onCansel}
                            />
                            <DialogButton
                                text="OK"
                                onPress={() => {
                                    alert('ok')
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    {/* <DialogContent style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ color: 'black', fontSize: 15, alignSelf: 'center', textAlignVertical: 'center' }} >Are You Sure To Accept The Request</Text>
                    </DialogContent> */}
                </Dialog>
            </View>
        )
    }
}
export default DialogComponent