import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout'
import { COLORS } from '../utils/Colors'
import { FONTS } from '../utils/Fonts'

const AppHeader = () => {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Flash News ⚡️</Text>
      </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
    headerContainer: {
        height: hp(60),
        justifyContent: "center",
        width: DEVICE_WIDTH,
        paddingHorizontal: wp(20),
        backgroundColor: COLORS.RED_COLOR,
      },
      headerTitle: {
        fontSize: wp(20),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.WHITE_COLOR,
      },
})