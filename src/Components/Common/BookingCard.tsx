import React, { Component } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { func, string, any } from 'prop-types';
import { Pressable } from "react-native";
import Colors from "../../utilty/Colors";
import Theming from "../../utilty/styling/theming";
import { ThemeStyling } from "../../utilty/styling/Styles";
import BadgeInterFace from "../../Interfaces/Common/BadgeInterFace";
import ScreenInterfcae from "../../Interfaces/Common/ScreensInterface";
import { FontAwesome, MaterialCommunityIcons, Feather, FontAwesome5, AntDesign } from '@expo/vector-icons';
import Badge from "./Badge";

export default class BookingCard extends Component<ScreenInterfcae, BadgeInterFace> {

    constructor(props: any) {
        super(props);
        this.state = {
            badgeStyle: '',
            color: Colors.success_color
        }
    }
    componentDidMount(): void {
        
    }
    render() {
        return (
            <View style={ThemeStyling.card}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Bookings Detail", { data: this.props?.data?.order_id }) }}>
                    <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                        <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                            <View style={[ThemeStyling.col4, { marginRight: 10, position: 'relative' }]}>
                                <Image style={[ThemeStyling.cardImage2, { height: 150 }]} source={{ uri: this?.props?.data?.image }} />
                                <View style={{ flexDirection: "row", marginBottom: 5, position: 'absolute', top: 0 }}>
                                    <Badge badgeStyle={{ backgroundColor: this.props?.data?.order_status?.iconcolor, color: this.props?.data?.order_status?.color, borderRadius: 0 }} title={this.props?.data?.order_status?.status}></Badge>
                                </View>
                            </View>
                            <View style={[ThemeStyling.col8, { padding: 5, paddingLeft: 0, paddingTop: 0 }]}>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginTop: 5 }]}>{this.props?.data?.name}</Text>
                                    <View style={{ flexDirection: "row", marginBottom: 2, alignItems: 'center' }}>
                                        <View><FontAwesome name="money" size={14} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.amount}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 2 }}>
                                        <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.place?.substring(0, 30) + '...'}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 2 }}>
                                        <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.date}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment: </Text></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: (this.props?.data?.payment_status)?Colors.success_color:Colors.primary_color} ]}>{(this.props?.data?.new_payment_status)?this.props?.data?.new_payment_status:'Not Completed'}</Text></View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}