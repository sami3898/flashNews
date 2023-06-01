import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { wp } from '../utils/ResponsiveLayout'
import { COLORS } from '../utils/Colors'
import { FONTS } from '../utils/Fonts'
import { Topic } from '../Redux/NewsSlice'

interface ChipItemProps {
    topic: Topic,
    index?: number;
    width: number;
}

const ChipItem: React.FC<ChipItemProps> = (props: ChipItemProps) => {
    const {topic, width} = props;
  return (
    <TouchableOpacity 
                activeOpacity={0.8}
                style={[styles.chipContainer, {width: width}]}
                onPress={() => console.log()}
            >
                <Text style={[styles.chipText, {width: width - 10}]}>{topic.label}</Text>
            </TouchableOpacity>
  )
}

export default ChipItem

const styles = StyleSheet.create({
    chipContainer: {
        paddingVertical: wp(12),
        paddingHorizontal: wp(16),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.GREY_COLOR,
        borderRadius: 8
    },
    chipText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.BLACK_COLOR,
        textAlign: 'center'
    }
})