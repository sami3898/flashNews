import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import TabBarItem from "./TabBarItem";
import TabBarIndicator from "./TabIndicator";
import { COLORS } from "../utils/Colors";
import { DEVICE_WIDTH, hp } from "../utils/ResponsiveLayout";

type BottomTabBarProps = ReactNavigationBottomTabBarProps;

const BottomTabBar = ({ state: { routeNames, index: selectedTab }, navigation }: BottomTabBarProps) => {
  const tabWidth = DEVICE_WIDTH / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }],
  }));

  return (
    <View style={[styles.tabContainer, { paddingBottom: Platform.OS === 'ios' ? hp(24) : hp(10) }]}>
      <View style={{ width: '100%', height: 2, backgroundColor: COLORS.LIHT_RED_COLOR, position: 'absolute' }} />
      <TabBarIndicator tabCount={routeNames.length} animatedStyle={animatedStyle} />

      {routeNames.map((routeName, index) => (
        <TabBarItem
          key={routeName}
          title={routeName}
          isSelected={selectedTab === index}
          onPress={() => navigation.navigate(routeName)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.WHITE_COLOR,
  },
});

export default BottomTabBar;
