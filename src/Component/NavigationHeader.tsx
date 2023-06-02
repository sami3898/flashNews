import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { COLORS } from "../utils/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface NavigationHeaderProps {
  onPress: () => void;
  isShare?: boolean;
  isBookmark?: boolean;
  onPressShare?: () => void;
  onPressBookmark?: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = (
  props: NavigationHeaderProps
) => {
  const {
    onPress,
    onPressBookmark,
    onPressShare,
    isBookmark = false,
    isShare = false,
  } = props;
  return (
    <View style={styles.container}>
      <Ionicons
        name="arrow-back-sharp"
        color={COLORS.WHITE_COLOR}
        size={wp(24)}
        onPress={() => onPress()}
      />

      <View style={styles.rightIconContainer}>
        {isBookmark && (
          <Ionicons
            name="ios-bookmark-outline"
            color={COLORS.WHITE_COLOR}
            size={wp(24)}
            onPress={() => onPressBookmark()}
          />
        )}
        {isShare && (
          <Ionicons
            name="ios-share-outline"
            color={COLORS.WHITE_COLOR}
            size={wp(24)}
            onPress={() => onPressShare()}
            style={{ marginLeft: wp(12) }}
          />
        )}
      </View>
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: hp(52),
    width: DEVICE_WIDTH,
    paddingHorizontal: wp(20),
    backgroundColor: COLORS.RED_COLOR,
    alignItems: "center",
  },
  rightIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
