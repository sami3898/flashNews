import { View, Text, StyleSheet, Platform, StatusBar, StatusBarStyle } from 'react-native'
import React from 'react'
import { hp } from '../utils/ResponsiveLayout';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? hp(40) : StatusBar.currentHeight;

interface StatusBarProps {
    backgroundColor: string;
    contentType: StatusBarStyle;
}

const CustomStatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
    const {backgroundColor, contentType} = props;
  return (
    <View style={[styles.statusbarStyle, {backgroundColor}]}>
      <StatusBar translucent backgroundColor={backgroundColor} barStyle={contentType} />
    </View>
  )
}

export default CustomStatusBar

const styles = StyleSheet.create({
    statusbarStyle: {
        height: STATUSBAR_HEIGHT
    }
})