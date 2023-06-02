import React, { useEffect } from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFonts } from "expo-font";
import { Provider, useSelector } from "react-redux";
import store, { RootState, persistor } from "./src/Redux/store";
import BottomTabBar from "./src/Component/BottomTabBar";
import * as SplashScreen from "expo-splash-screen";
import { News } from "./src/Redux/NewsSlice";
import { PersistGate } from "redux-persist/integration/react";

// Screens
import PersonaliseScreen from "./src/Screens/PersonaliseScreen";
import IntroScreen from "./src/Screens/IntroScreen";
import HomeScreen from "./src/Screens/HomeScreen";
import ExploreScreen from "./src/Screens/ExploreScreen";
import NewsScreen from "./src/Screens/NewsScreen";
import BookmarkScreen from "./src/Screens/BookmarkScreen";


export type IntroStackrParamsList = {
  IntroScreen: undefined;
  PersonaliseScreen: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  NewsScreen: {
    news: News;
  };
};
export type ExploreStackParamList = {
  ExploreScreen: undefined;
};
export type BookmarkStackParamList = {
  BookmarkScreen: undefined;
};

const IntroStack = createNativeStackNavigator<IntroStackrParamsList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const BookmarkStack = createNativeStackNavigator<BookmarkStackParamList>();
const TabStack = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();

const UserIntroStack = () => {
  return (
    <IntroStack.Navigator>
      <IntroStack.Screen
        name="IntroScreen"
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <IntroStack.Screen
        name="PersonaliseScreen"
        component={PersonaliseScreen}
        options={{ headerShown: false }}
      />
    </IntroStack.Navigator>
  );
};
const UserHomeStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

const UserExploreStack = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen
        name="ExploreScreen"
        component={ExploreScreen}
        options={{ headerShown: false }}
      />
    </ExploreStack.Navigator>
  );
};
const UserBookmarkStack = () => {
  return (
    <BookmarkStack.Navigator>
      <BookmarkStack.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{ headerShown: false }}
      />
    </BookmarkStack.Navigator>
  );
};

const UserTabStack = () => {
  return (
    <TabStack.Navigator
      id="tabs"
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <TabStack.Screen
        name="HomeTab"
        component={HomeScreen}
        options={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
      <TabStack.Screen
        name="Explore"
        component={UserExploreStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <TabStack.Screen
        name="Bookmark"
        component={UserBookmarkStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <TabStack.Screen
        name="Settings"
        component={UserHomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </TabStack.Navigator>
  );
};

const UserMainStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={UserTabStack}
        options={{ headerShown: false }}
      />
      <AppStack.Screen
        name="NewsScreen"
        component={NewsScreen}
        options={{ headerShown: false }}
      />
    </AppStack.Navigator>
  );
};

SplashScreen.preventAutoHideAsync();

const App = () => {
  const isUserOnbaord = useSelector(
    (state: RootState) => state.newsSlice.isUserOnbaord
  );
  const [fontLoaded] = useFonts({
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    async function hideSpalshScreen() {
      await SplashScreen.hideAsync();
    }

    if (fontLoaded) {
      hideSpalshScreen();
    }
  }, [fontLoaded]);

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {isUserOnbaord ? <UserMainStack /> : <UserIntroStack />}
    </NavigationContainer>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <App />
      </PersistGate>
    </Provider>
  );
};
