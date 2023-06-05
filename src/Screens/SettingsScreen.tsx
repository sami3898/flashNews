import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS } from "../utils/Colors";
import CustomStatusBar from "../Component/CustomStatusBar";
import AppHeader from "../Component/AppHeader";
import Application from "../../app.json";
import { hp, wp } from "../utils/ResponsiveLayout";
import { FONTS } from "../utils/Fonts";
import Switch from "../Component/Switch";
import { Ionicons } from "@expo/vector-icons";
import { cancelNotification, setNotifications } from "../utils/Notifications";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { SettingStackParamList } from "../../App";
import { setIsNotificationSubscribed } from "../Redux/NewsSlice";

const SettingsScreen = () => {

    // Selector 
    const news = useSelector((state: RootState) => state.newsSlice.news)
    const dispatch = useDispatch();

    // Navigation
    const navigation = useNavigation<NavigationProp<SettingStackParamList>>();

    // TODO: toggle notification
    const toggleNotification = async (value: boolean) => {
        if (value) {
            await setNotifications(news);
        } else {
            await cancelNotification();
            dispatch(setIsNotificationSubscribed(false))
            
        }
    } 

    return (
        <View style={styles.container}>
            <CustomStatusBar
                backgroundColor={COLORS.RED_COLOR}
                contentType="light-content"
            />
            <AppHeader title="Settings" />
            <View style={styles.mainContainer}>
                <View>
                    <TouchableOpacity 
                        activeOpacity={0.8}
                        style={styles.chipContainer}
                        onPress={() => navigation.navigate('PreferencesScreen')}
                    >
                        <View style={styles.rowContainer}>
                            <Ionicons
                                name="ios-list-outline"
                                size={wp(24)}
                                color={COLORS.RED_COLOR}
                                style={{ marginRight: wp(12) }}
                            />
                            <Text style={styles.chipText}>Preferences</Text>
                        </View>
                        <Ionicons
                            name="md-arrow-forward-outline"
                            size={wp(24)}
                            color={COLORS.RED_COLOR}
                            style={{ height: 32 }}
                        />
                    </TouchableOpacity>
                    <View style={[styles.chipContainer, { marginTop: hp(12) }]}>
                        <View style={styles.rowContainer}>
                            <Ionicons
                                name="notifications-outline"
                                size={wp(24)}
                                color={COLORS.RED_COLOR}
                                style={{ marginRight: wp(12) }}
                            />
                            <Text style={styles.chipText}>Notifications</Text>
                        </View>

                        <Switch
                            onStateChange={toggleNotification}
                        />
                    </View>
                </View>
                <Text
                    style={styles.versionText}
                >{`Version ${Application.expo.version}`}</Text>
            </View>
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE_COLOR,
    },
    mainContainer: {
        flex: 1,
        marginVertical: hp(30),
        marginHorizontal: wp(20),
        justifyContent: "space-between",
    },
    versionText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_SEMIBOLD,
        color: COLORS.BLACK_COLOR,
        textAlign: "center",
    },
    chipContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: hp(16),
        paddingHorizontal: wp(20),
        justifyContent: "space-between",
        borderRadius: 8,
        backgroundColor: COLORS.GREY_COLOR,
    },
    chipText: {
        fontSize: wp(14),
        fontFamily: FONTS.POPPINS_REGULAR,
        color: COLORS.BLACK_COLOR,
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
});
