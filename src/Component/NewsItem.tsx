import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native'
import React from 'react'
import { News } from '../Redux/NewsSlice'
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout'
import { COLORS } from '../utils/Colors'
import { FONTS } from '../utils/Fonts'
import {Ionicons} from '@expo/vector-icons';
import moment from 'moment'
import {Image} from 'expo-image';
import Animated, {BounceIn, FadeInLeft, SlideInLeft, ZoomInUp, Layout} from 'react-native-reanimated'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { HomeStackParamList } from '../../App'

interface NewsItemProps {
    news: News
}

const NewsItem = (props: NewsItemProps) => {
    const {news} = props;


    const shareNews = async () => {
        try {
            await Share.share({
                message: `${news.title}\n\n${news.sourceUrl}`,
            })
        } catch (error) {
            console.log("SHare error ", error)
        }
    }

    const displayDate = (date: number) => {
        let diff = moment().diff(moment(date), 'days')
        if (diff > 3) {
            return moment(news.createdAt).format('MMM, DD YYYY')
        } else {
            return moment(news.createdAt).fromNow()
        }
    }

    const navigation = useNavigation<NavigationProp<HomeStackParamList>>()

  return (
    <TouchableOpacity 
        style={styles.container}
        onPress={() => navigation.navigate('NewsScreen', {news: news})}

    >
        <Image 
            source={{ uri: news.imageUrl }}
            style={styles.imageStyle}
            cachePolicy={'memory'}
            contentFit='cover'
        /> 
        <View style={styles.newsInfoContainer}>
            <Text numberOfLines={3} style={styles.newsTitle}>{news.title}</Text>
            <View style={styles.bottomContainer}>
                <Text style={styles.timeText}>{displayDate(news.createdAt)}</Text>
                <Ionicons 
                    name='ios-share-outline'
                    size={wp(20)}
                    color={COLORS.BLACK_COLOR}
                    onPress={() => shareNews()}
                />
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default NewsItem

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'center',
        height: hp(100),
        width: DEVICE_WIDTH - 40,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.GREY_COLOR
    },
    imageStyle: {
        height: '100%',
        width: wp(100),
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
    },
    newsInfoContainer: {
        marginVertical: hp(6),
        paddingHorizontal: wp(10),
        justifyContent: 'space-between',
        width: '70%',
        
    },
    newsTitle: {
        fontSize: wp(12),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BLACK_COLOR,
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    timeText: {
        fontSize: wp(12),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.RED_COLOR,
    }
})