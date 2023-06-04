import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { Topic, setUserSelectedTopics } from '../Redux/NewsSlice';
import { hp, wp } from '../utils/ResponsiveLayout';
import { COLORS } from '../utils/Colors';
import { FONTS } from '../utils/Fonts';
import { useDispatch } from 'react-redux';

interface ChipListProps {
  list: Topic[];
  onPressItem: (item: string) => void;
}

const ChipList: React.FC<ChipListProps> = ({ list, onPressItem }: ChipListProps) => {
  const dispatch = useDispatch();

  // State variables
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Selected style
  const selectedChipStyle: ViewStyle = {
    backgroundColor: COLORS.LIHT_RED_COLOR,
  };
  const selectedChipTextStyle: TextStyle = {
    color: COLORS.RED_COLOR,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  };

  // TODO: on select category
  const onSelectCategory = (topic: string, index: number) => {
    setSelectedIndex(index);
    onPressItem(topic);
  };

  // TODO: render flatlist item
  const _renderListItem = ({ item, index }: { item: Topic; index: number }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.chipContainer, index === selectedIndex && selectedChipStyle]}
        onPress={() => onSelectCategory(item.topic, index)}
      >
        <Text style={[styles.chipText, index === selectedIndex && selectedChipTextStyle]}>{item.label}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={item => item.topic}
        renderItem={_renderListItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: wp(10) }} />}
      />
    </View>
  );
};

export default ChipList;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(20),
    marginVertical: hp(12),
    justifyContent: 'center',
  },
  chipContainer: {
    paddingVertical: wp(10),
    paddingHorizontal: wp(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.GREY_COLOR,
    borderRadius: 8,
  },
  chipText: {
    fontSize: wp(12),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
  },
});
