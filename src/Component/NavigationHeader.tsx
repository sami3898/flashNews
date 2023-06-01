import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { DEVICE_WIDTH, hp, wp } from '../utils/ResponsiveLayout'
import { COLORS } from '../utils/Colors'
import {Ionicons} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface NavigationHeaderProps {
    onPress: () => void;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = (props: NavigationHeaderProps) => {
    const navigation = useNavigation();
    const { onPress } = props;
  return (
    <View style={styles.container} >
      <Ionicons 
        name='arrow-back-sharp'
        color={COLORS.WHITE_COLOR}
        size={wp(24)}
        onPress={() => onPress()}
      />
    </View>
  )
}

export default NavigationHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: hp(52),
        width: DEVICE_WIDTH,
        paddingHorizontal: wp(20),
        backgroundColor: COLORS.RED_COLOR,
        alignItems: 'center'
    }
})