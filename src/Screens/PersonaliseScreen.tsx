import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, StatusBar, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../utils/Colors'
import { hp, wp } from '../utils/ResponsiveLayout'
import { FONTS } from '../utils/Fonts'
import Button from '../Component/Button'
import CategoryList from '../Component/CategoryList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/store'
import { setUserOnboard } from '../Redux/NewsSlice'

const PersonaliseScreen = () => {
    // Selctor & Dispatch
    const topics = useSelector((state: RootState) => state.newsSlice.topics)
    const dispatch = useDispatch();

    // TODO: onPress done
    const onPressDone = () => {
      dispatch(setUserOnboard(true));
    }

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar 
            barStyle={'dark-content'}
            backgroundColor={COLORS.WHITE_COLOR}
        />
      <Text style={styles.titleText}>Let's Personalise</Text>
      <Text style={styles.subTitleText}>Please choose the topic you would like to read about.</Text>
      <CategoryList list={topics} />
      <Button 
        title='Done'
        buttonContainerStyle={{
            marginBottom: Platform.OS === 'android' ? 20 : 0,
        }}
        onPress={onPressDone}
      />
      
      
    </SafeAreaView>
  )
}

export default PersonaliseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_COLOR,
    },
    titleText: {
        fontSize: wp(30),
        fontFamily: FONTS.POPPINS_BOLD,
        color: COLORS.RED_COLOR,
        marginTop: hp(26),
        marginHorizontal: wp(20)
    },
    subTitleText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.BLACK_COLOR,
        marginHorizontal: wp(20),
        marginTop: hp(8)
    },
    
})