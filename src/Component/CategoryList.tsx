import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { FONTS } from "../utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Topic, setUserSelectedTopics } from "../Redux/NewsSlice";
import { useDispatch } from "react-redux";

interface CategoryListProps {
  list: Topic[];
}

const CategoryList: React.FC<CategoryListProps> = ({ list }: CategoryListProps) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<Topic[]>([]);

  const onPressCategory = (category: Topic, index: number) => {
    let tempArr: Topic[] = [];
    if (selectedCategory.includes(category)) {
      tempArr = selectedCategory.filter((e) => e.topic !== category.topic);
    } else {
      tempArr = [...selectedCategory, category];
    }
    tempArr.sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()));
    setSelectedCategory(tempArr);
    dispatch(setUserSelectedTopics(tempArr));
  };

  const isSelected = (category: Topic) => {
    return selectedCategory.some((e) => e.topic === category.topic);
  };

  const selectedCategoryStyle: ViewStyle = {
    backgroundColor: COLORS.LIHT_RED_COLOR,
  };

  const selectedCategoryTextStyle: TextStyle = {
    color: COLORS.RED_COLOR,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  };

  const renderItem = ({ item, index }: { item: Topic; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPressCategory(item, index)}
        style={[styles.chipContainer, isSelected(item) && selectedCategoryStyle]}
      >
        <Text style={[styles.chipText, isSelected(item) && selectedCategoryTextStyle]}>{item.label}</Text>
        {isSelected(item) && (
          <Ionicons name="ios-checkmark-sharp" size={wp(16)} color={COLORS.RED_COLOR} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.label}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: hp(6) }} />}
      style={{ marginVertical: 16, marginHorizontal: wp(20) }}
      extraData={selectedCategory}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(16),
    paddingHorizontal: wp(20),
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: COLORS.GREY_COLOR,
  },
  chipText: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
  },
});
