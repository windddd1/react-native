import React,{ useState, useEffect, useMemo } from 'react';
import { FlatList, StyleSheet, View, Button } from 'react-native'
import FlatListItem from './HookItemDetail'
import AddModal from './HookAddModal'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import UserActions from '../redux/_user-redux'
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

function BasicFlatList(props) {
    //TODO: declare state
    const [userCollection, setUserCollection] = useState([])
    const [deleteKey, setDeleteKey] = useState(undefined)

    useEffect(() => {
        props.getListUser()
    }, [])

    useMemo(() => {
        setUserCollection(Object.values(props.data))
    }, [props.data])

    refreshFlatList = (key) => {
        console.log(key)
        setDeleteKey(key)
    }

    return (
        <View style={{ flex: 1 }}>
            <Spinner
                visible={props.processing}
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
                    style={{ width: 100, height: 35, marginRight: 20 }}
                    onPress={() => props.openModalAddUser({
                        title: 'Add User',
                        id: '',
                        body: '',
                        flag: true
                    })}
                />
            </View>
            <FlatList
                data={userCollection}
                keyExtractor={(item, index) => index.toString()}    //TODO:Chosse key for a item
                renderItem={({ item, index }) => {
                    return (
                        <FlatListItem item={item} index={index} refreshFlatList={BasicFlatList} ></FlatListItem>
                    )
                }}
            >
            </FlatList>
            <AddModal  parentFlatList={BasicFlatList} >

            </AddModal>
        </View>
    )
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