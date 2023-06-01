import React from "react";
import { Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import Animated from "react-native-reanimated";

type TabBarItemProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

const TabBarItem = ({ title, isSelected, onPress, }: TabBarItemProps) => {
    const renderIcon = () => {
        if(title === 'Home') {
            return "md-newspaper-outline"
        } else if (title === 'Explore') {
            return "search-outline"
        } else if (title === 'Bookmark') {
            return "ios-bookmark-outline"
        } else if (title === 'Settings') {
            return "ios-settings-outline"
        }
    }
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <Ionicons 
            name={renderIcon()}
            size={wp(24)}
            color={isSelected ? COLORS.RED_COLOR : COLORS.BLACK_COLOR}
        />
    </Pressable>
  );
};

export default TabBarItem;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: 'center',
    paddingVertical: hp(10)
  },
});
