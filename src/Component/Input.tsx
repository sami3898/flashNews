import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/Colors';
import { hp, wp } from '../utils/ResponsiveLayout';
import { FONTS } from '../utils/Fonts';

interface InputProps {
  placeholder: string;
  value?: string;
  onChangeText: (text: string) => void;
  secureText?: boolean;
  onPressRightIcon: () => void;
  onSubmit: () => void;
  keyboardType?: 'default' | 'email-address' | 'numeric';
}

const Input = ({
  placeholder,
  value = '',
  onChangeText,
  secureText = false,
  onPressRightIcon,
  keyboardType = 'default',
  onSubmit,
}: InputProps) => {
  const [show, setShow] = useState<boolean>(false);

  const handleTextChange = (text: string) => {
    onChangeText(text);
  };

  const handleRightIconPress = () => {
    if (onPressRightIcon) {
      onPressRightIcon();
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={'search-outline'} size={wp(20)} color={COLORS.BLACK_COLOR} />
      <TextInput
        value={value}
        placeholder={placeholder}
        placeholderTextColor={COLORS.BLACK_COLOR}
        onChangeText={handleTextChange}
        secureTextEntry={secureText}
        style={styles.inputStyle}
        keyboardType={keyboardType}
        autoCapitalize="none"
        onSubmitEditing={onSubmit}
      />
      {value && (
        <Ionicons
          name={'ios-close-sharp'}
          size={wp(20)}
          color={COLORS.BLACK_COLOR}
          onPress={handleRightIconPress}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.RED_COLOR,
    backgroundColor: COLORS.WHITE_COLOR,
    borderRadius: 4,
    height: hp(48),
    alignItems: 'center',
    marginVertical: hp(12),
    paddingHorizontal: wp(12),
    marginHorizontal: 20,
  },
  inputStyle: {
    flex: 1,
    marginHorizontal: wp(6),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
    fontSize: wp(14),
  },
});

export default Input;
