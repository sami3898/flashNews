import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { News, removeNews } from '../Redux/NewsSlice';
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout';
import { COLORS } from '../utils/Colors';
import { FONTS } from '../utils/Fonts';
import { HomeStackParamList } from '../../App';
import dayjs from 'dayjs'

var relativeTime = require('dayjs/plugin/relativeTime')
interface NewsItemProps {
    news: News,
    isDelete?: boolean;
    isFromBookMark?: boolean;
}

const NewsItem: React.FC<NewsItemProps> = ({
  news,
  isDelete = false,
  isFromBookMark = false,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const shareNews = async () => {
    try {
      await Share.share({
        message: `${news.title}\n\n${news.sourceUrl}`,
      });
    } catch (error) {
      console.log('Share error', error);
    }
  };

  const displayDate = (date: number) => {
    dayjs.extend(relativeTime)
    let diff = dayjs().diff(dayjs(date), 'days');
    if (diff > 3) {
      return dayjs(news.createdAt).format('MMM, DD YYYY');
    } else {
      return dayjs(news.createdAt).fromNow();
    }
  };

  const deleteNews = () => {
    dispatch(removeNews(news));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        navigation.navigate('NewsScreen', { news, isFromBookMark })
      }
    >
      <Image
        source={{ uri: news.imageUrl }}
        style={styles.imageStyle}
        cachePolicy={'memory'}
        contentFit='cover'
      />
      <View style={styles.newsInfoContainer}>
        <Text numberOfLines={3} style={styles.newsTitle}>
          {news.title}
        </Text>
        <View style={styles.bottomContainer}>
          <Text style={styles.timeText}>{displayDate(news.createdAt)}</Text>
          <View style={styles.iconContainer}>
            <Ionicons
              name='ios-share-outline'
              size={wp(20)}
              color={COLORS.BLACK_COLOR}
              onPress={shareNews}
            />
            {isDelete && (
              <Ionicons
                name='trash-outline'
                size={wp(20)}
                color={COLORS.BLACK_COLOR}
                onPress={deleteNews}
                style={{ marginLeft: wp(12) }}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    height: hp(100),
    width: DEVICE_WIDTH - 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.GREY_COLOR,
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
    alignItems: 'center',
  },
  timeText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.RED_COLOR,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default NewsItem;
