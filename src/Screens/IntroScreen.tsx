import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { COLORS } from "../utils/Colors";
import { DEVICE_HEIGHT, DEVICE_WIDTH, hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import Button from "../Component/Button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { IntroStackrParamsList } from "../../App";
import { Topic, setTopics } from "../Redux/NewsSlice";
import { fetchAllCategory } from "../utils/ApiHelper";
import { useDispatch } from "react-redux";

const IntroScreen = () => {
  type FlatlistItem = {
    title: string;
    subtitle: string;
    img: number;
  };

  // Flatlist ref
  const flatlistRef = useRef<FlatList>(null);

  // Navigation object
  const navigation = useNavigation<NavigationProp<IntroStackrParamsList>>();

  // Intro data
  const data: FlatlistItem[] = [
    {
      title: "Welcome to Flash News!",
      subtitle: "Stay informed, stay connected",
      img: require("../../assets/images/1.png"),
    },
    {
      title: "Discover, Engage, and Share",
      subtitle:
        "Easily share news with friends through social media, email, or messaging apps",
      img: require("../../assets/images/3.png"),
    },
    {
      title: "Get the Latest News at Your Fingertips",
      subtitle:
        "Personalize your news feed based on your interests and preferences",
      img: require("../../assets/images/2.png"),
    },
  ];

  // 
  const dispatch = useDispatch();

  // TODO: onPress Next
  const onPressNExt = (index: number) => {
    if (index === data.length - 1) {
      navigation.navigate("PersonaliseScreen");
    } else {
      flatlistRef.current?.scrollToIndex({
        animated: true,
        index: index + 1,
      });
    }
  };

  const fetchCategory = async () => {
    let res = await fetchAllCategory();
    if (res.length > 0) {
      dispatch(setTopics(res))
    }
  };

  useEffect(() => {
    fetchCategory();
  },[])

  // Render flatlist item
  const _renderItem = (item: FlatlistItem, index: number) => {
    return (
      <View style={styles.container}>
        <View style={styles.TopContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Image source={item.img} style={styles.imageStyle} />
          <Text style={styles.subTitleText}>{item.subtitle}</Text>
        </View>

        <Button
          title={index === data.length - 1 ? "Let's Personalise" : "Next"}
          buttonContainerStyle={{
            borderWidth: 2,
            borderColor: COLORS.WHITE_COLOR,
            bottom: hp(40),
          }}
          onPress={() => onPressNExt(index)}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={COLORS.RED_COLOR}
      />
      <FlatList
        ref={flatlistRef}
        bounces={false}
        data={data}
        horizontal
        pagingEnabled
        renderItem={({ item, index }) => _renderItem(item, index)}
        getItemLayout={(data, index) => ({
          length: DEVICE_WIDTH,
          offset: DEVICE_WIDTH * index,
          index,
        })}
      />
    </View>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  container: {
    height: DEVICE_HEIGHT,
    width: DEVICE_WIDTH,
    backgroundColor: COLORS.RED_COLOR,
  },
  TopContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyle: {
    height: DEVICE_HEIGHT / 3,
    width: DEVICE_WIDTH - wp(40),
    resizeMode: "contain",
  },
  titleText: {
    fontSize: wp(20),
    fontFamily: FONTS.POPPINS_BOLD,
    color: COLORS.WHITE_COLOR,
    textAlign: "center",
  },
  subTitleText: {
    fontSize: wp(14),
    fontFamily: FONTS.POPPINS_SEMIBOLD,
    color: COLORS.WHITE_COLOR,
    textAlign: "center",
    marginHorizontal: wp(20),
  },
});
