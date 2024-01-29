import React, { Component, } from "react";
import { AntDesign, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FontAwesome5
} from "@expo/vector-icons";
import { StyleSheet, NativeModules, Image, Text } from "react-native";
import { SimpleLineIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import {transparent} from "react-native-papger/lib/typescript/src/styles/themes/v2/colors";
import Colors from "../utilty/Colors";
import Dashboard from "../Screens/Dashboard";
import Team from "../Screens/Team";
import Profile from "../Screens/Profile";
import WorkorderDetails from "../Screens/WorkorderDetails";
import Schedule from "../Screens/Schedule";
import { ThemeStyling } from "../utilty/styling/Styles";
import TimeTracker from "../Screens/TimeTracker"
import Jobsite from "../Screens/Jobsite";
import ChooseServices from "../Screens/ChooseServices";
import ScreenInterfcae from "../Interfaces/Common/ScreensInterface";
import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { CommonHelper } from "../utilty/CommonHelper";
import LoginScreen from "../Screens/LoginScreen";
import OurServices from "../Screens/User/OurServices";
import ProfLists from "../Screens/User/ProfLists";
import ProfDetail from "../Screens/User/ProfDetail";
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

export default class AppContainer extends Component<ScreenInterfcae,{isAuth?:any,user?:any}> {
  constructor(props: any) {
    super(props);
    this.state = {
      isAuth: false,
      user:{}
    }

  }

  async componentDidMount() {
    const user = await CommonHelper.getUserData();
    this.setState({user:user});
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
        screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Home" component={OurServices} />
        <Stack.Screen name="ProfLists" component={ProfLists} />
        <Stack.Screen name="ProfDetail" component={ProfDetail} />
        <Stack.Screen name="Work" component={Jobsite} />
      </Stack.Navigator>
    );
  }
  Login(){
    return(
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
          name="Profile"
          component={Team}
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
        screenOptions={{headerShown:true,headerStyle:{backgroundColor:Colors.primary_color}}}
        backBehavior="history"
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
              <Text style={{ color: '#cf453d' }}>Home User</Text>
            ),
          }}
        />
        <Drawer.Screen
          name="WorkOrder"
          component={this.WorkOrderScreen}
        />

        <Drawer.Screen
          name="Profile"
          component={Team}
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
  render() {
    //this.RegisterStackNavigator();
    if(this.state?.user?.type==2){
      return (this.UserMenu());
    }else if(this.state?.user?.type==4){
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
