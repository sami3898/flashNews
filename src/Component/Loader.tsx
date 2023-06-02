import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/Colors'
import { hp, wp } from '../utils/ResponsiveLayout'
import { FONTS } from '../utils/Fonts'

const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={COLORS.RED_COLOR} />
      <Text style={styles.loadingText}>Loading latest headlines...</Text>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    loaderContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.WHITE_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingText: {
        fontSize: wp(16),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BLACK_COLOR,
        marginTop: hp(20)
    }
})