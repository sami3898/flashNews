import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../Component/CustomStatusBar";
import NavigationHeader from "../Component/NavigationHeader";
import { useNavigation } from "@react-navigation/native";
import { hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Topic, setUserSelectedTopics } from "../Redux/NewsSlice";
import SnackBar from "react-native-snackbar-component";
import Button from "../Component/Button";
import { FlashList } from "@shopify/flash-list";

const PreferencesScreen = () => {
  // State variables
  const [isSnakbarVisible, setIsSnackbarVisible] = useState<boolean>(false);
  const [selectedTopics, setSelectedTopics] = useState<Topic[]>([]);
  // Navigation
  const navigation = useNavigation();
  // Selector & dispatch
  const userSelectedTopics = useSelector(
    (state: RootState) => state.newsSlice.userSelectedTopics
  );
  const topics = useSelector((state: RootState) => state.newsSlice.topics);
  const dispatch = useDispatch();

  // TODO: is category selected
  const isSelected = (category: Topic) => {
    if (selectedTopics.length === 0) {
      return;
    }
    let selected: boolean = false;
    selectedTopics.map((e: Topic, i: number) => {
      if (e.topic === category.topic) {
        return (selected = true);
      }
    });
    return selected;
  };

  // Selected category view style
  const selectedCategoryStyle: ViewStyle = {
    backgroundColor: COLORS.LIHT_RED_COLOR,
  };

  // Selected category text style
  const selectedCategoryTextStyle: TextStyle = {
    color: COLORS.RED_COLOR,
    fontFamily: FONTS.POPPINS_SEMIBOLD,
  };

  // TODO: on select category
  const onPressCategory = (category: Topic, index: number) => {
    if (selectedTopics.some((e) => e.topic === category.topic)) {
      const tempArr = selectedTopics.filter((e) => e.topic !== category.topic);
      if (tempArr.length == 0) {
        setIsSnackbarVisible(true);
      } else {
        setSelectedTopics(tempArr);
      }
    } else {
      let tempArr = [...selectedTopics, category];
      tempArr = tempArr.slice().sort((a, b) => {
        const labelA = a.label.toLowerCase();
        const labelB = b.label.toLowerCase();

        if (labelA < labelB) {
          return -1;
        }
        if (labelA > labelB) {
          return 1;
        }

        return 0;
      });
      setSelectedTopics(tempArr);
    }
  };

  useEffect(() => {
    setSelectedTopics(userSelectedTopics);
  }, []);

  useEffect(() => {
    if (isSnakbarVisible) {
      setTimeout(() => {
        setIsSnackbarVisible(false);
      }, 3000);
    }
  }, [isSnakbarVisible]);

  return (
    <View style={styles.container}>
      <CustomStatusBar
        backgroundColor={COLORS.RED_COLOR}
        contentType="light-content"
      />
      <NavigationHeader onPress={() => navigation.goBack()} />
      <Text style={styles.titleText}>Update your preferences</Text>
      <FlashList
        data={topics}
        keyExtractor={(item) => item.label}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => onPressCategory(item, index)}
              style={[
                styles.chipContainer,
                isSelected(item) && selectedCategoryStyle,
              ]}
            >
              {/* <View style={styles.bgView} /> */}
              <Text
                style={[
                  styles.chipText,
                  isSelected(item) && selectedCategoryTextStyle,
                ]}
              >
                {item.label}
              </Text>
              {isSelected(item) && (
                <Ionicons
                  name="ios-checkmark-sharp"
                  size={wp(16)}
                  color={COLORS.RED_COLOR}
                />
              )}
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ height: hp(6) }} />;
        }}
        style={{ marginVertical: 16 }}
        extraData={userSelectedTopics}
      />
      <Button
        title="Update"
        buttonContainerStyle={{ marginBottom: hp(20) }}
        onPress={() => dispatch(setUserSelectedTopics(selectedTopics))}
      />
      <SnackBar
        visible={isSnakbarVisible}
        textMessage={"Atleast one topic must be selected"}
        bottom={hp(20)}
        autoHidingTime={3000}
        right={wp(10)}
        left={wp(10)}
        backgroundColor={COLORS.LIHT_RED_COLOR}
        messageColor={COLORS.RED_COLOR}
      />
    </View>
  );
};

export default PreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE_COLOR,
  },
  titleText: {
    fontSize: wp(22),
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.RED_COLOR,
    marginTop: hp(14),
    marginHorizontal: wp(20),
  },
  chipContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(16),
    paddingHorizontal: wp(20),
    justifyContent: "space-between",
    borderRadius: 8,
    backgroundColor: COLORS.GREY_COLOR,
    marginHorizontal: wp(20),
  },
  chipText: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_REGULAR,
    color: COLORS.BLACK_COLOR,
  },
});
