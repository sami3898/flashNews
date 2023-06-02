import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/Colors'
import CustomStatusBar from '../Component/CustomStatusBar'
import AppHeader from '../Component/AppHeader'

const BookmarkScreen = () => {
  return (
    <View style={styles.container}>
        <CustomStatusBar backgroundColor={COLORS.RED_COLOR} contentType='light-content' />
        <AppHeader title='Saved News' />
      <Text>BookmarkScreen</Text>
    </View>
  )
}

export default BookmarkScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_COLOR
    }
})