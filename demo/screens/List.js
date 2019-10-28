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
        height: width * 0.55,
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
    dots: {
        width: 10,
        height: 10,
        borderRadius: 6,
        borderWidth:2,
        borderColor: 'transparent',
        marginHorizontal: 4
    },
    activeDot: {
        borderColor: '#007BFA',
        backgroundColor: 'white'
    },
    nonActiveDot: {
        backgroundColor: '#DCE0E9',
    },
    fisrtRecommendation: {
        marginLeft: 36,
        marginRight: 18
    },
    lastRecommendation: {
        marginRight: 36
    },
    contentRecomedation: {
        color:'white',
        marginTop:10,
        marginLeft:10
    }
})

export default List = (props) => {

    renderDestinations = () => {
        return (
            <View style={[ {flex:0.55}, styles.column]}>
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
                {renderDots()}
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
    renderDots = () => {
        return (
            <View style={[ styles.row, {justifyContent: 'center'}]}>
                {
                    Items.map(item => {
                        return (
                            <View key={`step-${item.id}`} style={[styles.dots, item.id === 1 ? styles.activeDot:styles.nonActiveDot]}>
                                
                            </View>
                        )
                    })
                }
            </View>
        )
    }
    renderRecommendation = (item,index) => {
        let margin = { marginRight:18 }
        index === 0 ? margin = styles.fisrtRecommendation: ''
        index === Items.length - 1 ? margin = styles.lastRecommendation: ''
        return (
            <View>
                <ImageBackground
                    style={[margin,{width: width*0.33, height: height*0.18,marginTop:15}]}
                    imageStyle={{ borderTopRightRadius: 12,borderTopLeftRadius: 12 }}
                    source={{ uri: item.preview }}
                >
                <View>
                    <Text style={styles.contentRecomedation}>{item.temperature}℃</Text>
                </View>
                </ImageBackground>
            </View>
        )
    }
    renderRecommended = () => {
        return (
            <View style={[ {flex:0.45}, styles.column, styles.recommended, styles.shadow]}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',paddingHorizontal:36}}>
                    <Text style={{fontSize:18, fontWeight:'600'}}>Recommended</Text>
                    <Text style={{color:'#BCCCD4'}}>More</Text>
                </View>
                <View style={[styles.column, styles.recommendedList]}>
                    <FlatList
                        horizontal
                        scrollEnabled
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        snapToAlignment="center"
                        data={Items}
                        keyExtractor={( item,index ) => `${item.id}`}
                        renderItem={({item,index}) => renderRecommendation(item,index)}
                    >
                </FlatList>
                </View>
            </View>
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.flex, styles.articles]}>
            {renderDestinations()}
            {renderRecommended()}
        </ScrollView>
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
                <Image style={styles.avatar} source={{uri :'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'}}></Image>
            </View>
        </View>
    )
}