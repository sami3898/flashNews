import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS } from "../utils/Colors";
import AppHeader from "../Component/AppHeader";
import CustomStatusBar from "../Component/CustomStatusBar";
import Input from "../Component/Input";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { News, Topic, setTrendingNews } from "../Redux/NewsSlice";
import ChipList from "../Component/ChipList";
import ChipItem from "../Component/ChipItem";
import { fetchNewsBySearch, fetchTrendingNews } from "../utils/ApiHelper";
import Loader from "../Component/Loader";
import NewsItem from "../Component/NewsItem";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ExploreScreen = () => {
    // State variable
    const [search, setSearch] = useState<string>("");
    const [news, setNews] = useState<News[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isEndLoading, setIsEndLoading] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(30);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);

    // Dispatch
    const dispatch = useDispatch();

    const flatlistRef = useRef<FlatList>(null);

    // TODO: get trending news
    const getTrendingNews = async () => {
        let res = await fetchTrendingNews(0);
        if (res.length > 0) {
            setNews(res);
            dispatch(setTrendingNews(res))
            setIsLoading(false)
        }
    };

    // TODO: get news by search
    const getNewsBySearch = async () => {
        setOffset(30);
        let res = await fetchNewsBySearch(search, 0);
        if (res.length > 0) {
            setNews(res);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        getTrendingNews();
    }, []);

    useEffect(() => {
        if (search.length === 0) {
            setIsLoading(true);
            setOffset(30);
            getTrendingNews();
        }
    }, [search]);

    // TODO: render footer component
    const _renderFooter = () => {
        if (offset > 160) return null;
        return (
            <TouchableOpacity
                onPress={_onEndReached}
                activeOpacity={0.8}
                style={styles.footerContainer}
            >
                {!isEndLoading ? (
                    <View style={styles.loadMoreContainer}>
                        <Text style={styles.loadMoreText}>
                            Load more stories
                        </Text>
                        <MaterialCommunityIcons
                            name="chevron-double-down"
                            size={wp(20)}
                            color={COLORS.RED_COLOR}
                            style={{ marginLeft: 6 }}
                        />
                    </View>
                ) : (
                    <ActivityIndicator
                        size={"small"}
                        color={COLORS.RED_COLOR}
                    />
                )}
            </TouchableOpacity>
        );
    };

    // TODO: onEnd flatlist
    const _onEndReached = async () => {
        if (!isEndLoading) {
            setIsEndLoading(true);
            let res: News[] = [];
            if (search.length > 0) {
                res = await fetchNewsBySearch(search, offset);
            } else {
                res = await fetchTrendingNews(offset);
            }

            if (res.length > 0) {
                setOffset(offset + 30);
                let newNewsArr: News[] = [];
                newNewsArr = [...news, ...res];
                setNews(newNewsArr);
                setIsEndLoading(false);
            } else {
                Alert.alert("Error while fetching news!");
            }
        }
    };

    // TODO: on refresh get latest news
    const onRefresh = () => {
        setIsRefresh(true);
        if (search.length > 0) {
            getNewsBySearch();
        } else {
            getTrendingNews();
        }
        setIsRefresh(false);
    };

    return (
        <View style={styles.container}>
            <CustomStatusBar
                backgroundColor={COLORS.RED_COLOR}
                contentType="light-content"
            />
            <AppHeader title="Explore News" />
            <Input
                value={search}
                placeholder="Search"
                onChangeText={setSearch}
                onSubmit={() => {
                    setIsLoading(true);
                    getNewsBySearch();
                }}
                onPressRightIcon={() => setSearch("")}
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

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_COLOR,
    },
    titleText: {
        fontSize: wp(18),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        marginHorizontal: wp(20),
        color: COLORS.BLACK_COLOR,
        marginBottom: hp(14),
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
