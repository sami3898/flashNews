import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import type { BottomTabBarProps as ReactNavigationBottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarItem from "./TabBarItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../utils/Colors";
import TabBarIndicator from "./TabIndicator";
import { DEVICE_WIDTH, hp } from "../utils/ResponsiveLayout";
import { useAnimatedStyle, withTiming } from "react-native-reanimated";

type BottomTabBarProps = ReactNavigationBottomTabBarProps;

const BottomTabBar = ({
  state: { routeNames, index: selectedTab },
  navigation,
}: BottomTabBarProps) => {
  
  const tabWidth = DEVICE_WIDTH / routeNames.length;
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: withTiming(tabWidth * selectedTab) }],
  }));

  const {bottom} = useSafeAreaInsets()

  return (
    <>
      
      <View style={[styles.tabContainer, { paddingBottom: Platform.OS === 'ios' ? hp(24) : hp(10) }]}>
      <View style={{width: '100%', height: 2, backgroundColor: COLORS.LIHT_RED_COLOR, position: 'absolute'}} />
      <TabBarIndicator
        tabCount={routeNames.length}
        animatedStyle={animatedStyle}
      />
      
        {routeNames.map((routeName, index) => {
          return (
            <TabBarItem
              key={routeName}
              title={routeName}
              isSelected={selectedTab === index}
              onPress={() => navigation.navigate(routeName)}
              // icon={renderIcon()}
            />
          );
        })}
      </View>
    </>
  );
};

export default BottomTabBar;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    // borderTopWidth: 2,
    // borderTopColor: COLORS.LIHT_RED_COLOR,
    backgroundColor: COLORS.WHITE_COLOR,
  },
});
