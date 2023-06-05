import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  FlatListProps,
  RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../utils/Colors";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import CustomStatusBar from "../Component/CustomStatusBar";
import { FONTS } from "../utils/Fonts";
import ChipList from "../Component/ChipList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { fetchAllNews, fetchNewsByCatagory, fetchTrendingNews } from "../utils/ApiHelper";
import { News, setIsNotification, setIsNotificationSubscribed, setNews, setTrendingNews, setUserOnboard } from "../Redux/NewsSlice";
import NewsItem from "../Component/NewsItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppHeader from "../Component/AppHeader";
import Loader from "../Component/Loader";
import { setNotifications } from "../utils/Notifications";

const HomeScreen = () => {
  // Ref
  const flatlistRef = useRef<FlatList>(null);

  // State variables
  const [offset, setOffset] = useState<number>(30);
  const [isEndLoading, setIsEndLoading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [selectedCatagory, setSelectedCatagory] = useState<string>("");

  // Selector & Dispatch
  const userSelectedTopics = useSelector(
    (state: RootState) => state.newsSlice.userSelectedTopics
  );
  const news = useSelector((state: RootState) => state.newsSlice.news);
  const trendingNews = useSelector((state: RootState) => state.newsSlice.trendingNews);
  const isNotification = useSelector((state: RootState) => state.newsSlice.isNotification);
  const isNotificationSubscribed = useSelector((state: RootState) => state.newsSlice.isNotificationSubscribed);
  const dispatch = useDispatch();

  // TODO: get all news
  const getAllNews = async () => {
    let res = await fetchAllNews(0);
    if (res.length > 0) {
      dispatch(setNews(res));
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      }, 200);
    }
  };

  // TODO: get news by cataogry
  const getNewsByCatagory = async (cataogry: string) => {
    
    let res = await fetchNewsByCatagory(cataogry, 0);
    if (res.length > 0) {
      dispatch(setNews(res));
      setIsLoading(false)
      setTimeout(() => {
        flatlistRef.current?.scrollToIndex({
          animated: true,
          index: 0,
        });
      }, 1000);
      
    }
  };

  // TODO: get trending news
  const getTrendingNews = async () => {
    let res = await fetchTrendingNews(0);
    if (res.length > 0) {
        setNews(res);
        dispatch(setTrendingNews(res))
    }
};

  // TODO: onPress List Item
  const onPressItem = (item: string) => {
    setIsLoading(true);
    setSelectedCatagory(item);
    getNewsByCatagory(item);
    setIsLoading(false);
  };

  // TODO: render footer component
  const _renderFooter = () => {
    return (
      <TouchableOpacity
        onPress={_onEndReached}
        activeOpacity={0.8}
        style={styles.footerContainer}
      >
        {!isEndLoading ? (
          <View style={styles.loadMoreContainer}>
            <Text style={styles.loadMoreText}>Load more stories</Text>
            <MaterialCommunityIcons
              name="chevron-double-down"
              size={wp(20)}
              color={COLORS.RED_COLOR}
              style={{ marginLeft: 6 }}
            />
          </View>
        ) : (
          <ActivityIndicator size={"small"} color={COLORS.RED_COLOR} />
        )}
      </TouchableOpacity>
    );
  };

  // TODO: onEnd flatlist
  const _onEndReached = async () => {
    if (!isEndLoading) {
      setIsEndLoading(true);
      let res: News[] = [];
      res = await fetchNewsByCatagory(selectedCatagory, 0);
      if (res.length > 0) {
        res = await fetchNewsByCatagory(selectedCatagory, offset);
        setOffset(offset + 30);
        let newNewsArr = [];
        newNewsArr = [...news, ...res];
        dispatch(setNews(newNewsArr));
        setIsEndLoading(false);
      } else {
        Alert.alert("Error while fetching news!");
      }
    }
  };

  // TODO: on refresh get latest news
  const onRefresh = () => {
    setIsRefresh(true);
    getNewsByCatagory(selectedCatagory);
    setIsRefresh(false)
  };

  // TODO: check notification status and subscribe
  const checkNotification = () => {
    if (isNotification) {
      if(!isNotificationSubscribed) {
        setNotifications(trendingNews)
        .then((status: boolean) => {
          dispatch(setIsNotification(status))
          dispatch(setIsNotificationSubscribed(true))
        })
      }
    }
  }

  useEffect(() => {
    checkNotification()
  },[isNotification])

  // TODO: update news when pref update
  useEffect(() => {
    getNewsByCatagory(userSelectedTopics[0].topic);
    setSelectedCatagory(userSelectedTopics[0].topic);
  }, [userSelectedTopics])

  useEffect(() => {
    setIsLoading(true);
    getNewsByCatagory(userSelectedTopics[0].topic);
    setSelectedCatagory(userSelectedTopics[0].topic);
    // setIsLoading(false);
    getTrendingNews()
    // dispatch(setUserOnboard(false))
  }, []);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={COLORS.RED_COLOR}
        contentType="light-content"
      />
      <AppHeader title="Flash News ⚡️" />
      <ChipList
        list={userSelectedTopics}
        onPressItem={(item: string) => onPressItem(item)}
      />
      <FlatList
        refreshing={isRefresh}
        refreshControl={
          <RefreshControl
            colors={[COLORS.RED_COLOR]}
            refreshing={isRefresh}
            onRefresh={onRefresh}
          />
        }
        ref={flatlistRef}
        data={news}
        keyExtractor={(item) => item.hashId}
        renderItem={({ item, index }) => {
          return <NewsItem news={item} />;
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: 10 }} />;
        }}
        ListFooterComponent={_renderFooter}
        onEndReachedThreshold={0.5}
        disableIntervalMomentum={true}
        maxToRenderPerBatch={7}
      />
      {isLoading && <Loader />}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_COLOR,
  },
  footerContainer: {
    paddingVertical: hp(10),
    marginVertical: hp(20),
    marginHorizontal: wp(20),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.LIHT_RED_COLOR,
  },
  loadMoreText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.RED_COLOR,
    textAlign: "center",
  },
  loadMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
