import React,{ useState, useEffect, useMemo } from 'react';
import { StyleSheet, Dimensions, Animated, View, Text, Image, ScrollView, TouchableOpacity,ImageBackground } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

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
        justifyContent:'space-between',
        alignItems:'flex-start',
        backgroundColor: 'transparent',
        paddingHorizontal: 36,
        paddingTop: 30,
        paddingBottom: 24
    },
    layoutHeader: {
        justifyContent: "space-between",
        alignItems: 'center'

    },
    containerContent: {
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12, 
        backgroundColor:'white',
        paddingHorizontal: 36,
        paddingTop: 36
    },
    dots: {
        width: 9,
        height: 9,
        borderRadius: 6,
        borderWidth:0.5,
        marginHorizontal: 4,
        borderColor: 'transparent',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginTop:-64, // 48/2 = 24 roi 24+36=60,
        left:width-(width*0.33)
    },
})

export default Article = (props) => {
    const [flagDescription, setFlagDescription] = useState(true)
    scrollx = new Animated.Value(0)
    const {navigation} = props
    const article = navigation.getParam('article')
    // chinh lai de dynamic theo View to : line 49
    renderDots = () => {
        const dotPosition = Animated.divide(scrollx, width)
        return (
            <View style={[ styles.row, {justifyContent: 'center',marginTop:-50,marginBottom:30}]}> 
                {
                    article.images.map((item, index) => {
                        const backgroundColor = dotPosition.interpolate({
                            inputRange: [index -1, index, index + 1],
                            outputRange: ['rgba(0,0,0,.4)', 'white', 'rgba(0,0,0,.4)'],
                            extrapolate: 'clamp'
                        })
                        return (
                            <Animated.View key={`step-${item}`} 
                                style={[styles.dots, { backgroundColor:backgroundColor }]}
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
                        <FontAwesome
                        name="star"
                        size={18}
                        color={activeStar ? '#1876FE' : '#BBDEFB'}
                        />
                        <Text> </Text>
                    </Text>
                )
            })
        )
    }
    useEffect(()=>{
        console.log('start')
        return () => {
            console.log('destroy')
        }
    },[])
    renderDesciption = (description) => {
        if(flagDescription && article.description.length>155) {
            return (
                <View style={[{marginTop:20}]}>
                    <TouchableOpacity><Text style={{fontSize:18,color:'#BDBDBD'}}>{article.description.slice(0, 155)} ... <Text style={{color:"#1876FE"}} onPress={()=>{setFlagDescription(false)}}>Read more</Text></Text></TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={{marginTop:20}}>
                    <Text style={{fontSize:18,color:'#BDBDBD'}}>{article.description}</Text>
                </View>
        )
    }
    // line 90 View *// marginTop dynamic theo header// marginBottom dynamic theo dots
    return (
        <View style={[styles.flex]}>
            <View style={[styles.flex,{marginTop:-84}]}>
                <ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    showsHorizontalScrollIndicator={false}
                    decelerationRate={0}
                    scrollEventThrottle={16}
                    snapToAlignment="center"
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx }} }])}
                >
                    {
                        article.images.map((img, index) => 
                        <Image
                            key={`${index}-${img}`}
                            source={{ uri: img }}
                            resizeMode='cover'
                            style={{ width, height: width}}
                        />
                        )
                    }
                </ScrollView>
                {renderDots()}
            </View>
            <View style={[styles.flex,styles.containerContent]}>
                <Image style={[styles.avatar]} source={{ uri: article.user.avatar }}/>
                <Text style={{fontSize:24, fontWeight:'bold'}}>{article.title}</Text>
                <View style={[styles.row,{marginTop:15}]}>
                    <Text style={{ color: '#007BFA',fontSize:18}}>{renderRating(article.rating)} {article.rating}</Text>
                    <Text style={{fontSize:18,color:'#BDBDBD',marginLeft:5}}>( {article.reviews} Reviews)</Text>
                </View>
                {renderDesciption(article.description)}
            </View>
        </View>
    )
}

Article.navigationOptions = props => (
    {
        header: (
            <View style={[ styles.row, styles.header, styles.layoutHeader]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <FontAwesome name="chevron-left" color='white' size={16} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialIcons name="more-horiz" color='white' size={28} />
                </TouchableOpacity>
            </View>
        )
    }
)