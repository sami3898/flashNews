import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../Component/CustomStatusBar";
import NavigationHeader from "../Component/NavigationHeader";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { HomeStackParamList, TabStackParamList } from "../../App";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { News } from "../Redux/NewsSlice";
import { Image } from "expo-image";
import moment from "moment";
import WebViewModal from "../Component/WebViewModal";

const NewsScreen = () => {
  const navigation = useNavigation<NavigationProp<TabStackParamList>>();
  // State variable
  const [news, setNews] = useState<News>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const route = useRoute<RouteProp<HomeStackParamList>>();
  useEffect(() => {
    if (route.params?.news !== undefined) {
      setNews(route.params?.news);
    }
  }, []);

  const _renderTags = (tags: string[] | undefined) => {
    return (
      <View style={styles.tagContainer}>
        {tags?.map((e: string, index: number) => {
          return (
            <View style={styles.tagStyle}>
              <Text style={styles.tagText} key={e}>
                {e}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false} style={{ marginBottom: hp(30) }}>
        <CustomStatusBar
          backgroundColor={COLORS.RED_COLOR}
          contentType="light-content"
        />
        <NavigationHeader onPress={() => navigation.goBack()} />
        <Image
          source={{ uri: news?.imageUrl }}
          style={styles.imageStyle}
          contentFit="cover"
        />
        <Text style={styles.newsTitle}>{news?.title}</Text>
        <Text
          style={styles.authorText}
        >{`Written by ${news?.authorName}`}</Text>
        <Text style={styles.authorText}>{`Published at ${moment(
          news?.createdAt
        ).format("MMM, DD YYYY hh:mm A")}`}</Text>
        {_renderTags(news?.categoryNames)}
        <Text style={styles.contentText}>{news?.content.trim()}</Text>
        <Text onPress={() => setIsVisible(true)} style={styles.readMoreText}>
          Read More
        </Text>
      </ScrollView>
      <WebViewModal
        isVisible={isVisible}
        source={news?.sourceUrl}
        toggleModal={(visible: boolean) => setIsVisible(visible)}
      />
    </View>
  );
};

export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_COLOR,
  },
  newsTitle: {
    fontSize: wp(16),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.BLACK_COLOR,
    marginHorizontal: wp(20),
    marginVertical: hp(14),
  },
  imageStyle: {
    height: hp(220),
    width: DEVICE_WIDTH,
    alignSelf: "center",
    // marginTop: hp(16)
  },
  authorText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
    marginHorizontal: wp(20),
  },
  tagContainer: {
    flexDirection: "row",
    gap: 4,
    marginHorizontal: wp(20),
    marginVertical: hp(14),
  },
  tagStyle: {
    paddingVertical: hp(10),
    paddingHorizontal: wp(14),
    borderRadius: 8,
    backgroundColor: COLORS.LIHT_RED_COLOR,
  },
  tagText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.RED_COLOR,
  },
  contentText: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
    marginHorizontal: wp(20),
  },
  readMoreText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.RED_COLOR,
    textDecorationLine: "underline",
    marginHorizontal: wp(20),
    marginTop: hp(14),
  },
});
