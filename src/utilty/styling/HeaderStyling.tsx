import { Dimensions, StyleSheet } from "react-native";
import Colors from "../Colors";
import {Platform} from 'react-native';
export const HeaderStyling = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.primary_color, 
    height: 'auto',
    paddingBottom:15
  },
  drawerContainer:{
    marginTop: 45, 
    marginLeft: 15,
    marginRight: 15
  },
  drwerIcon:{
    marginTop: 45, 
    left: 20
  }
});

