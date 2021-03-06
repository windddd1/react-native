import React, { Component } from 'react'
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

export class FlatListItem extends Component {
    state = {
        activeRowKey: null
    }
    render() {
        const swipeoutSetting = {
            autoClose: true,
            onClose: (secId, rowId, direction) => {
                if (this.state.activeRowKey !== null) {
                    this.setState({activeRowKey: null})
                }
            },
            onOpen: (secId, rowId, direction) => {
                this.setState({activeRowKey: this.props.item.key})
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
                                    this.props.deleteUser(this.props.item.id)
                                    // this.props.parentFlatList.refreshFlatList(this.state.activeRowKey)  //sync ???
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
                        this.props.openModalEditUser({
                            title: 'EDIT',
                            id: this.props.item.id,
                            body: this.props.item.body,
                            flag: true
                        })
                    },
                    text: 'Edit',
                    type:'primary'
                }
            ],
            rowId: this.props.index,
            sectionId:1
        }
        return (
            <Swipeout {...swipeoutSetting}>
                <View style={{flex:1, backgroundColor:'#40b883' , marginBottom:2}}>
                    <Text style={styles.flatListItem}>{this.props.item.id.toString()}</Text>
                    <Text style={styles.flatListItem} >{this.props.item.body}</Text>
                </View>
            </Swipeout>
        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 13
    },
})

export default connect(mapStateToProps, mapDispatchToProps) (FlatListItem)