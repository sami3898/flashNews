import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../Component/CustomStatusBar";
import AppHeader from "../Component/AppHeader";
import Input from "../Component/Input";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import NewsItem from "../Component/NewsItem";
import { News } from "../Redux/NewsSlice";
import { FlashList } from "@shopify/flash-list";

const BookmarkScreen = () => {
  // State variable
  const [search, setSearch] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [searchResult, setSearchResult] = useState<News[]>([]);

  // Selector
  const savedNews = useSelector(
    (state: RootState) => state.newsSlice.savedNews
  );

  useEffect(() => {
    if (savedNews.length === 0) {
      setErrorText("No news saved yet!");
    }
  }, [savedNews]);

  useEffect(() => {
    if (search.length === 0) setSearchResult([])
  }, [search])


  const _renderNoView = () => {
    return (
      <View style={styles.noViewContainer}>
        <Text style={styles.noText}>{errorText}</Text>
      </View>
    );
  };

  // TODO: search news from saved
  const searchNews = () => {
    let searchedData: News[] = [];
    if (search.length > 0) {
      searchedData = savedNews.filter((news) => {
        const newsTitle = news.title.toLowerCase();
        return newsTitle.includes(search.toLowerCase());
      });
      setSearchResult(searchedData);
    }
  };

  // TODO: update searched news on delete 
  useEffect(() => {
    if (search.length > 0) {
      searchNews()
    }
  }, [savedNews])

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={COLORS.RED_COLOR}
        contentType="light-content"
      />
      <AppHeader title="Saved News" />
      {savedNews.length > 0 && (
        <Input
          value={search}
          placeholder="Search"
          onChangeText={setSearch}
          onSubmit={() => {
            searchNews();
          }}
          onPressRightIcon={() => {
            setSearchResult([])
            setSearch("")
          }}
        />
      )}
      {(savedNews.length > 0 || searchResult.length > 0) && (
        <FlashList
          data={search ? searchResult : savedNews.slice().reverse()}
          keyExtractor={(item) => item.hashId}
          renderItem={({ item, index }) => {
            return (
              <NewsItem isFromBookMark={true} news={item} isDelete={true} />
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{ height: 10 }} />;
          }}
          onEndReachedThreshold={0.5}
          disableIntervalMomentum={true}
          estimatedItemSize={100}
          estimatedFirstItemOffset={60}
        />
      )}
      {savedNews.length === 0 && _renderNoView()}
    </View>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_COLOR,
  },
  noViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noText: {
    fontSize: wp(16),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.BLACK_COLOR,
  },
});
