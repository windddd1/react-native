import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Button } from 'react-native'
import FlatListItem from './FlatListItem'
import Spinner from 'react-native-loading-spinner-overlay'
import AddModal from './AddModal'
import UserActions from '../redux/_user-redux'
import { connect } from 'react-redux'
import ModalBoxActions from '../redux/_modalBox-redux'


const mapDispatchToProps = dispatch => ({
    getListUser: () => dispatch(UserActions.getUserRequest()),
    deleteUser: (id) => dispatch(UserActions.deleteUserRequest(id)),
    openModalAddUser: (info) => dispatch(ModalBoxActions.setInfoModalBox(info))
})

const mapStateToProps = state => {
    return {
        processing: state.user.processing,
        data: state.user.data.userList,
        error: state.user.error 
    }
}

export class BasicFlatList extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            userCollection: [],
            deleteKey: null,     
        })   
    }

    componentDidMount() {
        this.props.getListUser()
    }
    //TODO: refresh item after delete or add or edit
    refreshFlatList(key) {
        this.setState({
            deleteKey: key
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) { //TODO: To interact to data from api return
        // do things with nextProps.someProp and prevState.cachedSomeProp
        if (nextProps.data !== prevState.userCollection) {
            return {
                userCollection: nextProps.data,
            }
        }
        return null
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Spinner
                    visible={this.props.processing}
                    textContent={'Loading...'}
                    textStyle={styles.spinnerTextStyle}
                />
                <View style={{
                    backgroundColor: '#435b71',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    height: 64
                }}>
                        <Button
                            title="Add"
                            color="#40b883"
                            style={{ width: 100, height: 35, marginRight:20 }}
                            onPress={() => this.props.openModalAddUser({
                                title: 'Add User',
                                id: '',
                                body: '',
                                flag: true
                            })}
                        />
                </View>
                <FlatList
                    data={Object.values(this.state.userCollection)}
                    keyExtractor={(item, index) => index.toString()}    //TODO:Chosse key for a item
                    renderItem={({ item, index }) => {
                        return (
                            <FlatListItem item={item} index={index} parentFlatList={this} ></FlatListItem>
                        )
                    }}
                >
                </FlatList>
                <AddModal  parentFlatList={this} >

                </AddModal>
            </View>
        )
    }
}



const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16
    },
    spinnerTextStyle: {
        color: '#FFF'
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(BasicFlatList)