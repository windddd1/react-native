import React,{ useState, useEffect, useMemo, Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, FlatList, Image  } from 'react-native'
import Items from '../constants/mocks'
import { objectMethod } from '@babel/types';
import { ThemeColors } from 'react-navigation';

const { width, height } = Dimensions.get('screen')

const styles = StyleSheet.create({
    flex: {
        flex:1
    },
    column: {
        flexDirection: 'column'
    },
    row: {
        flexDirection: 'row'
    },
    header: {
        backgroundColor: 'transparent',
        paddingHorizontal: 36,
        paddingTop: 48,
        paddingBottom: 24
    },
    layoutHeader: {
        justifyContent: "space-between",
        alignItems: 'center'

    },
    marginItem: {
        marginTop:-10
    },
    // articles: {
    //     paddingHorizontal: 36,
    // },
    destination: {
        width: width - (36 * 2),
        height: width * 0.6,
        marginHorizontal: 36,
        paddingHorizontal:36,
        paddingVertical:24,
        borderRadius: 12,
        position: 'relative',
        overflow: 'visible',
    },
    destinationInfo: {
        position: 'absolute',
        height: width * 0.25,
        paddingVertical: 20,
        paddingHorizontal: 36,
        bottom: -36,
        right: 36,
        left: 36,
        borderRadius: 12,
        backgroundColor: 'white',
        zIndex: 3
    },
    recommended: {
        paddingHorizontal: 36,
    },
    avatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
    },
    name: {
        fontSize: 14,
        color:'white',
        fontWeight: 'bold'
    },
    location: {
        fontSize: 11,
        color:'white'
    },
    rating: {
        fontSize: 28,
        color: 'white'
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 5,
    },
})

export default List = (props) => {

    renderDestinations = () => {
        return (
            <View style={[ {flex:0.6}, styles.column]}>
                <FlatList 
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    data={Items}
                    keyExtractor={( item,index ) => `${item.id}`}
                    renderItem={({item}) => renderDestinationItem(item)}
                >
                </FlatList>
            </View>
        )
    }

    renderDestinationItem = (item) => {
        return (
            <ImageBackground 
                style={[styles.flex, styles.destination, styles.shadow]}
                imageStyle={{ borderRadius: 12 }}
                source={{ uri: item.preview }}
            >
                <View style={[styles.row]}>
                    <View>
                        <Image source={{ uri:item.user.avatar }} style={styles.avatar}/>
                    </View>
                    <View style={[ styles.column, {paddingHorizontal: 26}]}>
                            <Text style={styles.name}>{item.user.name}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                    </View>
                    <View style={[styles.flex,{ alignItems: 'flex-end'}]}>
                        <Text style={styles.rating}>{item.rating}</Text>
                    </View>
                </View>
                <View style={[styles.destinationInfo,styles.shadow]}>
                    <Text style={{ fontWeight: '500', fontSize: 18, paddingVertical: 4}}>{item.title}</Text>
                    <Text style={{ color: 'grey', fontSize:12}}>{item.description}</Text>
                </View>
            </ImageBackground>
        )
    }
    renderRecommended = () => {
        return (
            <View style={[ {flex:0.4}, styles.column, styles.recommended]}>
                <Text>Recommended</Text>
            </View>
        )
    }

    return (
        <View style={[styles.flex, styles.articles]}>
            {renderDestinations()}
            {renderRecommended()}
        </View>
    )
}

List.navigationOptions = {
    header: (
        <View style={[ styles.row, styles.header, styles.layoutHeader]}>
            <View>
                <Text>Search for place</Text>
                <Text style={{ fontSize: 24 }}>Destination</Text>
            </View>
            <View>
                <Text>Avatar</Text>
            </View>
        </View>
    )
}