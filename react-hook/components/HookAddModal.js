import React, { useState, useMemo } from 'react'
import { View, TextInput, Dimensions, Platform, StyleSheet, Text } from 'react-native'
import Modal from 'react-native-modalbox'
import UsersActions from '../redux/_user-redux'
import { connect } from 'react-redux';
import Button from 'react-native-button'
import ModalBoxActions from '../redux/_modalBox-redux'
import { func } from 'prop-types';


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

function AddModal (props) {
    const [title, setTitle] = useState('')
    const [id, setId] = useState('')
    const [body, setBody] = useState('')
    
    useMemo(() => {
        setId(props.id)
    },[props.id])

    useMemo(() => {
        setTitle(props.title)
    },[props.title])

    useMemo(() => {
        setBody(props.body)
    },[props.body])
    return (
        <Modal
            isOpen={props.flag}
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
            onClosed={() => {props.changeFlagModalBox()}}
        >
            <Text style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 40
            }}>{title}</Text>
            <TextInput
                style={styles.inputWrapper}
                onChangeText={(text) => setId(text)}
                placeholder="Enter Id"
                value={id}
            />
            <TextInput
                style={styles.inputWrapper}
                onChangeText={(text) => setBody(text)}
                placeholder="Enter Body"
                value={body}
            />
            <View style={{justifyContent: 'center',flexDirection: 'row'}}>
                <Button
                    style={{ fontSize: 20, color: 'white' }}
                    containerStyle={{ padding: 10, height: 45,width:100, overflow: 'hidden', borderRadius: 4, backgroundColor: '#40b883' }}
                    onPress={() => {
                        if (id.length == 0 || body.length == 0) {
                            alert("You must enter id and body");
                            return
                        }
                        const newUser = {
                            id: id,
                            body: body,
                        }
                        setId('')
                        setBody('')
                        props.changeFlagModalBox()
                        props.postUser(newUser)
                    }}>
                    Add
                </Button>
            </View>
        </Modal>
    )
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