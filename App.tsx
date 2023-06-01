import React from 'react'
import {NavigationContainer, getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import {Provider, useSelector} from 'react-redux'
import store, { RootState } from './src/Redux/store';
import BottomTabBar from './src/Component/BottomTabBar';

// Screens
import PersonaliseScreen from './src/Screens/PersonaliseScreen';
import IntroScreen from './src/Screens/IntroScreen';
import HomeScreen from './src/Screens/HomeScreen';
import ExploreScreen from './src/Screens/ExploreScreen';
import NewsScreen from './src/Screens/NewsScreen';
import { News } from './src/Redux/NewsSlice';




export type IntroStackrParamsList = {
  IntroScreen: undefined;
  PersonaliseScreen: undefined;
}

export type HomeStackParamList = {
  HomeScreen: undefined;
  NewsScreen: {
    news: News
  }
}
export type ExploreStackParamList = {
  ExploreScreen: undefined;
}

export type TabStackParamList = {
  Home:  {
    HomeScreen: undefined,
  NewsScreen: {
    news: News
  }
  };
  Explore: ExploreStackParamList;
  Bookmark: HomeStackParamList;
  Settings: HomeStackParamList;
}

const IntroStack = createNativeStackNavigator<IntroStackrParamsList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ExploreStack = createNativeStackNavigator<ExploreStackParamList>();
const TabStack = createBottomTabNavigator();
const AppStack = createNativeStackNavigator();

const UserIntroStack = () => {
  return (
    <IntroStack.Navigator>
      <IntroStack.Screen 
        name='IntroScreen'
        component={IntroScreen}
        options={{ headerShown: false }}
      />
      <IntroStack.Screen 
        name='PersonaliseScreen'
        component={PersonaliseScreen}
        options={{ headerShown: false }}
      />
    </IntroStack.Navigator>
  )
}
const UserHomeStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name='HomeScreen'
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/* <HomeStack.Screen 
        name='NewsScreen'
        component={NewsScreen}
        options={({route}) => ({
          headerShown: false,
        })}
      /> */}
    </HomeStack.Navigator>
  )
}

const UserExploreStack = () => {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen 
        name='ExploreScreen'
        component={ExploreScreen}
        options={{ headerShown: false}}
      />
    </ExploreStack.Navigator>
  )
}

const UserTabStack = () => {
  // const renderIcon = (name: string, focused: boolean) => {
  //   return (
  //     <Icon
  //       name={name}
  //       color={focused ? COLORS.BUTTON_COLOR : COLORS.GREY_COLOR}
  //       size={wp(24)}
  //       // style={{marginTop: 10}}
  //     />
  //   );
  // };

  return (
    <TabStack.Navigator 
      id='tabs'
    tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{ headerShown: false}}
      >
      <TabStack.Screen 
        name='Home'
        component={HomeScreen}
        options={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
        })}
      />
      <TabStack.Screen 
        name='Explore'
        component={UserExploreStack}
        options={{
          headerShown: false, 
          tabBarShowLabel: false
        }}
      />
      <TabStack.Screen 
        name='Bookmark'
        component={UserHomeStack}
        options={{
          headerShown: false, 
          tabBarShowLabel: false
        }}
      />
      <TabStack.Screen 
        name='Settings'
        component={UserHomeStack}
        options={{
          headerShown: false, 
          tabBarShowLabel: false
        }}
      />
    </TabStack.Navigator>
  )
}

const UserMainStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen 
        name='Home'
        component={UserTabStack}
        options={{ headerShown: false}}
      />
      <AppStack.Screen 
        name='NewsScreen'
        component={NewsScreen}
        options={{ headerShown: false}}
      />
    </AppStack.Navigator>
  )
}

function App() {

  const isUserOnbaord = useSelector((state: RootState) => state.newsSlice.isUserOnbaord);
  const [fontLoaded] = useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
  })

  if (!fontLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      {isUserOnbaord ?<UserMainStack /> : <UserIntroStack/>}
    </NavigationContainer>
  )
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
};