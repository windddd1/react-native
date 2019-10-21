import React, { Component } from 'react'
import { FlatList, StyleSheet, View, Button } from 'react-native'
import FlatListItem from './FlatListItem'
import Spinner from 'react-native-loading-spinner-overlay'
import AddModal from './AddModal'
import AuthsActions from '../redux/_user-redux'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    getListUser: () => dispatch(AuthsActions.getUserRequest()),
    deleteUser: (id) => dispatch(AuthsActions.deleteUserRequest(id))
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
            openModal:true            
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
    //TODO: press btn add
    addItem = () => {
        this.setState({
            openModal : true
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) { //TODO: To interact to data from api return
        // do things with nextProps.someProp and prevState.cachedSomeProp
        if (nextProps.userCollection !== prevState.userCollection) {
            return {
                userCollection: nextProps.data,
            }
        }
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
                            onPress={() => this.addItem()}
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
                <AddModal  parentFlatList={this} openModal={this.state.openModal}>

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