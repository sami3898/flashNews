import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
    Easing,
    useAnimatedStyle,
    withDelay,
    withTiming,
} from "react-native-reanimated";
import { COLORS } from "../utils/Colors";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { setIsNotification } from "../Redux/NewsSlice";

interface SwitchProps {
    onStateChange: (value: boolean) => void;
}

const Switch:React.FC<SwitchProps> = (props: SwitchProps) => {

    // Props
    const { onStateChange } = props;
    // Selector & Dispatch
    const isNotification = useSelector((state: RootState) => state.newsSlice.isNotification)
    const dispatch = useDispatch();
    // State variable
    const [isOn, setIsOn] = useState<boolean>(isNotification);
    // Animated style
    const circleAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(isOn ? 32 : 0) }],
    }));
    const switchAnimatedStyle = useAnimatedStyle(() => ({
        backgroundColor: withDelay(
            100,
            withTiming(isOn ? COLORS.LIHT_RED_COLOR : COLORS.WHITE_COLOR, {
                duration: 250,
                easing: Easing.ease,
            })
        ),
    }));


    return (
        <Animated.View style={[styles.switchContainer, switchAnimatedStyle]}>
            <Animated.View style={[styles.circle, circleAnimatedStyle]}>
                <TouchableOpacity
                    style={{ height: "100%", width: "100%" }}
                    onPress={() => {
                        setIsOn(!isOn)
                        onStateChange(!isOn)
                        dispatch(setIsNotification(!isOn))
                    }}
                />
            </Animated.View>
        </Animated.View>
    );
};

export default Switch;

const styles = StyleSheet.create({
    switchContainer: {
        width: 64,
        height: 32,
        borderRadius: 32,
        backgroundColor: COLORS.WHITE_COLOR,
        justifyContent: "center",
        padding: 4,
    },
    circle: {
        height: 24,
        width: 24,
        borderRadius: 40,
        backgroundColor: COLORS.RED_COLOR,
        // borderWidth: 2,
        // borderColor: COLORS.LIHT_RED_COLOR
    },
});
