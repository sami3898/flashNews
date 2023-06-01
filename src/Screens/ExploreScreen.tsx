import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../utils/Colors";
import AppHeader from "../Component/AppHeader";
import CustomStatusBar from "../Component/CustomStatusBar";
import Input from "../Component/Input";
import { DEVICE_WIDTH, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Topic } from "../Redux/NewsSlice";
import ChipList from "../Component/ChipList";
import ChipItem from "../Component/ChipItem";

const numColumns = 2;
const gap = 8;

const availableSize = DEVICE_WIDTH - 40 - (numColumns - 1) * gap
const itemSize = availableSize / numColumns;

const ExploreScreen = () => {
  // State variable
  const [search, setSearch] = useState<string>('') 

  // Selector
  const topics = useSelector((state: RootState) => state.newsSlice.topics)


  const _renderTopics = (item: Topic, index: number) => {
    return (
      <ChipItem topic={item} width={itemSize} />
    )
  }

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={COLORS.RED_COLOR}
        contentType="light-content"
      />
      <AppHeader />
      <Input
        value={search}
        placeholder="Search"
        onChangeText={setSearch}
      />
      <Text style={styles.titleText}>Explore by Topics</Text>
      <FlatList 
        numColumns={numColumns}
        data={topics}
        keyExtractor={item => item.topic}
        renderItem={({item,index}) => _renderTopics(item,index)}
        contentContainerStyle={{gap}}
        columnWrapperStyle={{gap}}
        key={numColumns}
        style={{marginHorizontal: 20, marginVertical: 14}}
        showsVerticalScrollIndicator={false}
      />
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
    color: COLORS.BLACK_COLOR
  }
});
