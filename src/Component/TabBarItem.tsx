import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { wp, hp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";

type TabBarItemProps = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
};

const TabBarItem = ({ title, isSelected, onPress }: TabBarItemProps) => {
  const renderIcon = () => {
    switch (title) {
      case "HomeTab":
        return "md-newspaper-outline";
      case "Explore":
        return "search-outline";
      case "Bookmark":
        return "ios-bookmark-outline";
      case "Settings":
        return "ios-settings-outline";
      default:
        return undefined;
    }
  };

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
    justifyContent: "center",
    paddingVertical: hp(10),
  },
});
