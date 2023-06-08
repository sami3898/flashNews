import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from 'react-native';
import { hp, wp } from '../utils/ResponsiveLayout';
import { COLORS } from '../utils/Colors';
import { FONTS } from '../utils/Fonts';

interface ButtonProps {
  title: string;
  onPress: () => void;
  buttonContainerStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
}

const Button = ({ title, onPress, buttonContainerStyle, buttonTextStyle }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, buttonContainerStyle]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Text style={[styles.textStyle, buttonTextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: hp(50),
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.RED_COLOR,
    marginHorizontal: wp(20),
  },
  textStyle: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.WHITE_COLOR,
  },
});

export default Button;
