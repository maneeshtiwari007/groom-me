import React, { Component, } from "react";
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FontAwesome5
} from "@expo/vector-icons";
import { StyleSheet, NativeModules, Image, Text, View } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
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
    //this.RegisterStackNavigator()
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
        screenOptions={{ headerShown: false, headerStyle: { backgroundColor: Colors.primary_color } }}
        backBehavior="history"
        drawerContent={props => <CustomDrawerContent {...props} />}
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
            drawerLabel: () => (
              <Text style={{ color: '#cf453d' }}>Home User</Text>
            ),
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
          name="Review Cart"
          component={ReviewCart}
        />
        <Drawer.Screen
          name="Payment"
          component={Payment}
        />
        <Drawer.Screen
          name="Settings"
          component={Settings}
        />
        <Drawer.Screen
          name="Bookings"
          component={Bookings}
        />
        <Drawer.Screen
          name="Profile"
          component={Profile}
        />
        <Drawer.Screen
          name="Help"
          component={Profile}
        />
        <Drawer.Screen
          name="Logout"
          component={this.Logout}
        />
      </Drawer.Navigator>
    </>)
  }
  CustomDrawerContent = (props) => (
    <DrawerContentScrollView {...props} >
      <View
        style={{
          backgroundColor: '#f50057',
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          Header
        </Text>
      </View>
      <DrawerItem {...props} />
    </DrawerContentScrollView>
  )
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
export const CustomDrawerContent = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: Colors.primary_color,
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 30 }}>
          Header
        </Text>
      </View>
      <DrawerContentScrollView {...props} style={{ top:0 }}>
        <DrawerItemList {...props}/>
      </DrawerContentScrollView>
      <View
        style={{
          height: 140,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: Colors.primary_color, fontSize: 30 }}>
          Footer
        </Text>
      </View>
    </View>
  );
} 
