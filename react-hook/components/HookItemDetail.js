import React, { useState } from 'react'
import { StyleSheet, Text, View, Alert } from 'react-native'
import UsersActions from '../redux/_user-redux'
import ModalBoxActions from '../redux/_modalBox-redux'
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout'

const mapDispatchToProps = dispatch => ({
    deleteUser: (id) => dispatch(UsersActions.deleteUserRequest(id)),
    openModalEditUser: (info) => dispatch(ModalBoxActions.setInfoModalBox(info))
})

const mapStateToProps = state => {
    return {
    }
}  

function FlatListItem (props) {
    const [activeRowKey, setActiveRowKey] = useState(undefined)

    const swipeoutSetting = {
        autoClose: true,
        onClose: (secId, rowId, direction) => {
            if (activeRowKey !== null) {
                setActiveRowKey({activeRowKey: null})
            }
        },
        onOpen: (secId, rowId, direction) => {
            setActiveRowKey({activeRowKey: props.item.key})
        },
        right: [
            {
                onPress: () => {
                    Alert.alert(
                        'Alert',
                        'Are you sure want to delete this item?',
                        [
                            { text: 'No', style: 'cancel'},
                            { text: 'Yes', onPress : () => {
                                props.deleteUser(props.item.id)
                                // props.parentFlatList.refreshFlatList(activeRowKey)  //sync ???
                            }}
                        ],
                        { cancelable: true }
                    )
                },
                text: 'Delete',
                type: 'delete'
            }
        ],
        left: [
            {
                onPress: () => {
                    props.openModalEditUser({
                        title: 'EDIT',
                        id: props.item.id,
                        body: props.item.body,
                        flag: true
                    })
                },
                text: 'Edit',
                type:'primary'
            }
        ],
        rowId: props.index,
        sectionId:1
    }
    return (
        <Swipeout {...swipeoutSetting}>
            <View style={{flex:1, backgroundColor:'#40b883' , marginBottom:2}}>
                <Text style={styles.flatListItem}>{props.item.id.toString()}</Text>
                <Text style={styles.flatListItem} >{props.item.body}</Text>
            </View>
        </Swipeout>
    )
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 13
    },
})

export default connect(mapStateToProps, mapDispatchToProps) (FlatListItem)