import React,{ useState, useEffect, useMemo, Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, ImageBackground, FlatList, TouchableOpacity, Image, Animated  } from 'react-native'
import Items from '../constants/mocks'
import Icon from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'

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
    containerDestination: {
        width: width - (36 * 2),
        height: width * 0.7,
        marginHorizontal:36,
        borderRadius: 12
    },
    destination: {
        paddingHorizontal:36,
        paddingVertical:24,
        borderRadius: 12,
        position: 'relative',
        overflow: 'visible',
    },
    destinationInfo: {
        position: 'absolute',
        height: width * 0.25,
        paddingVertical: 16,
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
        shadowOpacity: 0.07,
        shadowRadius: 10,
        elevation: 5,
    },
    dots: {
        width: 11,
        height: 11,
        borderRadius: 6,
        borderWidth:0.5,
        borderColor: '#1876FE',
        marginHorizontal: 4
    },
    activeDot: {
        borderColor: '#1876FE',
        backgroundColor: 'white'
    },
    fisrtRecommendation: {
        marginLeft: 36,
        marginRight: 18
    },
    lastRecommendation: {
        marginRight: 36
    },
    contentRecomedation: {
        fontSize:16,
        color:'white',
    },
    cardRecomedation : {
        height:height*0.11,
        borderWidth: 0.05,
        marginBottom:10,
        paddingTop:10, 
        paddingLeft:10,
        backgroundColor: 'white',
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12
    }
})

export default List = (props) => {

    scrollx = new Animated.Value(0)
    renderDestinations = () => {
        return (
            <View style={[ {flex:0.55}, styles.column]}>
                <FlatList 
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    decelerationRate={0}
                    snapToAlignment="center"
                    data={Items}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx }} }])}
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
            <TouchableOpacity  style={styles.containerDestination} activeOpacity={0.95} onPress={()=>{props.navigation.navigate('Article', { article: item })}}>
                <ImageBackground 
                    style={[styles.flex, styles.destination, styles.shadow]}
                    imageStyle={{ borderRadius: 12 }}
                    source={{ uri: item.preview }}
                >
                    <View style={[styles.row]}>
                        <View>
                            <Image source={{ uri:item.user.avatar }} style={styles.avatar}/>
                        </View>
                        <View style={[ styles.column, {paddingHorizontal: 20}]}>
                                <Text style={styles.name}>{item.user.name}</Text>
                                <Text style={[styles.location]}><Icon name="map-marker" size={12} color="#eeeeee"/> {item.location}</Text>
                        </View>
                        <View style={[styles.flex,{ alignItems: 'flex-end'}]}>
                            <Text style={styles.rating}>{item.rating} <Icon name="star" size={22}/></Text>
                        </View>
                    </View>
                    <View style={[styles.destinationInfo,styles.shadow]}>
                        <Text style={{ fontWeight: '500', fontSize: 18, paddingVertical: 4}}>{item.title}</Text>
                        <View style={[styles.row,{alignItems:'flex-end',justifyContent:'space-between'}]}>
                            <Text style={{ color: '#BDBDBD', fontSize:12}}>{item.description.slice(0, 60)}{item.description.length > 60 ? '...' : ''}</Text>
                            <Icon name="chevron-right" size={12} color='#BDBDBD' />
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
    renderDots = () => {
        const dotPosition = Animated.divide(scrollx, width)
        return (
            <View style={[ styles.row, {justifyContent: 'center'}]}>
                {
                    Items.map((item, index) => {
                        const borderWidth = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: [0, 2, 0],
                            extrapolate: 'clamp'
                        })
                        const backgroundColor = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: ['#DCE0E9', 'white', '#DCE0E9'],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View key={`step-${item.id}`} 
                                style={[styles.dots, { borderWidth: borderWidth,backgroundColor:backgroundColor }]}
                            />
                        )
                    })
                }
            </View>
        )
    }
    renderRating = (rating) => {
        const stars = new Array(5).fill(0)
        return (
            stars.map((item, index) => {
                let activeStar
                Math.floor(rating) >= (index + 1) ? activeStar = true : activeStar = false
                return ( 
                    <Text key={`star-${index}`} style={{paddingRight:10}}>
                        <Icon
                        name="star"
                        size={12}
                        color={activeStar ? '#1876FE' : '#BBDEFB'}
                        />
                        <Text> </Text>
                    </Text>
                )
            })
        )
    }
    renderRecommendation = (item,index) => {
        let margin = { marginRight:23 }
        index === 0 ? margin = styles.fisrtRecommendation: ''
        index === Items.length - 1 ? margin = styles.lastRecommendation: ''
        return (
            <View>
                <ImageBackground
                    style={[margin,{width: width*0.29, height: height*0.15,marginTop:15}]}
                    imageStyle={{ borderTopRightRadius: 12,borderTopLeftRadius: 12 }}
                    source={{ uri: item.preview }}
                >
                <View style={[styles.row,{marginTop:10,justifyContent:'space-between',paddingHorizontal:10}]}>
                    <Text style={styles.contentRecomedation}>{item.temperature}℃</Text>
                    <TouchableOpacity onPress={() =>{ item.saved = !item.saved} }><Icon name={item.saved ? 'bookmark' : 'bookmark-o'} size={18} color="#eeeeee"/></TouchableOpacity>
                </View>
                </ImageBackground>
                <View style={[margin,styles.shadow,styles.cardRecomedation]}>
                    <Text style={{ fontSize:14, fontWeight: '500'}}>{item.title}</Text>
                    <Text style={{ color:'#BDBDBD'}}>{item.location}</Text>
                    <Text style={{ color: '#1876FE',marginTop:3}}>{renderRating(item.rating)} {item.rating}</Text>
                </View>
            </View>
        )
    }
    renderRecommended = () => {
        return (
            <View style={[ {flex:0.45}, styles.column, styles.recommended, styles.shadow]}>
                <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'flex-end',paddingHorizontal:36}}>
                    <Text style={{fontSize:18, fontWeight:'700'}}>Recommended</Text>
                    <Text style={{color:'#BDBDBD',fontWeight:'700'}}>More</Text>
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
                <Text style={{color:'#BDBDBD',fontWeight:'700', fontSize:12}}>Search for place</Text>
                <Text style={{ fontSize: 24 , fontWeight:'700'}}>Destination</Text>
            </View>
            <View>
                <Image style={styles.avatar} source={{uri :'https://cloudcone.com/wp-content/uploads/2019/03/blank-avatar.jpg'}}></Image>
            </View>
        </View>
    )
}