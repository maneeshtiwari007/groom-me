import { StyleSheet, Text, View } from 'react-native';
import { Provider, useTheme } from 'react-native-paper';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/Screens/SplashScreen';
import LoginScreen from './src/Screens/LoginScreen';
import UserIntroSlider from './src/Screens/IntroSlides/UserIntroSlider';
import AppContainer from './src/route/AppNavigation';
import RegisterScreen from './src/Screens/RegisterScreen';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from '@expo-google-fonts/poppins';
import ProfIntroSlider from './src/Screens/IntroSlides/ProfIntroSlider';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CommonHelper } from './src/utilty/CommonHelper';
import { ConstantsVar } from './src/utilty/ConstantsVar';
import BookingDetail from './src/Screens/User/BookingDetail';
import Bookings from './src/Screens/User/Bookings';
import { handleURLCallback } from '@stripe/stripe-react-native';
import * as Linking from 'expo-linking';
// import AppContainer from './src/route/AppNavigation';
const Stack = createStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App(props) {
  const navigationContainerRef: any = useRef();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });
  const theme = useTheme();
  theme.colors.secondaryContainer = "transperent"

  const Auth = () => {
    // Stack Navigator for Login and Sign up Screen
    Location.requestForegroundPermissionsAsync();
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserIntroSlider"
          component={UserIntroSlider}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfIntroSlider"
          component={ProfIntroSlider}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  };
  const registerForPushNotificationsAsync = async () => {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        });
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync({
        projectId: '2d96f7ce-3031-4897-aa5e-dcff8a899bb2',
      });
    } else {
      alert('Must use physical device for Push Notifications');
    }
    return token?.data;
  }
  const handleDeepLink = useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url);
        const objParsedUrl = Linking.parse(url)
        const redirectToSCreen = CommonHelper.returnScreenNameBasedOnPath(objParsedUrl?.path, objParsedUrl?.queryParams);
        if (redirectToSCreen) {
          navigationContainerRef?.current?.navigate(redirectToSCreen?.path, redirectToSCreen?.query);
        }
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback]
  );
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    registerForPushNotificationsAsync().then((token) => { console.log(token); setExpoPushToken(token); CommonHelper.saveStorageData(ConstantsVar.NOTIFICATION_STORAGE_KEY, JSON.stringify({ token: token })); });
    if (notificationListener) {
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification?.request?.content);
      });
    }
    if (responseListener) {
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response?.notification?.request?.content?.data?.order_id);
        if (response?.notification?.request?.content?.data?.order_id) {
          navigationContainerRef?.current?.navigate("AppContainer", { data: response?.notification?.request?.content?.data?.order_id, from: 'App' });
        }
      });
    }
    const deepLinkListener = Linking.addEventListener('url', (event: { url: string }) => {
      handleDeepLink(event.url);
    }
    );
    const redirectUrl = Linking.createURL('/screen', {
      queryParams: { hello: 'world' },
    });
    //console.log(redirectUrl);

    return () => {
      deepLinkListener.remove();
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [handleDeepLink]);

  return (
    <Provider>
      <NavigationContainer ref={navigationContainerRef}>
        <Stack.Navigator>
          {/* SplashScreen which will come once for 5 Seconds */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            // Hiding header for Splash Screen
            options={{ headerShown: false }}
          />
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UserIntroSlider"
            component={UserIntroSlider}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfIntroSlider"
            component={ProfIntroSlider}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="AppContainer"
            component={AppContainer}
            // Hiding header for Navigation Drawer
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
