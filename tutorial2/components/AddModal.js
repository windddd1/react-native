import React, { Component } from 'react'
import { View, TextInput, Dimensions, Platform, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import AuthsActions from '../redux/_user-redux'
import { connect } from 'react-redux';
import Button from 'react-native-button';



const mapDispatchToProps = dispatch => ({

})

const screen = Dimensions.get('window')

const mapStateToProps = state => {
    return {
        processing: state.user.processing,
        data: state.user.data.userList,
        error: state.user.error
    }
}

export class AddModal extends React.Component {
    showAddModal = () => {
        this.refs.myModal.open();
    }
    render() {
        return (
            <Modal
                isOpen={this.props.openModal}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'ios' ? 30 : 0,
                    shadowRadius: 10,
                    width: screen.width - 80,
                    height: 280,
                    borderRadius: 4
                }}
                position='center'
                backdrop={true}
                onClosed={() => {
                }}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>Add User</Text>
                <TextInput
                    style={styles.inputWrapper}
                    onChangeText={(text) => this.setState({})}
                    placeholder="Enter Id"
                />
                <TextInput
                    style={styles.inputWrapper}
                    onChangeText={(text) => this.setState({})}
                    placeholder="Enter Body"
                />
               <View style={{justifyContent: 'center',flexDirection: 'row'}}>
               <Button
                    style={{ fontSize: 20, color: 'white' }}
                    containerStyle={{ padding: 10, height: 45,width:100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#40b883' }}
                    onPress={() => this._handlePress()}>
                    Add
                </Button>
               </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    inputWrapper: {
        height: 40,
        borderBottomColor: 'gray',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 10,
        marginBottom: 20,
        borderBottomWidth: 1
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModal)