import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { FONTS } from "../utils/Fonts";
import { Ionicons } from "@expo/vector-icons";
import { Topic, setUserSelectedTopics } from "../Redux/NewsSlice";
import { useDispatch } from "react-redux";

interface CategoryListProps {
  list: any;
}

const CategoryList: React.FC<CategoryListProps> = (
  props: CategoryListProps
) => {
  const { list } = props;
  
  const dispatch = useDispatch();
  // State variables
  const [selectedCategory, setSelectedCategory] = useState<Topic[]>([]);

  // TODO: on select category
  const onPressCategory = (category: Topic, index: number) => {
    if (selectedCategory.includes(category)) {
      const tempArr = selectedCategory.filter((e) => e.topic !== category.topic);
      setSelectedCategory([...tempArr])
      dispatch(setUserSelectedTopics([...tempArr]))
    } else {
      let tempArr = [...selectedCategory, category]
      tempArr = tempArr.slice().sort((a, b) => {
        const labelA = a.label.toLowerCase();
        const labelB = b.label.toLowerCase();
      
        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }
      
        return 0;
      });
      setSelectedCategory([...selectedCategory, category])
      dispatch(setUserSelectedTopics(tempArr))
    }
    
  };

  // TODO: is category selected
  const isSelected = (category: Topic) => {
    if(selectedCategory.length === 0) {
        return
    }
    let selected: boolean = false
    selectedCategory.map((e: Topic,i: number) =>{
        if (e.topic === category.topic) {
            return selected = true
        }
    })
    return selected
  }
  // Selected category view style
  const selectedCategoryStyle: ViewStyle = {
    backgroundColor: COLORS.LIHT_RED_COLOR,
  }

  // Selected category text style
  const selectedCategoryTextStyle: TextStyle = {
    color: COLORS.RED_COLOR,
    fontFamily: FONTS.POPPINS_SEMIBOLD
  }


  return (
    <FlatList
      data={list}
      keyExtractor={(item) => item.label}
      renderItem={({ item, index }) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => onPressCategory(item, index)}
            style={[styles.chipContainer, isSelected(item) && selectedCategoryStyle]}
          >
            <Text style={[styles.chipText, isSelected(item) && selectedCategoryTextStyle]}>{item.label}</Text>
            {isSelected(item) && <Ionicons
              name="ios-checkmark-sharp"
              size={wp(16)}
              color={COLORS.RED_COLOR}
            />}
          </TouchableOpacity>
        );
      }}
      ItemSeparatorComponent={() => {
        return <View style={{ height: hp(6) }} />;
      }}
      style={{ marginVertical: 16 }}
      extraData={list}
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
    marginHorizontal: wp(20),
  },
  chipText: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
  },
});
