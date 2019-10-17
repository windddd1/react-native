import React, { Component } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import AuthsActions from '../redux/_user-redux'
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => ({
    getListUser: () => dispatch(AuthsActions.getUserRequest())
})

const mapStateToProps = state => {
    return {
      processing: state.user.processing,
      data: state.user.data.userList,
      error: state.user.error
    }
}  

class FlatListItem extends Component {
    render() {
        return (
            <View style={{flex:1, backgroundColor:this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato'}}>
                <Text style={styles.flatListItem}>{this.props.item.userId}</Text>
                <Text >{this.props.item.body}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    flatListItem: {
        color: 'white',
        padding: 10,
        fontSize: 16 
    }
})

export class BasicFlatList extends React.Component {
    componentDidMount() {
        this.props.getListUser()
        console.log(this.props.data)
    }
    render(){
        return (
            <View style= {{flex: 1, marginTop: 22}}>
                <FlatList
                    data={Object.values(this.props.data)}
                    renderItem={({item,index}) => {
                        return (
                            <FlatListItem item={item} index={index}></FlatListItem>
                        )
                    }}
                >
                </FlatList>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (BasicFlatList)