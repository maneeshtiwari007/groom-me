import React, { Component, } from "react";
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FontAwesome5
} from "@expo/vector-icons";
import { StyleSheet, NativeModules, Image, Text, View, DeviceEventEmitter } from "react-native";
import { SimpleLineIcons, Entypo } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import {transparent} from "react-native-papger/lib/typescript/src/styles/themes/v2/colors";
import Colors from "../utilty/Colors";
import Dashboard from "../Screens/Dashboard";
import Team from "../Screens/Team";
import Profile from "../Screens//User/Profile";
import WorkorderDetails from "../Screens/WorkorderDetails";
import Schedule from "../Screens/Schedule";
import { ThemeStyling } from "../utilty/styling/Styles";
import TimeTracker from "../Screens/TimeTracker"
import Jobsite from "../Screens/Jobsite";
import ChooseServices from "../Screens/ChooseServices";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';
import { CommonHelper } from "../utilty/CommonHelper";
import LoginScreen from "../Screens/LoginScreen";
import OurServices from "../Screens/User/OurServices";
import ProfLists from "../Screens/User/ProfLists";
import ProfDetail from "../Screens/User/ProfDetail";
import ReviewCart from "../Screens/User/ReviewCart";
import Payment from "../Screens/User/Payment";
import Settings from "../Screens/User/Settings";
import Bookings from "../Screens/User/Bookings";
import SelectAddress from "../Screens/User/SelectAddress";
import UserProfile from "../Screens//User/Profile";
import { ConstantsVar } from "../utilty/ConstantsVar";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class AppContainer extends Component<ScreenInterfcae, { isAuth?: any, user?: any }> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuth: false,
      user: {}
    }

  }

  async componentDidMount() {
    const user = await CommonHelper.getUserData();
    this.setState({ user: user });
    DeviceEventEmitter.addListener(ConstantsVar.API_ERROR, async (data: any) => {
      const user = await CommonHelper.getUserData();
      console.log(user);
      this.setState({ user: user });
  });
  }
  Logout = () => {
    CommonHelper.logoutUser();
    this.props?.navigation.navigate("LoginScreen");
    return ("");
  }
  WorkOrderScreen() {
    return (
      <Drawer.Navigator
        initialRouteName="WorkOrder"
        screenOptions={{
          headerShown: false,
          headerStyle: ThemeStyling.header,
          headerTintColor: '#fff',
          headerTitleStyle: ThemeStyling.headerTitle,
          headerTitleAlign: "center",
          title: "Work Order Details",
        }}>
        <Drawer.Screen name="Work" component={Jobsite} />
        <Drawer.Screen name="WorkOrderDetail" component={WorkorderDetails} options={() => ({ headerShown: false })} ></Drawer.Screen>
        <Drawer.Screen name="ChooseServices" component={ChooseServices} options={{ headerShown: false }}></Drawer.Screen>
        <Drawer.Screen name="TimeTracker" component={TimeTracker} options={{ headerShown: false }}></Drawer.Screen>
      </Drawer.Navigator>
    );
  }
  HomeScreen() {
    return (
      <Stack.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={OurServices} />
        <Stack.Screen name="Professionals" component={ProfLists} />
        <Stack.Screen name="Professional Detail" component={ProfDetail} />
        <Stack.Screen name="Review Cart" component={ReviewCart} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Work" component={Jobsite} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
  Login() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    )
  }
  ProfMenu() {
    return (<>
      <Drawer.Navigator
        initialRouteName="HomeScreen"
      >
        <Drawer.Screen
          name="HomeScreen"
          component={this.HomeScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <Ionicons
                name="home"
                size={size}
                color={'#cf453d'}
              />
            ),
            drawerLabel: ({ }) => (
              <Text style={{ color: '#cf453d' }}>Home</Text>
            )
          }}
        />
        <Drawer.Screen
          name="WorkOrder"
          component={this.WorkOrderScreen}
        />
        <Drawer.Screen
          name="Schedule"
          component={Schedule}
        />
        <Drawer.Screen
          name="Help"
          component={Profile}
        />
        <Drawer.Screen
          name="Logout"
          component={this.Logout}
          listeners={{

          }}
        />
      </Drawer.Navigator>
    </>)
  }
  UserMenu() {
    return (<>
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false, headerStyle: { backgroundColor: 'green' },unmountOnBlur:true }}
        drawerContent={props => <CustomDrawerContent {...props} user={this.state.user} />}
        
      >
        <Drawer.Screen
          name="HomeScreen"
          component={this.HomeScreen}
          options={{
            drawerIcon: ({ focused, size }) => (
              <SimpleLineIcons
                name="home"
                size={size}
                color={Colors.primary_color}
              />
            ),
            drawerLabel: () => (
              <Text style={{ color: Colors.primary_color }}>Home</Text>
            ),
          }}
        />
        {/* <Drawer.Screen
          name="Address"
          component={SelectAddress}
          options={{
            drawerIcon: ({ focused, size }) =>(
              <FontAwesome
                name="scissors"
                size={size}
                color={Colors.gray_color}
              />
            ),
            drawerLabel: () => (
              <Text style={{ color: Colors.gray_color }}>Address</Text>
            ),
          }}
        />

        <Drawer.Screen
          name="Schedule"
          component={Schedule}
          options={{
            drawerIcon: ({ focused, size }) =>
              <AntDesign
                name="calendar"
                size={size}
                color={Colors.gray_color}
              />
              
          }}
        /> */}
        {/* <Drawer.Screen
          name="Review Cart"
          component={ReviewCart}
          options={{
            drawerIcon: ({ focused, size }) =>
              <AntDesign
                name="shoppingcart"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        />
        <Drawer.Screen
          name="Payment"
          component={Payment}
          options={{
            drawerIcon: ({ focused, size }) =>
              <MaterialCommunityIcons
                name="card-multiple-outline"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        /> */}
        <Drawer.Screen
          name="Bookings"
          component={Bookings}
          options={{
            drawerIcon: ({ focused, size }) =>
              <Ionicons
                name="desktop-sharp"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        />
        <Drawer.Screen
          name="Profile"
          component={UserProfile}
          options={{
            drawerIcon: ({ focused, size }) =>
              <SimpleLineIcons
                name="user"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerIcon: ({ focused, size }) =>
              <Ionicons
                name="settings-outline"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        />
        <Drawer.Screen
          name="Help"
          component={Profile}
          options={{
            drawerIcon: ({ focused, size }) =>
              <MaterialCommunityIcons
                name="help-circle-outline"
                size={size}
                color={Colors.secondry_color}
              />
          }}
        />
      </Drawer.Navigator>
    </>)
  }
  render() {
    //this.RegisterStackNavigator();
    if (this.state?.user?.type == 2) {
      return (this.UserMenu());
    } else if (this.state?.user?.type == 4) {
      return (this.ProfMenu());
    }

  }
}
const styles = StyleSheet.create({
  tabScreen: {
    paddingLeft: 5,
    paddingRight: 5,
  },
});
export const CustomDrawerContent = (props,user) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.white,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          borderBottomColor: Colors.gray200,
          borderStyle: "solid"
        }}
      >
        <View style={[ThemeStyling.twoColumnLayout, { marginLeft: 10, marginTop: 25, marginBottom: 0 }]}>
          <View style={[ThemeStyling.col2, { marginRight: 10 }]}>
            <Image style={[ThemeStyling.cardImage, { borderRadius: 8 }]} source={{uri:props?.user?.photo}} />
          </View>
          <View style={ThemeStyling.col10}>
            <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.dark_color, marginBottom: 0 }]}>{props?.user?.name}</Text>
            <Text style={[ThemeStyling.text2, { color: Colors.secondry_color, marginBottom: 0 }]}>{props?.user?.email}</Text>
          </View>
        </View>
      </View>
      <DrawerContentScrollView contentContainerStyle={{top:-35,padding:0,margin:0}} {...props} style={{ paddingTop:0,marginTop:0 }}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        style={{
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderTopWidth: 1,
          borderTopColor: Colors.gray200,
          borderStyle: "solid"
        }}
      >
        <Text style={{ color: Colors.secondry_color, fontSize: 10 }}>
          App Version: v1.0
        </Text>
      </View>
    </View>
  );
} 
