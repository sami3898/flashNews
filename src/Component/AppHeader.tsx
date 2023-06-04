import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout';
import { COLORS } from '../utils/Colors';
import { FONTS } from '../utils/Fonts';

interface AppHeaderProps {
  title: string;
}

const AppHeader: React.FunctionComponent<AppHeaderProps> = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: hp(60),
    justifyContent: 'center',
    width: DEVICE_WIDTH,
    paddingHorizontal: wp(20),
    backgroundColor: COLORS.RED_COLOR,
  },
  headerTitle: {
    fontSize: wp(20),
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.WHITE_COLOR,
  },
});

export default AppHeader;
