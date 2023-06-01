import { View, Text, StyleSheet, FlatList, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Topic, setUserSelectedTopics } from '../Redux/NewsSlice'
import { hp, wp } from '../utils/ResponsiveLayout';
import { COLORS } from '../utils/Colors';
import { FONTS } from '../utils/Fonts';
import { useDispatch } from 'react-redux';


interface ChipListProps {
    list: Topic[],
    onPressItem: (item: string) => void;
}

const ChipList: React.FC<ChipListProps> = (props: ChipListProps) => {
    const {list, onPressItem} = props;
    const dispatch = useDispatch();

    // useEffect(() => {
    //     let data = list.slice().sort((a, b) => {
    //         const labelA = a.label.toLowerCase();
    //         const labelB = b.label.toLowerCase();
          
    //         if (labelA < labelB) {
    //           return -1;
    //         }
    //         if (labelA > labelB) {
    //           return 1;
    //         }
          
    //         return 0;
    //       });
    //       setTopics(data)
    //       dispatch(setUserSelectedTopics(data))
          
    // },[list])

    // State variables
    const [selectedIndex, setSelectedIndex] = useState<number>(0)
    const [topics, setTopics] = useState<Topic[]>([])

    // Selected style
    const selectedChipStyle: ViewStyle = {
        backgroundColor: COLORS.LIHT_RED_COLOR
    }
    const selectedChipTextStyle: TextStyle = {
        color: COLORS.RED_COLOR,
        fontFamily: FONTS.POPPINS_SEMIBOLD
    }

    // TODO: on select catagory
    const onSelectCatagory = (topic: string, index: number) => {
        setSelectedIndex(index)
        onPressItem(topic)
    }

    // TODO: render flatlist item
    const _renderListItem = (item: Topic, index: number) => {
        return (
            <TouchableOpacity 
                activeOpacity={0.8}
                style={[styles.chipContainer, index === selectedIndex && selectedChipStyle]}
                onPress={() => onSelectCatagory(item.topic,index)}
            >
                <Text style={[styles.chipText, index === selectedIndex && selectedChipTextStyle]} >{item.label}</Text>
            </TouchableOpacity>
        )
    }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={item => item.topic}
        renderItem={({item,index}) => _renderListItem(item,index)}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => {return <View style={{width: wp(10)}} />}}
      />
    </View>
  )
}

export default ChipList

const styles = StyleSheet.create({
    container: {
        marginHorizontal: wp(20),
        marginVertical: hp(12),
        justifyContent: 'center'
    },
    chipContainer: {
        paddingVertical: wp(10),
        paddingHorizontal: wp(16),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.GREY_COLOR,
        borderRadius: 8
    },
    chipText: {
        fontSize: wp(12),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.BLACK_COLOR
    }
})