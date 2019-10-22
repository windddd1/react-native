import React, { Component } from 'react'
import { View, TextInput, Dimensions, Platform, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import UsersActions from '../redux/_user-redux'
import { connect } from 'react-redux';
import Button from 'react-native-button'
import ModalBoxActions from '../redux/_modalBox-redux'


const mapDispatchToProps = dispatch => ({
    postUser : (user) => {dispatch(UsersActions.postUserRequest(user))},
    changeFlagModalBox : () => {dispatch(ModalBoxActions.changeFlagModalBox())}
})

const screen = Dimensions.get('window')

const mapStateToProps = state => {
    return {
        title: state.modalBox.data.title,
        id: state.modalBox.data.id,
        body: state.modalBox.data.body,
        flag: state.modalBox.data.flag
    }
}

export class AddModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            title: '',
            id: '',
            body: ''          
        })
    }
    static getDerivedStateFromProps(nextProps, prevState) { //TODO: To interact to data from api return
        // do things with nextProps.someProp and prevState.cachedSomeProp
        if (nextProps.title !== prevState.title) {
            return {
                title: nextProps.title,
                id: nextProps.id,
                body: nextProps.body,
            }
        }
        return null
    }

    // componentDidUpdate(prevProps) {
    //     if(prevProps.title !== this.props.title) {
    //         this.setState({title: this.props.title})
    //     }
    //     if(prevProps.id !== this.props.id) {
    //         this.setState({id: this.props.id})
    //     }
    //     if(prevProps.body !== this.props.body) {
    //         this.setState({body: this.props.body})
    //     }
    // }
    render() {
        return (
            <Modal
                isOpen={this.props.flag}
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
                onClosed={() => {this.props.changeFlagModalBox()}}
            >
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 40
                }}>{this.state.title}</Text>
                <TextInput
                    style={styles.inputWrapper}
                    onChangeText={(text) => this.setState({ id: text })}
                    placeholder="Enter Id"
                    value={this.state.id}
                />
                <TextInput
                    style={styles.inputWrapper}
                    onChangeText={(text) => this.setState({ body: text })}
                    placeholder="Enter Body"
                    value={this.state.body}
                />
                <View style={{justifyContent: 'center',flexDirection: 'row'}}>
                    <Button
                        style={{ fontSize: 20, color: 'white' }}
                        containerStyle={{ padding: 10, height: 45,width:100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#40b883' }}
                        onPress={() => {
                            if (this.state.id.length == 0 || this.state.body.length == 0) {
                                alert("You must enter id and body");
                                return
                            }
                            const newUser = {
                                id: this.state.id,
                                body: this.state.body,
                            }
                            this.setState({ 
                                    id:'',
                                    body: ''
                            })
                            this.props.changeFlagModalBox()
                            this.props.postUser(newUser)
                        }}>
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