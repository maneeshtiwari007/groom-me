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
import { CommonApiRequest } from "../../utilty/api/commonApiRequest";
import { ConstantsVar } from "../../utilty/ConstantsVar";
import ImageComponent from "./ImageComponent";

export default class ProfBookingCard extends Component<ScreenInterfcae, BadgeInterFace> {

    constructor(props: any) {
        super(props);
        this.state = {
            badgeStyle: '',
            color: Colors.success_color
        }
    }
    componentDidMount(): void {
    }
    onUpdateOrder(type: any = '') {
        if (this.props.onClickResponse) {
            this.props.onClickResponse({ type: type })
        }
    }
    render() {
        return (
            <View style={ThemeStyling.card}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate("Booking Details", { data: this.props?.data?.order_id }) }}>
                    <View style={[ThemeStyling.cardBody, { padding: 0 }]}>
                        <View style={[ThemeStyling.twoColumnLayout, { alignItems: "center" }]}>
                            <View style={[ThemeStyling.col4, { marginRight: 10, position: 'relative' }]}>
                                <ImageComponent style={[ThemeStyling.cardImage2, { height: 140 }]} src={{ uri: this?.props?.data?.image }} />
                                <View style={{ flexDirection: "row", marginBottom: 5, position: 'absolute', top: 0 }}>
                                    <Badge badgeStyle={{ backgroundColor: this.props?.data?.order_status?.iconcolor, color: this.props?.data?.order_status?.color, borderRadius: 0 }} title={this.props?.data?.order_status?.status}></Badge>
                                </View>
                            </View>
                            <View style={[ThemeStyling.col8, { padding: 8, paddingLeft: 0, paddingTop: 0 }]}>
                                <View style={{ marginBottom: 0 }}>
                                    <Text style={[ThemeStyling.heading5, { fontWeight: '600', color: Colors.primary_color, marginBottom: 5 }]}>{this.props?.data?.name}</Text>
                                    <View style={{ flexDirection: "row", marginBottom: 5, alignItems: 'center' }}>
                                        <View><FontAwesome name="money" size={14} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.amount}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><MaterialCommunityIcons name="map-marker" size={18} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.place?.substring(0, 50) + '...'}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><MaterialCommunityIcons name="calendar-clock-outline" size={13} style={{ color: Colors.secondry_color, marginRight: 5 }} /></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>{this.props?.data?.date}</Text></View>
                                    </View>
                                    <View style={{ flexDirection: "row", marginBottom: 5 }}>
                                        <View><Text style={[ThemeStyling.text2, { color: Colors.secondry_color }]}>Payment: </Text></View>
                                        <View style={{ flexShrink: 1 }}><Text style={[ThemeStyling.text2, { color: (this.props?.data?.payment_status)?Colors.success_color:Colors.primary_color} ]}>{(this.props?.data?.payment_status)?this.props?.data?.payment_status:'Not Completed'}</Text></View>
                                    </View>

                                    {!this.props?.isArchive &&
                                        <View style={[ThemeStyling.twoColumnLayout, { marginBottom: 0, justifyContent: 'space-between' }]}>
                                            {this.props?.data?.canAccepted &&
                                                <View style={{ marginRight: 0 }}>
                                                    <Pressable onPress={() => { this.onUpdateOrder(ConstantsVar.ACCEPT_KET) }} style={[ThemeStyling.btnSuccess, ThemeStyling.btnSmall]}>
                                                        <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Accept</Text>
                                                    </Pressable>
                                                </View>
                                            }
                                            {this.props?.data?.canRejected &&
                                                <View style={{ marginRight: 10 }}>
                                                    <Pressable onPress={() => { this.onUpdateOrder(ConstantsVar.CANCEL_KEY) }} style={[ThemeStyling.btnPrimary, ThemeStyling.btnSmall, { height: 'auto' }]}>
                                                        <Text style={[ThemeStyling.btnText, { fontSize: Colors.FontSize.f12 }]}>Reject</Text>
                                                    </Pressable>
                                                </View>
                                            }
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