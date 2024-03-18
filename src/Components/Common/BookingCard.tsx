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
                            <View style={[ThemeStyling.col4, { marginRight: 10 }]}>
                                <Image style={[ThemeStyling.cardImage2]} source={{ uri: this?.props?.data?.image }} />
                            </View>
                            <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>{this.props?.data?.name}</Text>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.place}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.date}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <Badge badgeStyle={{ backgroundColor: this.props?.data?.order_status?.backgroundColor, color: this.props?.data?.order_status?.color }} title={this.props?.data?.order_status?.status}></Badge>
                                    </View>
                                    {!this.props?.isArchive &&
                                        <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 0 }]}>
                                            <View style={{ marginRight: 10 }}>
                                                <TouchableOpacity style={[ThemeStyling.btnInfo, { height: 30, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6 }]}>
                                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Get Direction</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View>
                                                <TouchableOpacity style={[ThemeStyling.btnPrimary, { height: 30, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 6 }]}>
                                                    <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Cancel</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}